# SHARED

### Network

You can use `Api` and `ApiResponse` classes to make http requests.
Here an example of a GET request:

```ts
import { Api, ApiResponse } from 'shared'

interface Dog {
  name: string
  age: number
}

let getDog = async () => {
  let resp: ApiResponse<Dog> = await Api.get<Dog>('www.dogs.org/api')
  if (resp.esit) {
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
  let resp: ApiResponse<Dog> = await Api.post<Dog>('www.dogs.org/api', d)
  if (resp.esit) {
    console.log(resp.data.name)
  } else {
    // Handle http errors
  }
}
```

### Get Animal Pics

Use the function `getAnimailPicture` to get random animal pictures. You can
choose which animals using the `AnimalType` enum.

```ts
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { AnimalType, getAnimalPicture } from 'shared'

let a = ref<string>()

onBeforeMount(async () => {
    a.value = await getAnimalPicture(AnimalType.Bunny)
  });
</script>

<template>
  <img :src=a />
</template>

```
