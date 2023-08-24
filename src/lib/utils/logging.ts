import c, { type StyleFunction } from 'ansi-colors';
import winston from 'winston';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import { DOG_API_KEY } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';

const environment = PUBLIC_ENVIRONMENT?.toLowerCase() || 'development',
	service = `echolayer-app-${environment}`,
	isDev = environment === 'development';

const runtime = {
	prettyLogMetadata: isDev,
	suppressMeta: isDev,
	humanLogs: isDev,
	logLevel: 'info',
	silentLogs: false,
	datadog: {
		host: 'http-intake.logs.datadoghq.com',
		path: `/api/v2/logs?dd-api-key=${DOG_API_KEY}&host=${service}&ddsource=${service}&service=${service}`
	}
};

export interface RequestContext {
	traceId?: string;
	ipAddress?: string;
	method?: string;
	clientPlatform?: Readonly<App.Platform>;
	startedAt?: Date;
	url?: string;
}

export type LoggerFunction = (msg: string, meta?: Record<string, any>) => void;

export type Logger = {
	debug: LoggerFunction;
	info: LoggerFunction;
	warn: LoggerFunction;
	error: LoggerFunction;
};

const levelColour = (level: string): StyleFunction => {
	switch (level.toLowerCase()) {
		case 'error':
			return c.red;
		case 'warn':
		case 'warning':
			return c.yellow;
		case 'info':
			return c.blue;
		case 'debug':
			return c.magenta;
		default:
			return c.grey;
	}
};
const colours = {
	keyColor: c.cyan,
	numberColor: c.blue,
	stringColor: c.whiteBright.bold,
	trueColor: c.greenBright,
	falseColor: c.magenta,
	nullColor: c.black
};

function colourize(json: any) {
	let str =
		typeof json !== 'string'
			? JSON.stringify(json, null, runtime.prettyLogMetadata ? 2 : undefined)
			: json;
	str = str.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
	return str.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?)/g,
		(match: any) => {
			let color = colours.numberColor;
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					color = colours.keyColor;
				} else {
					color = colours.stringColor;
					match = '"' + match.substr(1, match.length - 2) + '"';
				}
			} else {
				color = /true/.test(match)
					? colours.trueColor
					: /false/.test(match)
					? colours.falseColor
					: /null/.test(match)
					? colours.nullColor
					: color;
			}
			return color(match);
		}
	);
}

// We consider these keys to be mostly noise when reading local logs as a developer
const extraneousMetaData = new Set([
	'ipAddress',
	'env',
	'service',
	'clientPlatform',
	'clientVersion',
	'startedAt'
]);

const humanFormat = winston.format.combine(
	winston.format.timestamp(),
	winston.format.printf(({ level, message, timestamp, ...metadata }) => {
		const baseMsg = `${c.grey.italic(timestamp)} [${levelColour(level).bold(
			level.toUpperCase()
		)}]: ${message} `;
		if (Object.keys(metadata).length === 0) return baseMsg;
		if (runtime.suppressMeta) {
			const suppressedMeta = Object.fromEntries(
				Object.entries(metadata).filter(([key, _value]) => !extraneousMetaData.has(key))
			);
			return `${baseMsg}${colourize(suppressedMeta)}`;
		}
		return `${baseMsg}${colourize(metadata)}`;
	})
);

const unifiedServiceTags = () => ({
	env: environment,
	service
});

function buildLogMeta(ctx: RequestContext, meta?: Record<string, any>) {
	return {
		...ctx,
		...meta,
		...unifiedServiceTags()
	};
}

const getConsoleTransport = () => {
	return new winston.transports.Console({
		format: runtime.humanLogs ? humanFormat : winston.format.json(),
		level: runtime.logLevel,
		silent: runtime.silentLogs,
		handleExceptions: true
	});
};

const getDDTransport = () => {
	if (isDev) return null;
	return new winston.transports.Http({
		host: runtime.datadog.host,
		path: runtime.datadog.path,
		ssl: true
	});
};

const getTransports = (transports?: []) => {
	return [
		getConsoleTransport(),
		...(getDDTransport() ? [getDDTransport()] : []),
		...(transports && transports.length > 0 ? transports : [])
	];
};

export const getContext = (event: RequestEvent, traceId?: string): RequestContext => {
	return {
		startedAt: new Date(),
		...(traceId && { traceId }),
		...(event.getClientAddress() && { ipAddress: event.getClientAddress() }),
		...(event.request.method && { method: event.request.method }),
		...(event.platform && { clientPlatform: event.platform }),
		...(event.url?.href && { url: event.url.href })
	};
};

export const createLogger = (name: string, ctx: RequestContext, transports?: []): Logger => {
	const logger = winston.createLogger({
		transports: getTransports(transports) as winston.transport | winston.transport[],
		exitOnError: false
	});

	const prefix = name ? `[${name}]: ` : '';
	return {
		debug: (msg: string, meta?: Record<string, any>) =>
			logger.debug(`${prefix}${msg}`, buildLogMeta(ctx, meta)),
		info: (msg: string, meta?: Record<string, any>) => {
			console.log(buildLogMeta(ctx, meta));
			logger.info(`${prefix}${msg}`, buildLogMeta(ctx, meta));
		},
		warn: (msg: string, meta?: Record<string, any>) =>
			logger.warn(`${prefix}${msg}`, buildLogMeta(ctx, meta)),
		error: (msg: string, meta?: Record<string, any>) =>
			logger.error(`${prefix}${msg}`, buildLogMeta(ctx, meta))
	};
};
