import CookieApi from '../src';

describe('Index service testing', () => {
    it('serializes cookies', () => {
        expect(
            CookieApi.serializeCookies({
                a: '@rts',
            }),
        ).toEqual('a=%40rts');
    });

    it('adds and get cookies', () => {
        const api = new CookieApi('');

        api.addCookies({
            a: '@',
        });

        expect(api.getCookies()).toEqual({ a: '@' });
        expect(api.getDefaultHeaders().cookie).toEqual('a=%40');
    });
});
