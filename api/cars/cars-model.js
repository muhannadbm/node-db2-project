const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = async (id) => {
  // DO YOUR MAGIC
  return db('cars').where('id', id).first()
}

const create = async (car) => {
  // DO YOUR MAGIC
  return db('cars').insert(car)
}

module.exports = {getAll, getById, create}
