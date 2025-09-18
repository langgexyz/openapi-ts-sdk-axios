import { HttpBuilder, Http } from 'openapi-ts-sdk';
import type { AxiosInstance } from 'axios';
/**
 * Axios HTTP Builder 实现
 */
export declare class AxiosHttpBuilder extends HttpBuilder {
    private axiosInstance;
    constructor(url: string, axiosInstance: AxiosInstance);
    build(): Http;
}
//# sourceMappingURL=axios-http-builder.d.ts.map