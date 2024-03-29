export interface IGameScore {
  _id: string
  userId: string
  gameId: string
  value: number
}

export interface IGameResult {
  gameId: string
  score: number
}
