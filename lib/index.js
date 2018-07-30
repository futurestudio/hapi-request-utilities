'use strict'

const _ = require('lodash')

async function register (server) {
  /**
   * Returns an object of merged request payload, path and
   * query parameter data. If a key is present in all
   * three inputs, the query parameter is prioritized over
   * path parameters and payload.
   */
  server.decorate('request', 'all', function () {
    return _.merge({}, this.payload, this.params, this.query)
  })

  /**
   * Returns an object containing only the selected
   * attributes from the request payload or query
   * parameters.
   */
  server.decorate('request', 'only', function (keys) {
    keys = Array.isArray(keys) ? keys : [keys]
    return _.pick(this.all(), keys)
  })

  /**
   * Returns an object containing all attributes from
   * the request payload or query parameters except
   * the given keys.
   */
  server.decorate('request', 'except', function (keys) {
    keys = Array.isArray(keys) ? keys : [keys]
    return _.omit(this.all(), keys)
  })

  /**
   * Returns the selected request header by name.
   */
  server.decorate('request', 'header', function (name) {
    return this.headers[name]
  })

  /**
   * Returns a boolean value indicating whether the
   * selected header is present on the request.
   */
  server.decorate('request', 'hasHeader', function (name) {
    return !!this.header(name)
  })

  /**
   * Returns a boolean value indicating whether the
   * request has a content type that indicates JSON.
   */
  server.decorate('request', 'isJson', function () {
    const contentType = this.header('content-type')
    return !!contentType && contentType.includes('/json', '+json')
  })

  /**
   * Returns a boolean value indicating whether the
   * response should be a JSON string. It checks the
   * accept header to indicate JSON.
   */
  server.decorate('request', 'wantsJson', function () {
    const accepted = this.header('accept')
    return !!accepted && accepted.includes('/json', '+json')
  })

  /**
   * Returns a boolean value indicating whether the
   * response should be HTML. It checks the accept
   * header to indicate HTML.
   */
  server.decorate('request', 'wantsHtml', function () {
    const accepted = this.header('accept')
    return !!accepted && accepted.includes('text/html')
  })

  /**
   * Returns the selected request cookie by name.
   */
  server.decorate('request', 'cookie', function (name) {
    return this.state[name]
  })

  /**
   * Returns all request cookies.
   */
  server.decorate('request', 'cookies', function () {
    return this.state
  })

  /**
   * Returns a boolean value indicating whether the
   * selected cookie is present on the request.
   */
  server.decorate('request', 'hasCookie', function (name) {
    return !!this.cookie(name)
  })
}

exports.plugin = {
  register,
  pkg: require('../package.json'),
  once: true
}
