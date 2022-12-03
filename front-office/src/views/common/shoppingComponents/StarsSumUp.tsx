import React, { useEffect, useState } from 'react'
import { JsonReview, ApiRepository } from 'shared'

interface SumUpProps {
  productId: string
}

const StarsSumUp = (props: SumUpProps) => {
  const [data, setData] = useState<JsonReview.JsonProductSumUp | null>()

  const loadData = async () => {
    const resp = await ApiRepository.getMarketProductsReviewsSumUp(props.productId)
    if (resp.esit) {
      setData(resp.data!)
    } else {
      setData(null)
    }
  }

  useEffect(() => { loadData() }, [])

  return <>
    {data && <div className=' p-1'>
      <div className="flex items-center mb-3  p-2">
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <p className=" text-sm font-medium text-gray-900 dark:text-white">{data.average} out of 5</p>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{data.total} global ratings</p>
      </div>
        <div className='ml-5'>
          <div className="flex items-center mt-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">5 star</span>
            <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
              <div className="h-5 bg-yellow-400 rounded" style={{ width: data.percentage[4] }}></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{data.percentage[4]}</span>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">4 star</span>
            <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
              <div className="h-5 bg-yellow-400 rounded" style={{ width: data.percentage[3] }}></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{data.percentage[3]}</span>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">3 star</span>
            <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
              <div className="h-5 bg-yellow-400 rounded" style={{ width: data.percentage[2] }}></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{data.percentage[2]}</span>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">2 star</span>
            <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
              <div className="h-5 bg-yellow-400 rounded" style={{ width: data.percentage[1] }}></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{data.percentage[1]}</span>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">1 star</span>
            <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
              <div className="h-5 bg-yellow-400 rounded" style={{ width: data.percentage[0] }}></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500"> {data.percentage[0]}</span>
          </div>
        </div>
      </div>
    }
  </>
}

export default StarsSumUp
