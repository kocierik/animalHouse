import React, { useEffect, useState } from 'react'
import DropDown from './common/DropDown'
import Articles from './common/shoppingComponents/Articles'
import { ApiRepository } from 'shared';
const Shopping = () => {
  const producs = ['wearing','food', 'health', 'accessories', 'puppies', 'entertainment', 'beauty']
  const [filter,setFilter] = useState<string[]>([])

  const getCategoryProduct = async () =>{
    try {
      const resp = await ApiRepository.getProductCategoriesName()
      console.log(resp)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() =>{
    //getCategoryProduct()
  },[])

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal"
      >
        <section className="bg-white py-8">
          <div className="container mx-auto justify-evenly	flex items-center flex-wrap pt-4 pb-12">
            <nav id="store" className="w-full  z-10 top-0 px-6 py-1">
              <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                <span className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ">
                  Store
                </span>
                <DropDown list={producs} filter={filter} setFilter={setFilter}/>
              </div>
              <Articles filterApplied={filter}/>
            </nav>
          </div>
        </section>
      </div>
    </>
  )
}

export default Shopping
