'use strict'

const _ = require('lodash')
const RequestDecorations = require('./request-decorations')

const decorations = [ 'only', 'isJson', 'header', 'hasHeader', 'wantsJson', 'wantsHtml' ]

/**
 * The hapi plugin implementation
 */
async function register (server) {
  _.forEach(decorations, function (method) {
    server.decorate('request', method)
  })

  server.ext('onRequest', function (request, h) {
    request.all = RequestDecorations.all
    request.only = RequestDecorations.only
    request.isJson = RequestDecorations.isJson
    request.header = RequestDecorations.header
    request.hasHeader = RequestDecorations.hasHeader
    request.wantsJson = RequestDecorations.wantsJson
    request.wantsHtml = RequestDecorations.wantsHtml

    return h.continue
  })
}

exports.plugin = {
  register,
  pkg: require('../package.json'),
  once: true
}
