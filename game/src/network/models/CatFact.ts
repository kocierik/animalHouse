interface CatFact {
  data: string[]
}

interface CatImg {
  breeds: any[]
  id: string
  url: string
  width: number
  height: number
}

export type { CatFact, CatImg }
