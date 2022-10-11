export interface IGameScore {
  _id: string,
  userId: string,
  gameId: string,
  value: number,
}

export interface IGameResult {
  userId: string,
  score: number,
}