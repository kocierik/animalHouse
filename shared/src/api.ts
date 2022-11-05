export abstract class Api {

  public static async get<T>(url: string, auth = false, getContentType=false): Promise<ApiResponse<T>> {
    let options: RequestInit = {
      method: 'GET'
    };
    if (auth) {
      options.headers = { 'Authorization': this.getToken() }
    }


    let response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
      // Success
      if(getContentType){
        try {
          const blob = await (await response.blob())
          const stringBlob = URL.createObjectURL(blob)
          return new ApiResponse<T>(response.status, (stringBlob as T))
        } catch (error) {
          console.log(error)
          throw new Error(`error --> ${error}`);
        }
      }
      return new ApiResponse<T>(response.status, (await response.json() as T))
    } else {
      return new ApiResponse<T>(response.status)
    }
  }

  public static async post<T>(url: string, body: any, auth = false, sendContentType=true): Promise<ApiResponse<T>> {
    let headers : Headers = new Headers({'Accept' : 'application/json'})

    if (auth)
      headers.append("Authorization", this.getToken())
    if (sendContentType) 
        headers.append('Content-Type', 'application/json')

    let options: RequestInit = {
      method: 'POST',
      body : body instanceof FormData ? body : JSON.stringify(body),
      headers: headers
    }

    let response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
      // Success
      return new ApiResponse<T>(response.status, (await response.json() as T))
    } else
      return new ApiResponse<T>(response.status, undefined, (await response.json() as JsonError))
  }

  public static async put<T>(url: string, body: any, auth = false, sendContentType=true): Promise<ApiResponse<T>> {
    
    let headers : Headers = new Headers({'Accept' : 'application/json'})
    if (sendContentType) 
        headers.append('Content-Type', 'application/json')

    headers.append('Authorization', auth ? this.getToken() : "")
    let options: RequestInit = {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers: headers
    };    

    let response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
      // Success
      return new ApiResponse<T>(response.status, (await response.json() as T))
    } else
      return new ApiResponse<T>(response.status, undefined, (await response.json() as JsonError))
  }

    public static async delete<T>(url: string, auth = false): Promise<ApiResponse<T>> {
    let options: RequestInit = {
      method: 'DELETE'
    };
    if (auth) {
      options.headers = { 'Authorization': this.getToken() }
    }
    let response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
      // Success
      return new ApiResponse<T>(response.status, (await response.json() as T))
    } else
      return new ApiResponse<T>(response.status)
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
