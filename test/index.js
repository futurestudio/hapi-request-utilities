'use strict'

const Lab = require('lab')
const Code = require('code')
const Hapi = require('hapi')

let server

const { experiment, it, beforeEach } = (exports.lab = Lab.script())
const expect = Code.expect

experiment('hapi-request-utilities plugin', () => {
  beforeEach(async () => {
    server = new Hapi.Server()
    await server.initialize()

    await server.register({
      plugin: require('../lib/index')
    })
  })

  it('tests the request.all decoration', async () => {
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

  it('tests the request.all decoration and query takes priority', async () => {
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
        isHapiPassionate: 'oh-yeah',
        name: 'other Name'
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

  it('tests the request.only decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.only(['name'])
      }
    })

    const request = {
      url: '/?name=marcus&developer=hapi',
      method: 'GET',
      payload: {
        isHapiPassionate: true
      }
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)

    const payload = JSON.parse(response.payload)
    expect(payload.name).to.equal('marcus')
  })

  it('tests the request.only decoration with string as key (not array of strings)', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.only('name')
      }
    })

    const request = {
      url: '/?name=marcus&developer=hapi',
      method: 'GET',
      payload: {
        isHapiPassionate: true
      }
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)

    const payload = JSON.parse(response.payload)
    expect(payload.name).to.equal('marcus')
  })

  it('tests the request.except decoration', async () => {
    server.route({
      path: '/',
      method: 'POST',
      handler: request => {
        return request.except(['name'])
      }
    })

    const request = {
      url: '/?name=marcus&developer=hapi',
      method: 'POST',
      payload: {
        isHapiPassionate: true
      }
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)

    const payload = JSON.parse(response.payload)
    expect(payload).to.equal({
      developer: 'hapi',
      isHapiPassionate: true
    })
  })

  it('tests the request.except decoration with string as key (not array of strings)', async () => {
    server.route({
      path: '/',
      method: 'POST',
      handler: request => {
        return request.except('isHapiPassionate')
      }
    })

    const request = {
      url: '/?name=marcus&developer=hapi',
      method: 'POST',
      payload: {
        isHapiPassionate: true
      }
    }

    const response = await server.inject(request)
    expect(response.statusCode).to.equal(200)

    const payload = JSON.parse(response.payload)
    expect(payload).to.equal({
      name: 'marcus',
      developer: 'hapi'
    })
  })

  it('test the request.header decoration', async () => {
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

  it('test the request.hasHeader decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.hasHeader('x-data')
      }
    })

    let request = {
      url: '/',
      method: 'GET',
      headers: {
        'X-Data': 'hapi-request-utilities'
      }
    }

    let response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(true)

    request = {
      url: '/',
      method: 'GET',
      headers: { }
    }

    response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(false)
  })

  it('test the request.isJson decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.isJson()
      }
    })

    let request = {
      url: '/',
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }

    let response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(true)

    request = {
      url: '/',
      method: 'GET',
      headers: { }
    }

    response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(false)
  })

  it('test the request.wantsJson decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.wantsJson()
      }
    })

    let request = {
      url: '/',
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    }

    let response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(true)

    request = {
      url: '/',
      method: 'GET',
      headers: { }
    }

    response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(false)
  })

  it('test the request.wantsHtml decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.wantsHtml()
      }
    })

    let request = {
      url: '/',
      method: 'GET',
      headers: {
        'accept': 'text/html'
      }
    }

    let response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(true)

    request = {
      url: '/',
      method: 'GET',
      headers: { }
    }

    response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(false)
  })

  it('test the request.cookie decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.cookie('name') || 'empty'
      }
    })

    let request = {
      url: '/',
      method: 'GET',
      headers: {
        cookie: 'name=Marcus'
      }
    }

    let response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(response.payload).to.equal('Marcus')

    request = {
      url: '/',
      method: 'GET',
      headers: { }
    }

    response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(response.payload).to.equal('empty')
  })

  it('test the request.cookies decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.cookies()
      }
    })

    let request = {
      url: '/',
      method: 'GET',
      headers: {
        cookie: 'name=Marcus; token=123'
      }
    }

    let response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal({
      name: 'Marcus',
      token: '123'
    })

    request = {
      url: '/',
      method: 'GET',
      headers: { }
    }

    response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal({})
  })

  it('test the request.hasCookie decoration', async () => {
    server.route({
      path: '/',
      method: 'GET',
      handler: request => {
        return request.hasCookie('name')
      }
    })

    let request = {
      url: '/',
      method: 'GET',
      headers: {
        cookie: 'name=Marcus'
      }
    }

    let response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(true)

    request = {
      url: '/',
      method: 'GET',
      headers: { }
    }

    response = await server.inject(request)
    expect(response.statusCode).to.equal(200)
    expect(JSON.parse(response.payload)).to.equal(false)
  })
})
