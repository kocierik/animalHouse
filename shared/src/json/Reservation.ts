import { JsonAddress } from "./user"

export interface ILocation {
  name: string
  address: JsonAddress
}

export interface IReservation {
  animalName: string
  serviceName: string
  userId: string
  date: string
  information: string
  location: ILocation
}