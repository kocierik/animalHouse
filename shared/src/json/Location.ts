import type { JsonAddress } from './user'

export interface JsonLocation {
  _id?: string
  name: string
  address: JsonAddress
}
