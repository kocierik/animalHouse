export interface IGameValues {
  gameId: string,
  gameName: string,
  scores: IScores[]
}

export interface IScores {
  userId: string,
  score: number[],
  username: string
}