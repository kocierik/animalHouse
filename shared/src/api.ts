export abstract class Api {

  public static async get<T>(url: string, auth=false) : Promise<ApiResponse<T>> {
    let options: RequestInit= {
      method: 'GET'
    };
    if (auth) {
      options.headers = { 'Authorization' : this.getToken() }
    }
    let response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
      // Success
      return new ApiResponse<T>(response.status, (await response.json() as T)) 
    } else 
      return new ApiResponse<T>(response.status)
  }

  public static async post<T>(url: string, body: any, auth=false) : Promise<ApiResponse<T>> {
    let options: RequestInit = {
      method: 'POST',
      body : JSON.stringify(body),
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization' : auth ? this.getToken() : ""
      }
    };

    let response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
      // Success
      return new ApiResponse<T>(response.status, (await response.json() as T)) 
    } else 
      return new ApiResponse<T>(response.status, null, (await response.json() as JsonError))
  }

  protected static getToken(): string {
    const token = localStorage.getItem('token')
    return token ?? 'not logged'
  }
}

export class ApiResponse<T> {
  public data? : T
  public error?: JsonError
  private _esit: boolean
  public statusCode: number

  public get esit (): boolean {
    return this._esit;
  }

  constructor(statusCode: number, data? : T, error?: JsonError){
    this._esit =  statusCode >= 200 && statusCode < 300;
    this.data = data;
    this.statusCode = statusCode
    this.error = error
  }

}

export class JsonError {
  public mex: string

  constructor(message: string) { this.mex = message }
}
