'use strict'

const _ = require('lodash')

class InteractsWithRequest {
  static header (key) {
    return this.headers[key]
  }

  static hasHeader (key) {
    return !!this.headers(key)
  }

  static isJson () {
    const contentType = this.headers['content-type']
    return contentType && contentType.includes('/json', '+json')
  }

  static wantsJson () {
    const accepted = this.headers['accept']
    return accepted && accepted.includes('/json', '+json')
  }
  static wantsHtml () {
    const accepted = this.headers['accept']
    return accepted && accepted.includes('text/html')
  }

  static only (keys) {
    return _.pick(this.all(), keys)
  }

  static all () {
    return _.merge({}, this.payload, this.query)
  }
}

module.exports = InteractsWithRequest
