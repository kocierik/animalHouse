export interface JsonPicture {
  size: number
  filename: string
  mimetype: string
}
export interface JsonAnimal {
  _id?: string
  name: string
  type: string
  userId: string
  age: number
  picture?: JsonPicture
}
