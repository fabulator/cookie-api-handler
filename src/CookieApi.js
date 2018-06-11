// @flow strict
import cookie from 'cookie';
import { Api } from 'rest-api-handler/src';

export default class CookieApi<ResponseType> extends Api<ResponseType> {
    /**
     * Serialize Object of cookies to single string.
     *
     * @param cookies - Object with cookies
     * @returns serialized cookies string
     */
    static serializeCookies(cookies: { [string]: string }): string {
        return Object.keys(cookies).map((name) => {
            return cookie.serialize(name, cookies[name]);
        }).join(';');
    }

    /**
     * Process response headers, parse cookies and save them to object.
     *
     * @private
     * @param request - Fetch request
     * @returns Response
     */
    fetchRequest: (request: Request) => Promise<Response> = async (request) => {
        const response = await Api.prototype.fetchRequest.call(this, request);

        const setCookieHeader = response.headers.get('set-cookie');

        // if set cookies headers are not set, just continue
        if (!setCookieHeader) {
            return response;
        }

        let cookies = {};

        // parse multiple set-cookie headers
        setCookieHeader.split(';')
            .map((item) => {
                return item.indexOf('expires') === -1 ? item.replace(',', '\n') : item;
            })
            .join(';')
            .split('\n')
            .map((item) => {
                return cookie.parse(item.split(';')[0]);
            })
            .forEach((item) => {
                cookies = {
                    ...cookies,
                    ...item,
                };
            });

        this.addCookies(cookies);
        return response;
    };

    /**
     * Get cookies as human readable object.
     */
    getCookies(): ?{[string]: string} {
        const cookies: ?string = this.getDefaultHeaders().cookie;
        if (!cookies) {
            return null;
        }

        return cookie.parse(cookies);
    }

    /**
     * Add object of cookies.
     *
     * @param cookies - Object of cookies
     */
    addCookies(cookies: {[string]: string}) {
        this.setDefaultHeader('cookie', CookieApi.serializeCookies({
            ...(this.getCookies()),
            ...cookies,
        }));
    }
}
