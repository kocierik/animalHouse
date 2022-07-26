import React from 'react'
import Footer from './common/Footer'
import MakePay from './common/MakePay'
import Navbar from './common/Navbar'
import ProductCart from './common/ProductCart'

const Checkout = () => {
  return (
    <>
      <Navbar />
      <main className="lg:min-h-full lg:overflow-hidden lg:flex lg:flex-row-reverse pb-10">
        <section aria-labelledby="summary-heading" className=" bg-gray-50 w-full max-w-md flex-col lg:flex">
          <ul
            role="list"
            className="flex-col overflow-scroll	  flex items-center flex-auto  divide-y divide-gray-200 px-6"
          >
            <ProductCart />
            <ProductCart />
            <ProductCart />
          </ul>

          <div className="mr-5 sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
            <dl className="text-sm font-medium text-gray-500 mt-5 space-y-6">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">$210.00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-gray-900">$22.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">$341.68</dd>
              </div>
            </dl>
          </div>
        </section>

        <MakePay />
      </main>
      <Footer />
    </>
  )
}

export default Checkout
