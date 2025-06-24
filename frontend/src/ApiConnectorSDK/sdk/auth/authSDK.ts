import { IApiConnector } from '../../apiConnector/interfaces/IApiConnector';
import { createBodyStringFromObject, createHeadersFromObject } from '../../apiConnector/httpClient';
import { HttpMethod } from '../../apiConnector/httpClient/enums/HttpMethod';
import { SignInType, SignUpType } from './types';

export async function AuthSignIn(api: IApiConnector, { email, password }: SignInType): Promise<null | Error> {
    console.log('AuthSignIn called with:', { email, password });

    const client = api.createClient();
    const config = client.createRequestConfig({
        method: HttpMethod.POST,
        url: `/auth/signin`,
        body: createBodyStringFromObject({
            email,
            password,
        }),
        headers: createHeadersFromObject({ 'Content-Type': 'application/json' }),
    });

    return client
        .fetch(config)
        .then(async (res) => {
            if (!res.ok) return Promise.reject(await res.json());
            return res;
        })
        .then(async (res) => {
            const { access_token } = await res.json();
            api.setToken(access_token);
            return Promise.resolve(access_token);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export async function AuthSignUp(api: IApiConnector, { email, password, firstName, lastName, nickName }: SignUpType): Promise<null | Error> {
    const client = api.createClient();
    const config = client.createRequestConfig({
        method: HttpMethod.POST,
        url: `/auth/signup/`,
        body: createBodyStringFromObject({
            email,
            password,
            firstName,
            lastName,
            nickName,
        }),
        headers: createHeadersFromObject({ 'Content-Type': 'application/json' }),
    });

    return client
        .fetch(config)
        .then(async (res) => {
            if (!res.ok) return Promise.reject(await res.json());
            return res;
        })
        .then(async (res) => {
            const resjson = await res.json();
            // api.setToken(access_token);
            return Promise.resolve(resjson);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}


