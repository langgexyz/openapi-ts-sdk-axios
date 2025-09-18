import { HttpBuilder, HttpMethod } from 'openapi-ts-sdk';
/**
 * Axios HTTP Builder 实现
 */
export class AxiosHttpBuilder extends HttpBuilder {
    constructor(url, axiosInstance) {
        super(url);
        this.axiosInstance = axiosInstance;
    }
    build() {
        return {
            send: async () => {
                try {
                    const config = {
                        method: this.method_.toLowerCase(),
                        url: `${this.baseUrl_}${this.uri_}`,
                        headers: Object.fromEntries(this.headers_)
                    };
                    // 对于 GET 请求，将 JSON 内容作为查询参数
                    if (this.method_ === HttpMethod.GET && this.content_) {
                        const params = JSON.parse(this.content_);
                        // 确保解析的结果是一个对象
                        if (typeof params === 'object' && params !== null && !Array.isArray(params)) {
                            config.params = params;
                        }
                    }
                    else if (this.content_) {
                        config.data = this.content_;
                    }
                    const response = await this.axiosInstance.request(config);
                    const responseData = typeof response.data === 'string'
                        ? response.data
                        : JSON.stringify(response.data);
                    return [responseData, null];
                }
                catch (error) {
                    const errorMessage = error.response?.data?.message || error.message || 'Axios request failed';
                    const httpError = new Error(errorMessage);
                    // 添加更多错误信息
                    if (error.response) {
                        httpError.status = error.response.status;
                        httpError.statusText = error.response.statusText;
                        httpError.data = error.response.data;
                    }
                    return ['', httpError];
                }
            }
        };
    }
}
//# sourceMappingURL=axios-http-builder.js.map