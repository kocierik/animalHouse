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
      return new ApiResponse<T>(true, (await response.json() as T)) 
    } else 
      return new ApiResponse<T>(false)
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
      return new ApiResponse<T>(true, (await response.json() as T)) 
    } else 
      return new ApiResponse<T>(false)
  }

  /* Unfortunately we are forced to reimplement this method in all the projects */
  protected static getToken() : string {
    throw new Error("Cant get token from shared :(")
  }
}

export class ApiResponse<T> {
  public data? : T
  private _esit : boolean

  public get esit () : boolean {
    return this._esit;
  }

  constructor(esit: boolean, data? : T){
    this._esit = esit;
    this.data = data;
  }
}
