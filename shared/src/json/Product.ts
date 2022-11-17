import { IPicture } from "./Picture"

export interface IProduct {
  _id: string,
  name: string,
  description: string,
  price: number,
  categoryId: string,
  image: IPicture,
  alt: string[],
  animalTargets: string[]
  colors?: string[],
  sizes?: string[],
  types?: string[],
  highlights?: string[],
  details?: string
}

