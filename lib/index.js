'use strict'

const _ = require('lodash')
const RequestIP = require('@supercharge/request-ip')

async function register (server) {
  /**
   * Returns an object of merged request payload, path and
   * query parameter data. If a key is present in all
   * three inputs, the query parameter is prioritized over
   * path parameters and payload.
   *
   * @returns {Object}
   */
  server.decorate('request', 'all', function () {
    return Object.assign({}, this.payload, this.params, this.query)
  })

  /**
   * Returns an object containing only the selected
   * attributes from the request payload or query
   * parameters.
   *
   * @param {String|String[]} keys
   *
   * @returns {Object}
   */
  server.decorate('request', 'only', function (...keys) {
    return _.pick(this.all(), [].concat(...keys)
    )
  })

  /**
   * Returns an object containing all attributes from
   * the request payload or query parameters except
   * the given keys.
   *
   * @param {String|String[]} keys
   *
   * @returns {Object}
   */
  server.decorate('request', 'except', function (...keys) {
    return _.omit(this.all(), [].concat(...keys))
  })

  /**
   * Determine whether the request includes the given input `keys`.
   *
   * @param {String|String[]} keys
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'has', function (...keys) {
    const input = Object.keys(this.all())

    return []
      .concat(...keys)
      .every(key => input.includes(key))
  })

  /**
   * Determine whether the request is missing the given input `keys`.
   *
   * @param {String|String[]} keys
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'missing', function (...keys) {
    return !this.has(...keys)
  })

  /**
   * Determine whether the request includes a
   * non-empty value for the input `keys`.
   *
   * @param {String|String[]} keys
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'filled', function (...keys) {
    const input = this.all()

    return []
      .concat(...keys)
      .every(key => {
        return this.has(key) && !_.isEmpty(input[key])
      })
  })

  /**
   * Retrieve an item from the request’s input.
   *
   * @param {String} key
   *
   * @returns {*}
   */
  server.decorate('request', 'input', function (key, defaultValue) {
    return _.get(this.all(), key, defaultValue)
  })

  /**
   * Returns the selected request header by name.
   *
   * @param {String} name
   *
   * @returns {String|Undefined}
   */
  server.decorate('request', 'header', function (name) {
    return this.headers[name]
  })

  /**
   * Returns a boolean value indicating whether the
   * selected header is present on the request.
   *
   * @param {String} name
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'hasHeader', function (name) {
    return !!this.header(name)
  })

  /**
   * Returns the bearer token from the authorization
   * request header.
   *
   * @returns {String|Undefined}
   */
  server.decorate('request', 'bearerToken', function () {
    if (this.header('authorization').startsWith('Bearer ')) {
      return this.header('authorization').substring(7)
    }
  })

  /**
   * Returns a boolean value indicating whether the
   * request has a content type that indicates JSON.
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'isJson', function () {
    return this.hasHeader('content-type') &&
            this.header('content-type').includes('/json', '+json')
  })

  /**
   * Returns a boolean value indicating whether the
   * response should be a JSON string. It checks the
   * accept header to indicate JSON.
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'wantsJson', function () {
    return this.hasHeader('accept') &&
            this.header('accept').includes('/json', '+json')
  })

  /**
   * Returns a boolean value indicating whether the
   * response should be HTML. It checks the accept
   * header to indicate HTML.
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'wantsHtml', function () {
    return this.hasHeader('accept') &&
            this.header('accept').includes('text/html')
  })

  /**
   * Returns the selected request cookie by name.
   *
   * @param {String} name
   *
   * @returns {String|Null}
   */
  server.decorate('request', 'cookie', function (name) {
    return this.state[name]
  })

  /**
   * Returns all request cookies.
   *
   * @returns {Object}
   */
  server.decorate('request', 'cookies', function () {
    return this.state
  })

  /**
   * Returns a boolean value indicating whether the
   * selected cookie is present on the request.
   *
   * @param {String} name
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'hasCookie', function (name) {
    return !!this.cookie(name)
  })

  /**
   * Returns the authenticated credentials.
   *
   * @returns {Object}
   */
  server.decorate('request', 'isAuthenticated', function () {
    return this.auth.isAuthenticated
  })

  /**
   * Returns the authenticated credentials.
   *
   * @returns {*}
   */
  server.decorate('request', 'user')
  server.ext('onPostAuth', (request, h) => {
    if (request.auth.isAuthenticated) {
      request.user = request.auth.credentials
    }

    return h.continue
  })

  /**
   * Retrieve the root URL for the application. For example, requesting
   * `https://user:pass@example.com/posts?filter=withVideo`
   * returns `https://example.com`.
   *
   * @returns {String}
   */
  server.decorate('request', 'root', function () {
    const { protocol, hostname } = this.url

    return `${protocol}//${hostname}`
  })

  /**
   * Retrieve the request’s URL without query string.
   *
   * @returns {String}
   */
  server.decorate('request', 'uri', function () {
    const { pathname } = this.url

    return `${this.root()}${pathname}`
  })

  /**
   * Retrieve the request’s full URL as a string.
   *
   * @returns {String}
   */
  server.decorate('request', 'fullUrl', function () {
    const { search, hash } = this.url

    return `${this.uri()}${search}${hash}`
  })

  /**
   * Alias for `request.fullUrl` to comply with the
   * available `request.uri` method.
   *
   * @returns {String}
   */
  server.decorate('request', 'fullUri', function () {
    return this.fullUrl()
  })

  /**
   * Returns the IP address of the request.
   *
   * @returns {String | undefined}
   */
  server.decorate('request', 'ip', function () {
    return RequestIP.getClientIp(this)
  })
}

exports.plugin = {
  register,
  once: true,
  pkg: require('../package.json'),
  requirements: { hapi: '>=18.0.0' }
}
