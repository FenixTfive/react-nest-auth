import { IHttpClient, RequestConfig } from './interfaces/IHttpClient';

export type HttpClientConfig = {
    baseUrl: string;
    defaultHeaders: Headers;
};

export class HttpClient implements IHttpClient {
    private _config: HttpClientConfig;
    constructor(config: HttpClientConfig) {
        this._config = config;
    }
    createRequestConfig(requestConfig: RequestConfig): RequestConfig {
        return {
            ...requestConfig,
            url: `${this._config.baseUrl}${requestConfig.url}`,
        };
    }

    async fetch(config: RequestConfig): Promise<Response> {
        const response = await fetch(config.url, config);

        // If user is unauthorized
        if (response.status === 401) {
            document.dispatchEvent(new CustomEvent('unauthorized'));
        }
        return response;
    }
}