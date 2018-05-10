// @flow
import { CookieApi } from './../src';

describe('CookieApi service testing', () => {
    it('serialize cookies', () => {
        expect(CookieApi.serializeCookies({
            a: '@rts',
        })).toEqual('a=%40rts');
    });

    it('add and get cookies', () => {
        const api = new CookieApi('');

        api.addCookies({
            a: '@',
        });

        expect(api.getCookies()).toEqual({ a: '@' });
        expect(api.getDefaultHeaders().cookie).toEqual('a=%40');
    });
});
