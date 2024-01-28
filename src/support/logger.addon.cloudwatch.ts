// support/logger/logger.addon.cloudwatch.ts
import {
    CloudWatchLogsClient,
    PutLogEventsCommand,
} from '@aws-sdk/client-cloudwatch-logs';

type CloudwatchConfig = {
    groupName: string;
    stream_error: string;
    stream_info: string;
};

export type CloudwatchLogPayload = {
    timestamp: string;
    level: string;
    category: string;
    message: any;
    metadata: string;
};

export class CloudwatchLoggerAddon {
    private cloudWatchClient: CloudWatchLogsClient;
    private cloudwatchConfig: CloudwatchConfig;

    constructor() {
        this.cloudWatchClient = new CloudWatchLogsClient({
            credentials: {
                accessKeyId: 'AKIAU6GDVJE5CJ7BZE2O',
                secretAccessKey: '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',
            },
            region: 'ap-northeast-2',
        });
        this.cloudwatchConfig = {
            groupName: 'skeleton-app-logs',
            stream_info: 'info',
            stream_error: 'error',
        };
    }

    public sendInfo(payload: CloudwatchLogPayload) {
        this.sendCloudWatch(
            this.cloudwatchConfig.groupName,
            this.cloudwatchConfig.stream_info,
            payload,
        );
    }

    public sendError(payload: CloudwatchLogPayload) {
        this.sendCloudWatch(
            this.cloudwatchConfig.groupName,
            this.cloudwatchConfig.stream_error,
            payload,
        );
    }

    private sendCloudWatch(
        group: string,
        stream: string,
        payload: CloudwatchLogPayload,
    ) {
        const logEvents = [
            {
                timestamp: new Date().getTime(),
                message: `[${payload.timestamp}] [${payload.level}] [${
                    payload.category
                }] ${payload.metadata !== '' ? '- ' + payload.metadata : ''} : ${
                    payload.message
                }`,
            },
        ];
        const command = new PutLogEventsCommand({
            logGroupName: group,
            logStreamName: stream,
            logEvents,
        });
        this.cloudWatchClient.send(command);
    }
}
