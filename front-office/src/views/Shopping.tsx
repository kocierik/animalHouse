/* eslint-disable array-callback-return */
import Footer from './common/Footer'
import Navbar from './common/Navbar'
import DropDown from './common/DropDown'
import Articles from './common/shoppingComponents/Articles'
import { List } from './Community'
import { useState } from 'react'

export interface Product {
  id: string
  name: string
  category: List
  href: string
  imageSrc: string
  imageAlt: string
  price: string
  color: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'accessorio',
    category: { id: '3', name: 'accessories' },
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  },
  {
    id: '2',
    name: 'accessorio',
    category: { id: '3', name: 'accessories' },
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  },
  {
    id: '3',
    name: 'accessorio',
    category: { id: '3', name: 'accessories' },
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  },
  {
    id: '4',
    name: 'accessorio',
    category: { id: '3', name: 'accessories' },
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  },
  {
    id: '5',
    name: 'food',
    category: { id: '1', name: 'food' },
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  },
  {
    id: '6',
    name: 'food',
    category: { id: '1', name: 'food' },
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  },
  {
    id: '7',
    name: 'health product',
    category: { id: '2', name: 'health product' },
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  },
  {
    id: '8',
    name: 'food',
    category: { id: '1', name: 'food' },
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  }
]

const Shopping = () => {
  const producs: List[] = [
    { id: '1', name: 'food' },
    { id: '2', name: 'health product' },
    { id: '3', name: 'accessories' },
    { id: '4', name: 'animal' }
  ]

  const [filteredIds, setFilterdIds] = useState<string[]>(["1","2","3","4"])
  let isInitial = true

  const onDropDownSelectItem = (filteredId: string) => {
    if(isInitial)
      setFilterdIds([])
    isInitial = false
    console.log(isInitial)
    const isIdPresent = filteredIds?.includes(filteredId)
    console.log(isIdPresent)
    if (isIdPresent) {
      let values = filteredIds.filter((id) => id === filteredId)
      setFilterdIds(values)
    } else {
       const newFilteredIds = [...filteredIds, filteredId]
       setFilterdIds(newFilteredIds)
    }
    console.log(filteredId)
  }

  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
        <section className="bg-white py-8">
          <div className="container mx-auto justify-evenly	flex items-center flex-wrap pt-4 pb-12">
            <nav id="store" className="w-full  z-10 top-0 px-6 py-1">
              <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                <span className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ">
                  Store
                </span>
                <DropDown list={producs} onSelectItem={onDropDownSelectItem} />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
              {products.map((product) => {
                if (isInitial){
                return (  
                  <Articles product={product} key={product.id} />)
                }
                else if(filteredIds.includes(product.category.id)){
                  return (<Articles product={product} key={product.id} />)
                }
              })}
              </div>
            </nav>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Shopping
