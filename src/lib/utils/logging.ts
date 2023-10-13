import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import { DOG_API_KEY } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import { Logger as TSLogger, type ILogObj, type ILogObjMeta } from 'tslog';
import { DataDogTransport } from './dataDogTransport';

const environment = PUBLIC_ENVIRONMENT?.toLowerCase() || 'development',
	service = `echolayer-app-${environment}`,
	isDev = environment === 'development';

export interface RequestContext {
	traceId?: string;
	ipAddress?: string;
	method?: string;
	clientPlatform?: Readonly<App.Platform>;
	startedAt?: Date;
	url?: string;
}

const getServiceTags = () => ({
	env: environment,
	host: service,
	service
});

const getLogMeta = (ctx: RequestContext, meta?: Record<string, any>) => {
	return {
		...meta,
		...(!isDev ? ctx : {}),
		...(!isDev ? getServiceTags() : {})
	};
};

const getDDTransport = () => {
	if (isDev) return null;
	return {
		target: 'pino-datadog-transport',
		level: 'info',
		options: {
			ddClientConf: {
				authMethods: {
					apiKeyAuth: DOG_API_KEY
				}
			},
			ddServerConf: {
				site: 'datadoghq.com'
			},
			ddsource: service,
			service
		}
	};
};

export const getTransports = (transports?: []) => {
	const dataDogTransport = new DataDogTransport({
		ddClientConf: {
			authMethods: {
				apiKeyAuth: DOG_API_KEY
			}
		},
		ddServerConf: {
			site: 'datadoghq.com'
		},
		ddsource: service,
		service
	});

	const targets: ((meta: ILogObjMeta) => void)[] = [dataDogTransport.processLog];

	return targets;
};

export const getRequestContext = (event: RequestEvent, traceId?: string): RequestContext => {
	return {
		startedAt: new Date(),
		...(traceId && { traceId }),
		...(event.request.method && { method: event.request.method }),
		...(event.platform && { clientPlatform: event.platform }),
		...(event.url?.href && { url: event.url.href })
	};
};

export type ILoggerFunction = (msg: string, meta?: Record<string, any>) => void;

export type ILogger = {
	debug: ILoggerFunction;
	info: ILoggerFunction;
	warn: ILoggerFunction;
	error: ILoggerFunction;
};

export class Logger implements ILogger {
	protected readonly name: string | null;
	protected readonly prefix: string;
	protected ctx: RequestContext;
	protected logger: TSLogger<ILogObj>;

	constructor(name?: string, ctx?: RequestContext) {
		this.name = name || null;
		this.prefix = name ? `[${name}]: ` : '';
		this.ctx = ctx || {};
		const logger: TSLogger<ILogObj> = new TSLogger({
			type: isDev ? 'pretty' : 'hidden',
			hideLogPositionForProduction: !isDev
		});
		getTransports().forEach((transport: (meta: ILogObjMeta) => void) => {
			logger.attachTransport(transport);
		});
		this.logger = logger;
	}

	addContext(ctx: RequestContext) {
		this.ctx = {
			...this.ctx,
			...ctx
		};
	}

	debug(msg: string, meta?: Record<string, any>) {
		this.logger.debug({
			message: `${this.prefix}${msg}`,
			context: getLogMeta(this.ctx, meta)
		});
	}

	info(msg: string, meta?: Record<string, any>) {
		this.logger.info({
			message: `${this.prefix}${msg}`,
			context: getLogMeta(this.ctx, meta)
		});
	}

	warn(msg: string, meta?: Record<string, any>) {
		this.logger.warn({
			message: `${this.prefix}${msg}`,
			context: getLogMeta(this.ctx, meta)
		});
	}

	error(msg: string, meta?: Record<string, any>) {
		this.logger.debug({
			message: `${this.prefix}${msg}`,
			context: getLogMeta(this.ctx, meta)
		});
	}
}
