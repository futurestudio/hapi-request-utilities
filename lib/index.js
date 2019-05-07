'use strict'

const _ = require('lodash')

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
    return _.merge({}, this.payload, this.params, this.query)
  })

  /**
   * Returns an object containing only the selected
   * attributes from the request payload or query
   * parameters.
   *
   * @param {String|Array} keys
   *
   * @returns {Object}
   */
  server.decorate('request', 'only', function (keys) {
    keys = Array.isArray(keys) ? keys : [keys]

    return _.pick(this.all(), keys)
  })

  /**
   * Returns an object containing all attributes from
   * the request payload or query parameters except
   * the given keys.
   *
   * @param {String|Array} keys
   *
   * @returns {Object}
   */
  server.decorate('request', 'except', function (keys) {
    keys = Array.isArray(keys) ? keys : [keys]

    return _.omit(this.all(), keys)
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
    const header = this.header('authorization')

    if (_.startsWith(header, 'Bearer ')) {
      return header.substring(7)
    }
  })

  /**
   * Returns a boolean value indicating whether the
   * request has a content type that indicates JSON.
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'isJson', function () {
    const contentType = this.header('content-type')

    return !!contentType && contentType.includes('/json', '+json')
  })

  /**
   * Returns a boolean value indicating whether the
   * response should be a JSON string. It checks the
   * accept header to indicate JSON.
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'wantsJson', function () {
    const accepted = this.header('accept')

    return !!accepted && accepted.includes('/json', '+json')
  })

  /**
   * Returns a boolean value indicating whether the
   * response should be HTML. It checks the accept
   * header to indicate HTML.
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'wantsHtml', function () {
    const accepted = this.header('accept')

    return !!accepted && accepted.includes('text/html')
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
   * @returns {Object}
   */
  server.decorate('request', 'user', function (request) {
    return request.auth.credentials
  }, { apply: true })

  /**
   * Determine whether the request includes the
   * given input `keys`.
   *
   * @param {String|Array} keys
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'has', function (keys) {
    keys = Array.isArray(keys) ? keys : [keys]

    const input = Object.keys(this.all())

    return keys.every(key => input.includes(key))
  })

  /**
   * Determine whether the request includes a
   * non-empty value for the input `keys`.
   *
   * @param {String|Array} keys
   *
   * @returns {Boolean}
   */
  server.decorate('request', 'filled', function (keys) {
    keys = Array.isArray(keys) ? keys : [keys]

    const input = this.all()

    return keys.every(key => {
      return this.has(key) && !_.isEmpty(input[key])
    })
  })
}

exports.plugin = {
  register,
  once: true,
  pkg: require('../package.json')
}
