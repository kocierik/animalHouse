import React, { useEffect, useState } from 'react'
import { ApiRepository, JsonOrder, JsonProduct } from 'shared'
import Rawtable from './common/communityComponents/Rawtable'

const Order = () => {
  const [ordersData, setOrdersData] = useState<JsonOrder.JsonAllOrder[]>([])
  const [productsInfo, setProductsInfo] = useState<JsonProduct.IProduct[]>([])

  const getOrder = async () => {
    const data = (await ApiRepository.getUserOrder(localStorage.getItem('userId')!)).data
    if (data) {
      setOrdersData(data)
      console.log(data)
    }
    data?.map((allOrder) => {
      allOrder?.cartItems?.map(async (order) => {
        const data = (await ApiRepository.getMarketProduct(order.productId)).data
        if (data) {
          setProductsInfo((last) => [...last, data])
        }
      })
    })
  }

  useEffect(() => {
    getOrder()
  }, [])

  return (
    <>
      <div
        id="main"
        data-aos="zoom-in"
        data-aos-duration="500"
        className="mb-5 mt-5 flex flex-col lg:flex-row md:flex-row sm:flex-col sm:flex-col"
      >
        <div data-aos-duration="500" data-aos="zoom-in" className='flex flex-1 mt-10 border-x-2 border-slate-100	 flex-col items-center'>
          <h1 data-aos="zoom-in"
            data-aos-duration="500" className="text-4xl font-semibold mb-5 leading-tight">My Orders</h1>
          <div className='flex flex-1  flex-wrap'>
            {
              <div className='flex flex-1  w-full p-10 '>
                <div className='flex w-full flex-1 flex-col '>
                  {
                    productsInfo.length === 0 ?
                      <div className="h-full text-center">
                        <h2 > No orders </h2>
                        <img src="https://animalfair.com/wp-content/uploads/2016/06/Shopping-Dog-42373801.jpg" />
                      </div>
                      : productsInfo?.map((product, i) => {
                        return (
                          <div tabIndex={0} key={i} className="-mx-4 mt-10 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto border-slate-100 border-b-2">
                            {/* <h2 className="text-2xl font-semibold mb-5 leading-tight"> {ordersProducts.executionDate.toString()} </h2> */}
                            <div className=" min-w-full shadow-md rounded-lg overflow-hidden inline-block">
                              <table className="min-w-full leading-normal text-center">
                                <thead>
                                  <tr style={{ textAlignLast: 'center' }}>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Product Name
                                    </th>
                                    <th className="py-3 pr-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Price $
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Description
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <Rawtable
                                    name={product.name}
                                    key={i}
                                    points={product.price}
                                    data={""}
                                    game={product.description}
                                  />
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )
                      })
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Order
