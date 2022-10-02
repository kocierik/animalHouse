export interface JsonScoreboardItem {
  gameId: string
  gameName: string
  scores: JsonScoreboardScore[]
}

export interface JsonScoreboardScore {
  username: string
  userId: string
  score: number[]
}
