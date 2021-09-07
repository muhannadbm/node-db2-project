// DO YOUR MAGIC
const express = require('express')
const carRouter = express.Router()
const Car = require('./cars-model')
const { checkCarId, checkVinNumberUnique, checkVinNumberValid, checkCarPayload} = require('./cars-middleware')

carRouter.get('/', async(req,res)=>{
let myCars = await Car.getAll()
res.json(myCars)
})

carRouter.get('/:id',checkCarId, async(req,res)=>{
    let mycar = await Car.getById(req.params.id)
    res.json(mycar)
})

carRouter.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async(req,res)=>{
    let id = await Car.create(req.body)
    let mycar = await Car.getById(id)
    res.status(201).json(mycar)
})



module.exports = carRouter
