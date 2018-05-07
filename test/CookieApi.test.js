// @flow
import { CookieApi } from './../src';

const cookieApi = new CookieApi('');

describe('CookieApi service testing', () => {
    it('serialize cookies', () => {
        expect(CookieApi.serializeCookies({
            a: '@rts',
        })).toEqual('a=%40rts');
    })
});
