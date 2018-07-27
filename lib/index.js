'use strict'

const _ = require('lodash')

/**
 * The hapi plugin implementation
 */
async function register (server) {
  server.decorate('request', 'all', function all () {
    return _.merge({}, this.payload, this.query)
  })

  server.decorate('request', 'only', function only (keys) {
    return _.pick(this.all(), keys)
  })

  server.decorate('request', 'except', function except (keys) {
    return _.omit(this.all(), keys)
  })

  server.decorate('request', 'header', function header (name) {
    return this.headers[name]
  })

  server.decorate('request', 'hasHeader', function hasHeader (name) {
    return !!this.headers(name)
  })

  server.decorate('request', 'isJson', function isJson () {
    const contentType = this.header('content-type')
    return contentType && contentType.includes('/json', '+json')
  })

  server.decorate('request', 'wantsJson', function wantsJson () {
    const accepted = this.header('accept')
    return accepted && accepted.includes('/json', '+json')
  })

  server.decorate('request', 'wantsHtml', function wantsHtml () {
    const accepted = this.header('accept')
    return accepted && accepted.includes('text/html')
  })

  server.decorate('request', 'cookie', function cookie (name) {
    return this.state[name]
  })

  server.decorate('request', 'cookies', function cookies () {
    return this.state
  })
}

exports.plugin = {
  register,
  pkg: require('../package.json'),
  once: true
}
