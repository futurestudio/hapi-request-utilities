'use strict'

const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')

let server

const { experiment, it, beforeEach } = (exports.lab = Lab.script())
const expect = Code.expect

experiment('hapi-dev-error register plugin', () => {
  beforeEach(async () => {
    server = new Hapi.Server()
    await server.initialize()

    await server.register({
      plugin: require('../lib/index')
    })
  })

  it('request.all decoration', async () => {
    server.route({
      path: '/',
      method: 'POST',
      handler: request => {
        return request.all()
      }
    })

    const request = {
      url: '/?name=marcus',
      method: 'POST',
      payload: {
        isHapiPassionate: 'oh-yeah'
      }
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)

    const payload = JSON.parse(response.payload)
    expect(payload).to.equal({
      name: 'marcus',
      isHapiPassionate: 'oh-yeah'
    })
  })

  it('request.only decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.only(['name'])
      }
    })

    const request = {
      url: '/?name=marcus&developer=hapi',
      method: 'GET'
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)

    const payload = JSON.parse(response.payload)
    expect(payload.name).to.equal('marcus')
  })

  it('request.header decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.header('x-data')
      }
    })

    const request = {
      url: '/',
      method: 'GET',
      headers: {
        'X-Data': 'hapi-request-utilities'
      }
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(response.payload).to.equal('hapi-request-utilities')
  })
})
