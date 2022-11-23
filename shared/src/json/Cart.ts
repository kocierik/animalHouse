export interface ICartItem {
  _id: string
  productId: string
  color?: string
  type?: string
  size?: string
  price: number
}

export interface ICartItemCreation {
  productId: string
  color?: string
  type?: string
  size?: string
}