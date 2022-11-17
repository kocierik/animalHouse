import type { JsonAddress } from "./user"

export interface ILocation {
  name: string
  address: JsonAddress
}

export interface IReservation {
  animalId: string
  serviceName: string
  userId: string
  date: string
  information: string
  location: ILocation
}