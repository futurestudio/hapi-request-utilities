# Changelog


## [2.1.0](https://github.com/futurestudio/hapi-request-utilities/compare/v2.0.0...v2.1.0) - 2019-07-29

### Added
- `request.input('key')` to retrieve an input item from the `request`
- `request.isAuthenticated()` is a shortcut for `request.auth.isAuthenticated`. It returns a boolean whether the request is authenticated:
  - `true`: successfully authenticated the request via an auth strategy
  - `false`: unauthenticated request that hasn't passed an auth strategy

### Updated
- bump dependencies


## [2.0.0](https://github.com/futurestudio/hapi-request-utilities/compare/v1.3.0...v2.0.0) - 2019-04-24

### Updated
- `request.user` returns the authenticated credentials, was previously a function `request.user()`
- updating to the scoped hapi dependencies
- bump dependencies


## [1.3.0](https://github.com/futurestudio/hapi-request-utilities/compare/v1.2.1...v1.3.0) - 2019-02-28

### Added
- `request.has(keys)`: determine whether the request includes the given input `keys`
- `request.filled(keys)`: determines whether the request includes a non-empty value for the input `keys`


## [1.2.1](https://github.com/futurestudio/hapi-request-utilities/compare/v1.2.0...v1.2.1) - 2019-02-18

### Updated
- bump dependencies
- fix badges in Readme


## [1.2.0](https://github.com/futurestudio/hapi-request-utilities/compare/v1.1.1...v1.2.0) - 2019-01-26

### Added
- `request.user()`: returns the authenticated request credentials. It's a shortcut for `request.auth.credentials`

### Updated
- Readme: rename GitHub references `futurestudio -> futurestudio`


## [1.1.1](https://github.com/futurestudio/hapi-request-utilities/compare/v1.1.0...v1.1.1) - 2019-01-22

### Added
- add Greenkeeper Badge to Readme

### Updated
- test plugin for hapi 18
- Readme: link to detailed documentation in Boost docs
- bump dependencies


## [1.1.0](https://github.com/futurestudio/hapi-request-utilities/compare/v1.0.4...v1.1.0) - 2018-11-23

### Added
- `bearerToken` method to get the bearer token from request headers

### Updated
- Doc blocks on methods: added param and return types
- Dependencies


## [1.0.4](https://github.com/futurestudio/hapi-request-utilities/compare/v1.0.3...v1.0.4) - 2018-11-07

### Updated
- Readme: add logo
- Run tests for Node versions 8, 10, and 11
- Dependencies


## [1.0.3](https://github.com/futurestudio/hapi-request-utilities/compare/v1.0.2...v1.0.3) - 2018-08-21

### Updated
- Readme: quick navigation and fix logo size on small screens


### [1.0.2](https://github.com/futurestudio/hapi-request-utilities/compare/v1.0.1...v1.0.2) - 2018-08-02

### Updated
- add contributors
- update readme


### [1.0.1](https://github.com/futurestudio/hapi-request-utilities/compare/v1.0.0...v1.0.1) - 2018-07-30

### Updated
- move `husky` to `devDependencies` (was accidentally installed in `dependencies`)


## 1.0.0 - 2018-07-30

### Added
- `1.0.0` release 🚀 🎉
