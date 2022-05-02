export class Api {

  public static async get<T>(url: string) : Promise<ApiResponse<T>> {
    let response = await fetch(url);
    if (response.status >= 200 && response.status < 300) {
      // Success
      return new ApiResponse<T>(true, (await response.json() as T)) 
    } else 
      return new ApiResponse<T>(false)
  }

  public static async post<T>(url: string, body: any) : Promise<ApiResponse<T>> {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(body)
    });
    if (response.status >= 200 && response.status < 300) {
      // Success
      return new ApiResponse<T>(true, (await response.json() as T)) 
    } else 
      return new ApiResponse<T>(false)
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
