export interface JsonScoreboardItem {
  gameId: string,
  scores: JsonScoreboardScore[]
}

export interface JsonScoreboardScore {
  username: string,
  userId: string,
  score: number
}
