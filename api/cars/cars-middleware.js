const Car = require('./cars-model')
var vinValidator = require('vin-validator');
const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
  let mycar = await Car.getById(req.params.id)
  if(!mycar) {
    next({ message: `car with id ${req.params.id} is not found`, status: 404 })
  }
}
catch(e){
  next(e)
}
  next()
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC

  if (!('vin' in req.body)){
    next({message: `vin is missing`, status: 400})
  }
  if (!('model' in req.body)){
    next({message: `model is missing`, status: 400})
   }
   if (!('make' in req.body)){
    next({message: `make is missing`, status: 400})
   }
   if (!('mileage' in req.body)){
     next({message: `mileage is missing`, status: 400})
   }
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
 let isValidVin = vinValidator.validate(req.body.vin);
 if(isValidVin){
   next()
 }
 next({ message: `vin ${req.body.vin} is invalid`, status: 400 })
}

const checkVinNumberUnique = async(req, res, next) => {
  // DO YOUR MAGIC
  let cars = await Car.getAll()
  cars.forEach(el => {
    if(el.vin === req.body.vin){
      next({ message: `vin ${req.body.vin} already exists`, status: 400 })
    }
  });
  next()

}

module.exports = { checkCarId, checkVinNumberUnique, checkVinNumberValid, checkCarPayload}