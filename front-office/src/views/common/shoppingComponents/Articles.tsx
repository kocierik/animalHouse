import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ApiRepository } from 'shared'
import { ProductMarked } from 'shared'

const Articles = () => {
  const [article, setArticle] = React.useState<ProductMarked.IProductMarked[]>([])

  const getMarketProducts = async () => {
    const values = await (await ApiRepository.getMarketProducts()).data
    console.log(values)
    setArticle(values!)
  }

  React.useEffect(() => {
    getMarketProducts()
  }, [])

  const inputRef = useRef<HTMLHeadingElement[]>([])

  const changeBg = (id: string, articles: ProductMarked.IProductMarked[]) => {
    let index = 0
    articles.forEach((element: ProductMarked.IProductMarked) => {
      if (element._id !== id) {
        inputRef.current[index].style.opacity = "0.70"
      }
      index++
    })
    index = 0
  }

  const changeBgOut = (article: ProductMarked.IProductMarked[]) => {
    let index = 0
    article.forEach((element: ProductMarked.IProductMarked) => {
      inputRef.current[index].style.opacity = "1"
      index++
    })
    index = 0
  }

  return (
    <div className="bg-white" data-aos="zoom-in" data-aos-duration="1500">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-y-20 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {article?.map((product,i) => (
        <Link to={"product/" + product._id } key={i}>
              <div
                onMouseOut={() => changeBgOut(article)}
                onMouseOver={() => changeBg(product._id, article)} ref={el => inputRef.current.push(el!)}
                id={product._id}
                key={product._id}
                className="hover:-translate-y-1 hover:scale-105 duration-300 group relative"
              >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden  lg:h-80 lg:aspect-none">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-center object-unset lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </span>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}$</p>
                </div>
              </div>
            </Link>
            ))}
          </div>
        </div>
      </div>
  )
}
export default Articles
