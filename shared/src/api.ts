export abstract class Api {

  private static async request<T>(url: string, options: RequestInit, auth: boolean): Promise<ApiResponse<T>> {
    if (auth) {
      const headers = new Headers(options.headers)
      headers.append("Authorization", this.getToken())
      options.headers = headers
    }

    const response = await fetch(url, options);

    if (response.status >= 200 && response.status < 300) {
      // Success
      return new ApiResponse<T>(response.status, (await response.json() as T))
    } else {
      return new ApiResponse<T>(response.status, undefined, (await response.json() as JsonError))
    }
  }

  public static async getImage(url: string) {
    let options: RequestInit = {
      method: 'GET'
    };


    let response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
      // Success
      try {
        const blob = await response.blob()
        const stringBlob = URL.createObjectURL(blob)
        return new ApiResponse<string>(response.status, stringBlob)
      } catch (error) {
        throw new Error(`error --> ${error}`);
      }
    } else {
      return new ApiResponse<string>(response.status)
    }

  }

  public static get<T>(url: string, auth = false): Promise<ApiResponse<T>> {
    let options: RequestInit = {
      method: 'GET',
    };

    return this.request(url, options, auth)
  }

  public static post<T>(url: string, body: any, auth = false, sendingJson = true): Promise<ApiResponse<T>> {
    const headers: Headers = new Headers({ 'Accept': 'application/json' })

    if (sendingJson)
      headers.append('Content-Type', 'application/json')

    const options: RequestInit = {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers: headers
    }

    return this.request(url, options, auth)
  }

  public static put<T>(url: string, body: any, auth = false, sendingJson = true): Promise<ApiResponse<T>> {
    const headers: Headers = new Headers({ 'Accept': 'application/json' })

    if (sendingJson)
      headers.append('Content-Type', 'application/json')

    const options: RequestInit = {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers: headers
    }

    return this.request(url, options, auth)
  }

  public static delete<T>(url: string, body: any, auth = false): Promise<ApiResponse<T>> {
    const options: RequestInit = {
      method: 'DELETE',
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers: {
        "Content-Type" : "application/json"
      }
    };

    return this.request(url, options, auth)
  }

  protected static getToken(): string {
    const token = localStorage.getItem('token')
    return token ?? 'not logged'
  }
}

export class ApiResponse<T> {
  public data?: T
  public error?: JsonError
  private _esit: boolean
  public statusCode: number

  public get esit(): boolean {
    return this._esit;
  }

  constructor(statusCode: number, data?: T, error?: JsonError) {
    this._esit = statusCode >= 200 && statusCode < 300;
    this.data = data;
    this.statusCode = statusCode
    this.error = error
  }

}

export class JsonError {
  public mex: string

  constructor(message: string) { this.mex = message }
}
