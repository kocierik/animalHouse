import React from 'react'

const ProductCart = () => {
  return (
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
  )
}

export default ProductCart
