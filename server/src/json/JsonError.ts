import { STATUS_BAD_REQUEST, STATUS_INTERNAL_ERROR, STATUS_NOT_FOUND, STATUS_UNAUTHORIZED } from "../const"

export default class JsonError {
  mex: string
  code: number

  constructor(mex: string, code=400) { // TODO
    this.mex = mex
    this.code = code
  }
}

export class JsonVisibilityError extends JsonError {
  constructor(mex: string) {
    super(mex, STATUS_UNAUTHORIZED)
  }
}

export class JsonBadReqError extends JsonError {
  constructor(mex: string) {
    super(mex, STATUS_BAD_REQUEST)
  }
}

export class JsonNotFoundError extends JsonError {
  constructor(mex: string) {
    super(mex, STATUS_NOT_FOUND)
  }
}

export class JsonServerError extends JsonError {
  constructor(mex: string) {
    super(mex, STATUS_INTERNAL_ERROR)
  }
}