export interface JsonPicture{
  size: number,
  filename: string
  mimetype: string
}
export interface JsonAnimal {
  _id: string
  name: string
  age: number
  type: string
  userId: string
  picture?: JsonPicture
}
