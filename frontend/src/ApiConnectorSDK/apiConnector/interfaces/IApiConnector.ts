import { IHttpClient, RequestConfig } from '../httpClient';

export type IApiConnector = Readonly<{
    createClient(): IHttpClient;
    getToken(): string | null;
    setToken(token: string): void;
    getCache<T>(key: string): T | null;
    setCache<T>(key: string, value: T): void;
    fetchHelper(client: IHttpClient, config: RequestConfig): Promise<[object] | null | Error>;
}>;
