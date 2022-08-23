
export interface JsonProduct {
    name: string,
    price: number,
    categoryId: string,
    description: string,
    animalTargets: string[],
    image: string,
    colors?: string[],
    sizes?: string[],
    types?: string[],
    details?: string,
  }