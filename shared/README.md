# SHARED 

### Network

You can use ```Api`` and ```ApiResponse``` classes to make http requests.
Here an example of a GET request:

```ts
import { Api, ApiResponse } from 'shared'

interface Dog {
 name: string
 age: number
}

let getDog = async () => {
  let resp: ApiResponse<Dog> = await Api.get<Dog>("www.dogs.org/api")
  if (resp.esit()) {
    console.log(resp.data.name)
  } else {
    // Handle http errors
  }
} 
```

Or you can make a POST request with:

```ts
import { Api, ApiResponse } from 'shared'

interface Dog {
  name: string
  age: number
}

let d = { name: 'pippo', age: 42 }
let postDog = async () => {
  let resp: ApiResponse<Dog> = await Api.post<Dog>("www.dogs.org/api", d)
  if (resp.esit()) {
    console.log(resp.data.name)
  } else {
    // Handle http errors
  }

}

```
