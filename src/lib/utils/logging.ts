import c, { type StyleFunction } from 'ansi-colors';
import winston from 'winston';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';

const runtime = {
	environment: PUBLIC_ENVIRONMENT?.toLowerCase() || 'development',
	prettyLogMetadata: false,
	suppressMeta: false,
	humanLogs: false,
	logLevel: 'info',
	silentLogs: false
};

export const APP_SERVICE_NAME = `echolayer-app-${runtime.environment}`;

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
	env: runtime.environment,
	service: APP_SERVICE_NAME
});

interface RequestContext {
	traceId: string;
	ipAddress?: string;
	method?: string;
	clientPlatform?: string;
	clientVersion?: string;
	startedAt?: Date;
}

function buildLogMeta(ctx: RequestContext, meta?: Record<string, any>) {
	return {
		...ctx,
		...meta,
		...unifiedServiceTags()
	};
}

export type LoggerFunction = (msg: string, ctx: RequestContext, meta?: Record<string, any>) => void;
export type Logger = {
	debug: LoggerFunction;
	info: LoggerFunction;
	warn: LoggerFunction;
	error: LoggerFunction;
};

const getTransports = (transports: []) => {
	return [
		new winston.transports.Console({
			format: runtime.humanLogs ? humanFormat : winston.format.json(),
			level: runtime.logLevel,
			silent: runtime.silentLogs,
			handleExceptions: true
		}),
		...transports
	];
};

export const createLogger = (name: string, transports: [] = [], ctx: RequestContext) => {
	const logger = winston.createLogger({
		transports: getTransports(transports),
		exitOnError: false
	});

	const prefix = name ? `[${name}]: ` : '';
	return {
		debug: (msg: string, ctx: RequestContext, meta?: Record<string, any>) =>
			logger.debug(`${prefix}${msg}`, buildLogMeta(ctx, meta)),
		info: (msg: string, ctx: RequestContext, meta?: Record<string, any>) =>
			logger.info(`${prefix}${msg}`, buildLogMeta(ctx, meta)),
		warn: (msg: string, ctx: RequestContext, meta?: Record<string, any>) =>
			logger.warn(`${prefix}${msg}`, buildLogMeta(ctx, meta)),
		error: (msg: string, ctx: RequestContext, meta?: Record<string, any>) =>
			logger.error(`${prefix}${msg}`, buildLogMeta(ctx, meta))
	};
};
