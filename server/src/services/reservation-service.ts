import JsonError from '../json/JsonError'
import type { IReservation } from '../entities/Reservation'
import Reservation from '../entities/Reservation'

export const findReservationsByUserId = async (id: string): Promise<IReservation[]> => {
  try {
    const userReservation = await Reservation.find({ userId: id })
    return userReservation
  } catch (err) {
    throw new JsonError(`Cannot find reservations with id ${id} (${err.message})`)
  }
}

export const postReservation = async (id: string, reservation: IReservation): Promise<IReservation> => {
  try {
    let userReservation = new Reservation()
    userReservation.userId = reservation.userId
    userReservation.animalId = reservation.animalId
    userReservation.date = reservation.date
    userReservation.information = reservation.information
    userReservation.locationId = reservation.locationId
    userReservation.serviceId = reservation.serviceId
    await userReservation.save()
    return reservation
  } catch (err) {
    throw new JsonError(`Cannot push reservation with id ${id} (${err.message})`)
  }
}

export const findReservationsByAnimalId = async (animalId: string): Promise<IReservation[]> => {
  try {
    const userReservation = await Reservation.find({ animalId: animalId })
    return userReservation
  } catch (err) {
    throw new JsonError(`Cannot find reservations with animal id ${animalId} (${err.message})`)
  }
}

export const deleteReservation = async (id: string): Promise<IReservation> => {
  try {
    const userReservation = await Reservation.findById(id)
    await userReservation.deleteOne({ _id: id })
    return userReservation
  } catch (err) {
    throw new JsonError(`Cannot find reservations with id ${id} (${err.message})`)
  }
}

export const getSingleReservation = async (id: string): Promise<IReservation> => {
  try {
    const userReservation = await Reservation.findById(id)
    return userReservation
  } catch (err) {
    throw new JsonError(`Cannot find reservations with id ${id} (${err.message})`)
  }
}

export const getAllReservations = async (): Promise<IReservation[]> => {
  try {
    const userReservation = await Reservation.find({})
    return userReservation
  } catch (err) {
    throw new JsonError(`Cannot find reservations(${err.message})`)
  }
}

export const putReservation = async (id: string, reservation: IReservation): Promise<IReservation> => {
  try {
    let userReservation = await Reservation.findById(id)
    userReservation.userId = reservation.userId
    userReservation.date = reservation.date
    userReservation.information = reservation.information
    userReservation.locationId = reservation.locationId
    await userReservation.save()
    return reservation
  } catch (err) {
    throw new JsonError(`Cannot edit reservation with id ${id} (${err.message})`)
  }
}
