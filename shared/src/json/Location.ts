import type { JsonAddress } from "./user"

export interface ILocation {
  _id?: string
  name: string
  address: JsonAddress
}