# Cookie API Handler

[![npm version](https://badge.fury.io/js/cookie-api-handler.svg)](https://badge.fury.io/js/cookie-api-handler)
[![renovate-app](https://img.shields.io/badge/renovate-app-blue.svg)](https://renovateapp.com/)
[![Known Vulnerabilities](https://snyk.io/test/github/fabulator/cookie-api-handler/badge.svg)](https://snyk.io/test/github/fabulator/cookie-api-handler)
[![codecov](https://codecov.io/gh/fabulator/cookie-api-handler/branch/master/graph/badge.svg)](https://codecov.io/gh/fabulator/cookie-api-handler)
[![travis](https://travis-ci.org/fabulator/cookie-api-handler.svg?branch=master)](https://travis-ci.org/fabulator/cookie-api-handler)

Extension of [rest-api-handler](https://github.com/fabulator/rest-api-handler) library. It parse cookies from response headers and use them to send requests.

Library is compiled for node 9.6 and include Fetch polyfill.

## How to use it

Install the library:

```nodedaemon
npm install cookie-api-handler
```

Send requests:

```javascript
const { CookieApi } = require('./../dist');

(async () => {
    const api = new CookieApi('');

    await api.get('https://endomondo.com');

    console.log(api.getCookies());
})();
```

For more information about sending requests, check [base library](https://github.com/fabulator/rest-api-handler).

## How to work with cookies

Cookies are inserted to object based on response headers. Class have methods to add custom cookies and read the current ones:

```javascript
// will return object of decoded strings
api.getCookies();


// you can add custom cookies, string only. Cookies will be encoded.
api.addCookies({
    cookieName: 'cookieValue',
});
```
