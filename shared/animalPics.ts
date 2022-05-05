import { Api, ApiResponse } from './shared'

const getRequest = async (endpoint: string) => {
  const response: ApiResponse<any> = await Api.get(endpoint);
  if (response.esit) {
    console.log(response.data)
    return response.data;
  }
  else throw new Error(`Failed to fetch ${endpoint}`);
};

export enum AnimalType {
  Cat, Dog, Fox, Bunny, Duck, Lizard, Shiba, Koala, Panda
}

export const getAnimalPicture = async (type : AnimalType) : Promise<string> => {
  switch(+type) {
    case AnimalType.Cat: 
      return (await getRequest("https://aws.random.cat/meow")).file;
    case AnimalType.Dog:
      return (await getRequest("https://dog.ceo/api/breeds/image/random")).message;
    case AnimalType.Bunny:
      return (await getRequest("https://api.bunnies.io/v2/loop/random/?media=gif,png")).media.poster;
    case AnimalType.Duck:
      return (await getRequest("https://random-d.uk/api/v1/random?type=png")).url;
    case AnimalType.Fox:
      return (await getRequest("https://randomfox.ca/floof/")).image;
    case AnimalType.Lizard:
      return (await getRequest("https://nekos.life/api/v2/img/lizard")).url;
    case AnimalType.Shiba:
      return (await getRequest("http://shibe.online/api/shibes"))[0];
    case AnimalType.Koala:
      return (await getRequest("https://some-random-api.ml/img/koala")).link;
    case AnimalType.Panda: return (await getRequest("https://some-random-api.ml/img/panda")).link;
    default: throw new Error("Animal not found!");
  }
};
