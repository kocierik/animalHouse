export interface IReview {
  username: string
  productId: string
  comment?: string
  star: number
  date: Date
}

export interface JsonProductSumUp {
  average: number
  total: number
  percentage: string[]
}
