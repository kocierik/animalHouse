import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helpers } from 'shared'
import { JsonProduct } from 'shared'

import { ApiRepository, Jsonlocation, ProductConstant } from 'shared'

const Articles = (props: { filterApplied: string[] }) => {
  const [article, setArticle] = React.useState<JsonProduct.IProduct[]>([])
  const [filterArticle, setFilterArticle] = useState<JsonProduct.IProduct[]>([])

  const getMarketProducts = async () => {
    const values = (await ApiRepository.getMarketProducts()).data
    setArticle(values!)
    setFilterArticle(values!)
  }

  const filterMarketProducts = () => {
    const productArray: JsonProduct.IProduct[] = []
    article.map(async (singleArticle) => {
      setFilterArticle([])

      const singleArticleCategoryName = (await ApiRepository.getProductCategory(singleArticle.categoryId)).data
      props.filterApplied.map((singleFilter) => {
        if (singleArticleCategoryName == singleFilter) {
          productArray.push(singleArticle)
        }

        const uniqueArray = productArray.filter(function (item, pos) {
          return productArray.indexOf(item) == pos
        })
        setFilterArticle(uniqueArray)
      })
    })

    if (props.filterApplied.length == 0) {
      setFilterArticle(article)
    }
  }

  React.useEffect(() => {
    getMarketProducts()
  }, [])

  React.useEffect(() => {
    filterMarketProducts()
  }, [props.filterApplied])

  const inputRef = useRef<HTMLHeadingElement[]>([])

  const changeBg = (id: string, articles: JsonProduct.IProduct[]) => {
    let index = 0
    articles.forEach((element: JsonProduct.IProduct) => {
      if (element._id !== id) {
        inputRef.current[index].style.opacity = '0.70'
      }
      index++
    })
    index = 0
  }

  const changeBgOut = (article: JsonProduct.IProduct[]) => {
    let index = 0
    article.forEach((element: JsonProduct.IProduct) => {
      inputRef.current[index].style.opacity = '1'
      index++
    })
    index = 0
  }

  return (
    <div className="bg-white" data-aos="zoom-in" data-aos-duration="500">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-20 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filterArticle?.map((product, i) => (
            <Link to={'product/' + product._id} key={i}>
              <div
                onMouseOut={() => changeBgOut(article)}
                onMouseOver={() => changeBg(product._id, article)}
                ref={(el) => inputRef.current.push(el!)}
                id={product._id}
                key={product._id}
                data-aos="zoom-in"
                className="hover:-translate-y-1 hover:scale-105 duration-300 group relative"
              >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden  lg:h-80 lg:aspect-none">
                  <img
                    src={product?.image?.filename ? Helpers.getImagePath(product?.image?.filename) : '/favicon.ico'}
                    alt={product.name}
                    className="w-full h-full object-center object-unset lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h2 className="text-sm text-gray-700">
                      <span>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </span>
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price[0]}$</p>
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
