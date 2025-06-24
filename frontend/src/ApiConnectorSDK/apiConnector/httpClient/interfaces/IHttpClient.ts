import { HttpMethod } from '../enums/HttpMethod';

export function createBodyStringFromObject<T>(obj: Readonly<T>): string {
    return JSON.stringify(obj);
}

export function createHeadersFromObject(obj: Readonly<Record<string, string | number | boolean>>): Headers {
    const headers = new Headers();
    Object.keys(obj).forEach((key) => {
        if (obj[key] !== undefined && obj[key] !== null) {
            headers.append(key, obj[key].toString());
        }
    });
    return headers;
}

export interface IHttpClient {
    fetch(config: RequestConfig): Promise<Readonly<Response>>;
    createRequestConfig(requestConfig: RequestConfig): RequestConfig;
}

export interface RequestConfig {
    url: Readonly<string>;
    method: Readonly<HttpMethod>;
    body?: Readonly<string | FormData>;
    headers?: Readonly<Headers>;
}