export interface Article {
  id: number
  price: number
  name: string
  description: string
  image: string
}

export const productArticles: Article[] = [
  {
    id: 0,
    price: 100,
    name: 'chair',
    description: 'awesome',
    image: 'https://pixabay.com/it/illustrations/on-line-internet-icona-simboli-www-942408/',
  },
  {
    id: 1,
    price: 200,
    name: 'erik',
    description: 'MAN',
    image: 'https://pixabay.com/it/illustrations/on-line-internet-icona-simboli-www-942408/',
  },
  {
    id: 2,
    price: 700,
    name: 'JhonWeek',
    description: 'MAN',
    image: 'https://pixabay.com/it/illustrations/on-line-internet-icona-simboli-www-942408/',
  },
  {
    id: 3,
    price: 400,
    name: 'FABIO',
    description: 'MAN',
    image: 'https://pixabay.com/it/illustrations/on-line-internet-icona-simboli-www-942408/',
  },
]
