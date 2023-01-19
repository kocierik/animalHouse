export interface IGameValues {
  gameId: string,
  gameName: string,
  scores: IScores[]
}

export interface IGame {
  gameId: string,
  name: string,
}

export interface IScores {
  userId: string,
  score: number[],
  username: string
}