import React from 'react'
import Footer from './common/Footer'
import Navbar from './common/Navbar'

const Checkout = () => {
  return (
    <>
      <Navbar />
      <main className="lg:min-h-full lg:overflow-hidden lg:flex lg:flex-row-reverse pb-10">

        <h1 className="sr-only">Checkout</h1>

        <section aria-labelledby="order-heading" className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between">
              <h2 id="order-heading" className="text-lg font-medium text-gray-900">
                Your Order
              </h2>
            </div>

            <div id="disclosure-1 ">
              <ul role="list" className="flex items-center mt-7 divide-y divide-gray-200 border-b border-gray-200">
                <li className="flex py-6 space-x-6">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg"
                    alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
                    className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
                  />
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="text-sm font-medium space-y-1">
                      <h3 className="text-gray-900">Micro Backpack</h3>
                      <p className="text-gray-900">$70.00</p>
                      <p className="text-gray-500">Moss</p>
                      <p className="text-gray-500">5L</p>
                    </div>
                    <div className="flex space-x-4">
                      <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Edit
                      </button>
                      <div className="flex border-l border-gray-300 pl-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                
              </ul>

              <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">$210.00</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">$23.68</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">$22.00</dd>
                </div>
              </dl>
            </div>

            <p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
              <span className="text-base">Total</span>
              <span className="text-base">$341.68</span>
            </p>
          </div>
        </section>

        <section aria-labelledby="summary-heading" className="hidden bg-gray-50 w-full max-w-md flex-col lg:flex">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul role="list" className="flex-col overflow-scroll	  flex items-center flex-auto  divide-y divide-gray-200 px-6">
            <li className="flex py-6 space-x-6">
              <img
                src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg"
                alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
                className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
              />
              <div className="flex flex-col justify-between space-y-4">
                <div className="text-sm font-medium space-y-1">
                  <h3 className="text-gray-900">Micro Backpack</h3>
                  <p className="text-gray-900">$70.00</p>
                  <p className="text-gray-500">Moss</p>
                  <p className="text-gray-500">5L</p>
                </div>
                <div className="flex space-x-4">
                  <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Edit
                  </button>
                  <div className="flex border-l border-gray-300 pl-4">
                    <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
                        <li className="flex py-6 space-x-6">
              <img
                src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg"
                alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
                className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
              />
              <div className="flex flex-col justify-between space-y-4">
                <div className="text-sm font-medium space-y-1">
                  <h3 className="text-gray-900">Micro Backpack</h3>
                  <p className="text-gray-900">$70.00</p>
                  <p className="text-gray-500">Moss</p>
                  <p className="text-gray-500">5L</p>
                </div>
                <div className="flex space-x-4">
                  <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Edit
                  </button>
                  <div className="flex border-l border-gray-300 pl-4">
                    <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div className="mr-10 sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">


            <dl className="text-sm font-medium text-gray-500 mt-5 space-y-6">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">$210.00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">$23.68</dd>
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

        <section
          aria-labelledby="payment-heading"
          className="flex-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
        >
          <div className="max-w-lg mx-auto">
            <div className="hidden pt-1 pb-4 lg:flex">
            </div>



          <h1 className="text-3xl font-bold text-gray-900 ">Checkout</h1>

            <form className="mt-6 p-5">
              <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                <div className="col-span-full">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-8 sm:col-span-9">
                  <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>



              <button
                type="submit"
                className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Pay $341.68
              </button>

              <p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
                <svg
                  className="w-5 h-5 text-gray-400 mr-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Payment details stored in plain text
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default Checkout
