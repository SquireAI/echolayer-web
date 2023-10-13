import { client, v2 } from '@datadog/datadog-api-client';
import type { HTTPLogItem } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/models/HTTPLogItem';
import type { ConfigurationParameters } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-common/configuration';
import type { LogsApiSubmitLogRequest } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/apis/LogsApi';
import type { ILogObjMeta } from 'tslog';

export interface DDTransportOptions {
	/**
	 * DataDog client configuration parameters.
	 * @see https://datadoghq.dev/datadog-api-client-typescript/interfaces/client.Configuration.html
	 */
	ddClientConf: ConfigurationParameters;
	/**
	 * Datadog server config for the client. Use this to change the Datadog server region.
	 * @see https://github.com/DataDog/datadog-api-client-typescript/blob/1e1097c68a437894b482701ecbe3d61522429319/packages/datadog-api-client-common/servers.ts#L90
	 */
	ddServerConf?: {
		/**
		 * The datadog server to use. Default is datadoghq.com.
		 * Other values could be:
		 * - us3.datadoghq.com
		 * - us5.datadoghq.com
		 * - datadoghq.eu
		 * - ddog-gov.com
		 */
		site?: string;
		subdomain?: string;
		protocol?: string;
	};
	/**
	 * The integration name associated with your log: the technology from which
	 * the log originated. When it matches an integration name, Datadog
	 * automatically installs the corresponding parsers and facets.
	 * @see https://docs.datadoghq.com/logs/log_collection/?tab=host#reserved-attributes
	 */
	ddsource?: string;
	/**
	 * Comma separated tags associated with your logs. Ex: "env:prod,org:finance"
	 */
	ddtags?: string;
	/**
	 * The name of the application or service generating the log events.
	 * It is used to switch from Logs to APM, so make sure you define the same
	 * value when you use both products.
	 * @see https://docs.datadoghq.com/logs/log_collection/?tab=host#reserved-attributes
	 */
	service?: string;
}

export class DataDogTransport {
	private apiInstance: v2.LogsApi;

	constructor(private options: DDTransportOptions) {
		const configuration = client.createConfiguration(options.ddClientConf);
		client.setServerVariables(configuration, options?.ddServerConf || {});
		this.apiInstance = new v2.LogsApi(configuration);
	}

	async buildLog(obj: ILogObjMeta) {
		const logItem: HTTPLogItem = {
			message: JSON.stringify({
				...obj,
				level: convertLevel(obj?._meta?.logLevelId) || 'info'
			})
		};

		if (this.options.ddsource) {
			logItem.ddsource = this.options.ddsource;
		}

		if (this.options.ddtags) {
			logItem.ddtags = this.options.ddtags;
		}

		if (this.options.service) {
			logItem.service = this.options.service;
		}

		if ((obj._meta as any).hostname) {
			logItem.hostname = (obj._meta as any).hostname || 'unknown';
		}

		return logItem;
	}

	async sendLogs(logs: Array<HTTPLogItem>) {
		const params: LogsApiSubmitLogRequest = {
			body: logs,
			contentEncoding: 'gzip'
		};

		return await this.apiInstance.submitLog(params);
	}

	processLog = async (obj: ILogObjMeta) => {
		try {
			const logToSend = await this.buildLog(obj);
			return await this.sendLogs([logToSend]);
		} catch (e) {
			console.error('Failed to send logs', e);
		}
	};
}

export const convertLevel = (level: number | string): string => {
	if (typeof level === 'string') {
		return level;
	}

	if (level >= 6) {
		return 'fatal';
	}
	if (level >= 5) {
		return 'error';
	}
	if (level >= 4) {
		return 'warning';
	}
	if (level >= 3) {
		return 'info';
	}
	if (level >= 2) {
		return 'debug';
	}

	return 'trace';
};
