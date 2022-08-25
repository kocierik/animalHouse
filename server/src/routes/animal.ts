import AnimalCode from '../entities/AnimalCode'
import { STATUS_OK, STATUS_UNAUTHORIZED, STATUS_BAD_REQUEST } from '../const'
import { Request, Response } from 'express'
import Animal from '../entities/Animal'
import JsonError from '../json/JsonError'

export const getAnimalCodes = async (_: Request, res: Response) => 
  res.status(STATUS_OK)
     .json(
        (await AnimalCode.find({})).map(
          x => ({code: x.code, value: x.value})))


export const getAnimal = async (req: Request, res: Response) => {
  const animal = await Animal.findOne({_id : req.params.id})

  if (!animal)
    return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Can\'t find animal with id ${req.params.id} `))

  // Check user 
  if (animal.userId !== req.authData.id)
    return res.status(STATUS_UNAUTHORIZED).json(new JsonError( 'Can\'t access animal with id ' + animal.id+ ' with this user'))
  else {
    return res.status(STATUS_OK).json(animal)
  } 
}
