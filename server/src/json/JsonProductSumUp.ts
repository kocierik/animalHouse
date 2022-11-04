export default interface JsonProductSumUp {
  average: number
  total: number
  percentage: string[]
}

export const SwaggerReviewSumUp = {
  type: "object",
  properties: {
    average: {
      type: "number"
    },
    total: {
      type: "number"
    },
    percentage: {
      type: "array",
      items: {
        type: "string"
      }
    }
  }
}
