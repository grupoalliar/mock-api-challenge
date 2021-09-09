'use strict'
const { promisify } = require('util')
const { laboratory, laboratoryExam } = require('../../model')
const { uid } = laboratory
const read = promisify(laboratory.readLaboratory)
const readAll = promisify(laboratory.readAllLaboratory)
const create = promisify(laboratory.create)
const update = promisify(laboratory.update)
const del = promisify(laboratory.del)
const laboratoryExamCreate = promisify(laboratoryExam.create)
const laboratoryExamDel = promisify(laboratoryExam.del)
const laboratoryExamReadAll = promisify(laboratoryExam.readAll)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors
  const laboratoryUpdateSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
          data: {
            type: 'object',
            required: ['name', 'adress', 'status'],
            additionalProperties: false,
            properties: {
              name: {type:'string'},
              adress: {type:'string'},
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

  const laboratoryCreateSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
          data: {
            type: 'object',
            required: ['name', 'adress'],
            additionalProperties: false,
            properties: {
              name: {type:'string'},
              adress: {type:'string'}
            }
          }
        }
      }
    }
  }

  const laboratoryExamSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
          data: {
            type: 'object',
            required: ['exam'],
            additionalProperties: false,
            properties: {
              exam: {type:'integer'}
            }
          }
        }
      }
    }
  }

  fastify.post('/', laboratoryCreateSchema, async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.put('/:id', laboratoryUpdateSchema, async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await update(id, data)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.post('/:idLaboratory/enable-exam', laboratoryExamSchema ,async (request, reply) => {
    const { idLaboratory } = request.params
    const { data } = request.body
    data.laboratory = parseInt(idLaboratory)
    const laboratoryExamList = await laboratoryExamReadAll()
    const laboratoryExamFiltred = laboratoryExamList.filter(
      (item) => parseInt(item.laboratory) === parseInt(data.laboratory) &&  parseInt(item.exam) === parseInt(data.exam)
    )
    if(laboratoryExamFiltred.length > 0 ){
      reply.code(409)
      return { error: 'already exists' }
    }
    const id = laboratoryExam.uid()
    await laboratoryExamCreate(id, data)
    reply.code(204)
  })

  fastify.post('/:idLaboratory/disable-exam', laboratoryExamSchema, async (request, reply) => {
    const { idLaboratory } = request.params
    const { data } = request.body
    data.laboratory = idLaboratory
    const laboratoryExamList = await laboratoryExamReadAll()
    const laboratoryExamFiltred = laboratoryExamList.filter(
      (item) => item.laboratory === parseInt(data.laboratory) &&  item.exam == parseInt(data.exam)
    )
    try {
      const id = laboratoryExamFiltred[0].id
      await laboratoryExamDel(id)
      reply.code(204)
    } catch (err) {
      throw notFound()
    }
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