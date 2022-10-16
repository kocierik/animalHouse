export interface IProductMarked{
  _id: string,
  name: string,
  description: string,
  price: number,
  categoryId: string,
  images: Image[],
  animalTargets: string[]
  colors?: string[],
  sizes?: string[],
  types?: string[],
  highlights?: string[],
  details?: string
}
export interface Image{
  src: string,
  alt: string
}

