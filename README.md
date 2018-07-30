<p align="center">
  hapi-request-utilities
</p>

## Tbc.
Soon :)


## Methods
An overview of available hapi `request` decorations.


### request.all()
Returns an object of merged request payload, path and query parameter data.

If a key is present in all three inputs, the query parameter is prioritized over path parameters and payload.


### request.only(keys)
Returns an object containing only the selected `keys` from the request payload, path and query parameters.

```js
const data = request.only(['email', 'password'])

// alternative with single key
const data = request.only('username')
```


### request.except(keys)
Returns an object containing all attributes from the request payload, path and query parameters except the given `keys`.

```js
const data = request.except(['token', 'password', 'secret'])

// alternative with single key
const data = request.except('token')
```


### request.header(name)
Returns the selected request header by name.

```js
const accept = request.header('accept')
```


### request.hasHeader(name)
Returns a boolean value indicating whether the selected header is present on the request.

```js
const accept = request.hasHeader('accept')
```


### request.isJson()
Returns a boolean value indicating whether the request has a content type that indicates JSON.

```js
const isJson = request.isJson()
```


### request.wantsJson()
Returns a boolean value indicating whether the response should be a JSON string. It checks the accept header to indicate JSON.

```js
const wantsJson = request.wantsJson()
```


### request.wantsHtml()
Returns a boolean value indicating whether the response should be HTML. It checks the accept header to indicate HTML.

```js
const wantsHtml = request.wantsHtml()
```


### request.cookie(name)
Returns the selected request cookie by name.

```js
const userId = request.cookie('userId')
```


### request.cookies()
Returns all request cookies.

```js
const cookies = request.cookies()
```


### request.hasCookie()
Returns a boolean value indicating whether the selected cookie is present on the request.
   
```js
const hasUserId = request.hasCookie('userId')
```


## Feature Requests
Do you miss a feature? Please don’t hesitate to
[create an issue](https://github.com/fs-opensource/hapi-request-utilities/issues) with a short description of your desired addition to this plugin.


## Links & Resources

- [hapi tutorial series](https://futurestud.io/tutorials/hapi-get-your-server-up-and-running) with 90+ tutorials


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
