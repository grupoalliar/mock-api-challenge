'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastifyFormbody = require('fastify-formbody')
const fastifyMultipart = require('fastify-multipart')

module.exports = async function (fastify, opts) {
   
  fastify.register(fastifyFormbody)
  fastify.register(fastifyMultipart)


  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
