import JsonError from '../json/JsonError'
import type { IReservation } from '../entities/Reservation';
import { JsonReservation } from '../json/JsonReservation';
import User from '../entities/User';


export const reservationToJsonReservation = (reservation: IReservation) => reservation as JsonReservation


export const findReservationsByUserId = async (id: string): Promise<IReservation[]> => {
  try {
    console.log("id finale --> ", id)
    const user = (await User.findById(id)) 
    return user.reservations
  } catch (err) {
    throw new JsonError(`Cannot find reservations with id ${id} (${err.message})`)
  }
}