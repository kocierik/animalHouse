import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ApiRepository } from 'shared'
import { ProductMarked } from 'shared'

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35'
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black'
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black'
//   },
//   {
//     id: 4,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black'
//   }
// ]

const Articles = () => {
  const [article, setArticle] = React.useState<ProductMarked.IProductMarked[]>([])

  const getMarketProduct = async () => {
    const values = await (await ApiRepository.getMarketProduct()).data
    console.log(values)
    setArticle(values!)
  }

  React.useEffect(() => {
    getMarketProduct()
  }, [])

const inputRef = useRef([]);

const changeBg = (id : string, article: ProductMarked.IProductMarked[]) =>{
  article.forEach(element => {
    if(element._id !== id){
      inputRef.current[element._id].style.opacity = "0.70"
    }
      
  });
}

const changeBgOut = (article: ProductMarked.IProductMarked[])  =>{  
  article.forEach(element => {
    inputRef.current[element._id].style.opacity = "1"
  });
}

return (
    <Link to="/product/">
      <div className="bg-white" data-aos="zoom-in" data-aos-duration="1500">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-y-20 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {article?.map((product) => (
              <div onMouseOut={() => changeBgOut(article)} onMouseOver={() => changeBg(product._id,article)} ref={el => inputRef.current[product._id] = el}    id={product._id}  key={product._id}  className="hover:-translate-y-1 hover:scale-105 duration-300 group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden  lg:h-80 lg:aspect-none">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-unset lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.name}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price} $</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Articles
