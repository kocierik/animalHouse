export interface IProductMarked{
  _id: string,
  name: string,
  description: string,
  price: number,
  categoryId: string,
  images: string[],
  alt: string[],
  animalTargets: string[]
  colors?: string[],
  sizes?: string[],
  types?: string[],
  highlights?: string[],
  details?: string
}

export interface JsonProductInstance{
  productId: string
  color?: string
  type?: string
  size?: string
  price: number
}