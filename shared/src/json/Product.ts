import type { IPicture } from './Picture'

export interface IProduct {
  _id: string
  name: string
  description: string
  price: number[]
  categoryId: string
  image: IPicture
  alt: string[]
  animalTargets: string[]
  colors?: string[]
  sizes?: string[]
  types?: string[]
  highlights?: string[]
  details?: string
}

export interface IProductCategory {
  _id: string
  name: string
}

export interface JsonProductInstance {
  productId: string
  name: string
  images: string[]
  color?: string
  type?: string
  size?: string
  price: number
}
