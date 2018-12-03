<div align="center">
  <img width="471" style="max-width:100%;" src="https://github.com/fs-opensource/hapi-request-utilities/blob/master/media/hapi-request-utilities.png?raw=true" alt="hapi-request-utilities logo">
  <br/>
  <br/>
  <p>
    hapi request decorations to conveniently access request data
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a> ·
    <a href="#methods"><strong>Methods</strong></a>
  </p>
  <br/>
  <br/>
  <p>

  [![Build Status](https://travis-ci.org/fs-opensource/hapi-request-utilities.svg?branch=master)](https://travis-ci.org/fs-opensource/hapi-request-utilities) [![Greenkeeper badge](https://badges.greenkeeper.io/fs-opensource/hapi-request-utilities.svg)](https://greenkeeper.io/)
  <a href="https://snyk.io/test/github/fs-opensource/hapi-request-utilities"><img src="https://snyk.io/test/github/fs-opensource/hapi-request-utilities/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/fs-opensource/hapi-request-utilities" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/hapi-request-utilities"><img src="https://img.shields.io/npm/v/hapi-request-utilities.svg" alt="hapi-request-utilities Version" data-canonical-src="https://img.shields.io/npm/v/hapi-request-utilities.svg" style="max-width:100%;"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> for updates!</em>
  </p>
</div>

------

<p align="center"><sup>Development of this hapi plugin is supported by <a href="https://futurestud.io">Future Studio University 🚀</a></sup>
<br><b>
Join the <a href="https://futurestud.io/university">Future Studio University and Skyrocket in Node.js</a></b>
</p>

------


## Introduction
A hapi plugin that decorates the `request` with methods to quickly and conveniently access incoming data.


### Requirements
This plugin uses async/await which requires **Node.js v8 or newer**.


## Installation
Add `hapi-request-utilities` as a dependency to your project:

```bash
# NPM 5: this way is yours
npm i hapi-request-utilities

# NPM 4:
npm i -S hapi-request-utilities
```


## Usage
Register `hapi-request-utilities` to your hapi server and that's it :)

```js
await server.register({
  plugin: require('hapi-request-utilities')
})

// went smooth like chocolate :)
```


## Methods
An overview of available hapi `request` decorations.


#### request.all()
Returns an object of merged request payload, path and query parameter data.

If a key is present in all three inputs, the query parameter is prioritized over path parameters and payload.


#### request.only(keys)
Returns an object containing only the selected `keys` from the request payload, path and query parameters.

```js
const credentials = request.only(['email', 'password'])
// or
const { email, password } = request.only(['email', 'password'])

// alternative with single key
const username = request.only('username')
```


#### request.except(keys)
Returns an object containing all attributes from the request payload, path and query parameters except the given `keys`.

```js
const noSecrets = request.except(['token', 'password', 'secret'])

// alternative with single key
const noToken = request.except('token')
```


#### request.header(name)
Returns the selected request header by name.

```js
const accept = request.header('accept')
```


#### request.hasHeader(name)
Returns a boolean value indicating whether the selected header is present on the request.

```js
const hasAccept = request.hasHeader('accept')
```


#### request.isJson()
Returns a boolean value indicating whether the request has a content type that indicates JSON.

```js
const isJson = request.isJson()
```


#### request.wantsJson()
Returns a boolean value indicating whether the response should be a JSON string. It checks the accept header to indicate JSON.

```js
const wantsJson = request.wantsJson()
```


#### request.wantsHtml()
Returns a boolean value indicating whether the response should be HTML. It checks the accept header to indicate HTML.

```js
const wantsHtml = request.wantsHtml()
```


#### request.cookie(name)
Returns the selected request cookie by name.

```js
const userId = request.cookie('userId')
```


#### request.cookies()
Returns all request cookies.

```js
const cookies = request.cookies()
```


#### request.hasCookie(name)
Returns a boolean value indicating whether the selected cookie is present on the request.

```js
const hasUserId = request.hasCookie('userId')
```


## Feature Requests
Do you miss a feature? Please don’t hesitate to
[create an issue](https://github.com/fs-opensource/hapi-request-utilities/issues) with a short description of your desired addition to this plugin.


## Links & Resources

- [hapi tutorial series](https://futurestud.io/tutorials/hapi-get-your-server-up-and-running) with 100+ tutorials


## Contributing

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License

MIT © [Future Studio](https://futurestud.io)

---

> [futurestud.io](https://futurestud.io) &nbsp;&middot;&nbsp;
> GitHub [@fs-opensource](https://github.com/fs-opensource/) &nbsp;&middot;&nbsp;
> Twitter [@futurestud_io](https://twitter.com/futurestud_io)
