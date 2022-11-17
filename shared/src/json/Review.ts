export interface IReview {
  username: string
  productId: string
  comment?: string
  star: number
  date: Date
}

export interface IProductSumUp {
  average: number
  total: number
  percentage: string[]
}
