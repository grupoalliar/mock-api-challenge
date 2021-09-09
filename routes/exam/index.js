'use strict'
const { promisify } = require('util')
const { exam } = require('../../model')
const { uid } = exam
const read = promisify(exam.read)
const readAll = promisify(exam.readAll)
const create = promisify(exam.create)
const update = promisify(exam.update)
const del = promisify(exam.del)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors
  const examUpdateSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
          data: {
            type: 'object',
            required: ['name', 'type', 'status'],
            additionalProperties: false,
            properties: {
              name: {type:'string'},
              type: {
                type:'string',
                enum: ['analise clinica', 'imagem']
              },
              status: {
                type: 'string',
                enum: ['ativo', 'inativo']
              }
            }
          }
        }
      }
    }
  }

  const examCreateSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
          data: {
            type: 'object',
            required: ['name', 'type'],
            additionalProperties: false,
            properties: {
              name: {type:'string'},
              type: {
                type:'string',
                enum: ['analise clinica', 'imagem']
              }
            }
          }
        }
      }
    }
  }


  fastify.post('/', examCreateSchema, async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      return await read(id)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.get('/', async (request, reply) => {
    try {
      return await readAll()
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.put('/:id', examUpdateSchema, async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await create(id, data)
      reply.code(201)
      return {}
    } catch (err) {
      if (err.message === 'resource exists') {
        await update(id, data)
        reply.code(204)
      } else {
        throw err
      }
    }
  })

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      await del(id)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

}