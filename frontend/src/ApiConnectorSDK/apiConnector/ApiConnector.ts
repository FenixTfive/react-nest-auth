import { IHttpClient, RequestConfig } from './httpClient';
import { HttpClient, HttpClientConfig } from './httpClient/HttpClient';
import { Logger } from '../public/logger/logger';
import { ILogger } from '../public/logger/interfaces/ILogger';
import { IApiConfig } from './interfaces/IApiConfig';
import { IApiConnector } from './interfaces/IApiConnector';

export class ApiConnector implements IApiConnector {
    private _config: IApiConfig;
    public logger: ILogger;
    private _token: string | null = null;
    private _cache: Record<string, unknown> = {};

    constructor(config: IApiConfig, logger?: ILogger) {
        this._config = config;
        this.logger = logger || new Logger();
    }

    public createClient(): IHttpClient {
        return new HttpClient({
            baseUrl: this._config.endpointUrl,
        } as HttpClientConfig);
    }

    getToken(): string | null {
        return this._token;
    }

    setToken(token: string): void {
        this._token = token;
    }

    public getCache<T>(key: string): T | null {
        return (this._cache[key] as T) || null;
    }

    public setCache<T>(key: string, value: T): void {
        this._cache[key] = value;
    }

    public fetchHelper(client: IHttpClient, config: RequestConfig): Promise<[object] | null | Error> {
        return client
            .fetch(config)
            .then(async (res) => {
                if (!res.ok) return Promise.reject(await res.json());
                return res;
            })
            .then(async (res) => {
                const jsonObject = await res.json();
                return Promise.resolve(jsonObject);
            })
            .catch((error) => {
                return Promise.reject(error)
            });
    }
}