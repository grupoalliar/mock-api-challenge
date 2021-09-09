'use strict'

const examModel = {
  1: { name: 'Ecocardiograma', type: 'imagem', status: 'ativo' },
  2: { name: 'Raio X', type: 'imagem', status: 'ativo' }
}

const laboratoryModel = {
  1: { name: 'lab1', adress: 'Rua 1 - Jardim - Santo André', status: 'ativo' },
  2: { name: 'lab2', adress: 'Rua 2 - Centro - São Paulo', status: 'ativo' }
}

const laboratoryExamModel = {
  1: { laboratory: 1, exam: 2 },
  2: { laboratory: 2, exam: 2 },
  3: { laboratory: 2, exam: 1 }
}

module.exports = {
  exam: repository(examModel),
  laboratory: repository(laboratoryModel),
  laboratoryExam: repository(laboratoryExamModel)
}


function repository (db) {

  return {
    create, read, update, del, uid, readAll, readAllLaboratory, readLaboratory
  }

  function uid () {
    return Object.keys(db)
      .sort((a, b) => a - b)
      .map(Number)
      .filter((n) => !isNaN(n))
      .pop() + 1 + ''
  }

  function create (id, data, cb) {
    if (db.hasOwnProperty(id)) {
      const err = Error('resource exists')
      setImmediate(() => cb(err))
      return
    }
    Reflect.set(data, 'status', 'ativo')
    db[id] = data
    setImmediate(() => cb(null, id))
  }

  function read (id, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      setImmediate(() => cb(err))
      return
    }
    setImmediate(() => cb(null, db[id]))
  }

  function readLaboratory (id, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      setImmediate(() => cb(err))
      return
    }
    const result = db[id]
    const arrayLaboratoryExam = Object.keys(laboratoryExamModel).map(i => laboratoryExamModel[i])
    const exams = arrayLaboratoryExam.filter((item) => parseInt(item.laboratory) === parseInt(id))
    if(exams.length > 0 ) {
      Reflect.set(result, 'exams', [])
      exams.map(item => {
        if(examModel[item.exam]) value.exams.push(examModel[item.exam])
      })
    }
    setImmediate(() => cb(null, db[id]))
  }

  function readAll (cb) {
    const result = []
    for (const [key, value] of Object.entries(db)) {
      result.push({id: key, ...value})
    }
    setImmediate(() => cb(null, result))
  }

  function readAllLaboratory (cb) {
    const result = []
    const arrayLaboratoryExam = Object.keys(laboratoryExamModel).map(i => laboratoryExamModel[i])
    for (const [key, value] of Object.entries(db)) {
      const exams = arrayLaboratoryExam.filter((item) => parseInt(item.laboratory) === parseInt(key))
      if(exams.length > 0 ) {
        Reflect.set(value, 'exams', [])
        exams.map(item => {
          if(examModel[item.exam]) value.exams.push(examModel[item.exam])
        })
      }
      result.push({id: parseInt(key), ...value})
    }
    setImmediate(() => cb(null, result))
  }

  function update (id, data, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      setImmediate(() => cb(err))
      return
    }
    db[id] = data
    setImmediate(() => cb())
  }

  function del (id, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      setImmediate(() => cb(err))
      return
    }
    delete db[id]
    setImmediate(() => cb())
  }
}