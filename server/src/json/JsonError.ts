export default class JsonError {
  mex: string

  constructor(mex: string) {
    this.mex = mex
  }
}

export class JsonVisibilityError extends JsonError {
}
