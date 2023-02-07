import React, { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ApiRepository, Helpers, JsonCart, JsonProduct } from 'shared'
import { toast, ToastContainer } from 'react-toastify'
import { JsonPaymentDetails } from 'shared/src/json/Orders'
import { JsonAddress } from 'shared/src/json/user'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  interface BuyingProduct {
    cartItem: JsonCart.ICartItem
    product: JsonProduct.IProduct
  }

  const [buyingProduct, setBuyingProduct] = useState<BuyingProduct[]>([])
  const [name, setName] = useState('')
  const [exp, setExp] = useState('')
  const [addr, setAddr] = useState('')
  const [cvc, setCvc] = useState('')
  const [card, setCard] = useState('')
  const [stat, setStat] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')

  const userId = Helpers.getUserId()
  const navigate = useNavigate()
  if (!userId) {
    navigate('/login')
    return <div />
  }

  const mapCartToBuyingProducts = (cartItems: JsonCart.ICartItem[]): Promise<BuyingProduct[]> =>
    Promise.all(
      cartItems.map(
        async (cartItem) =>
        ({
          cartItem: cartItem,
          product: await fetchProduct(cartItem.productId)
        } as BuyingProduct)
      )
    )

  const fetchProduct = async (id: string): Promise<JsonProduct.IProduct | undefined> =>
    (await ApiRepository.getMarketProduct(id)).data

  const fetchBuyingProducts = async () => {
    const resp = await ApiRepository.getCart(userId)
    if (resp.esit) {
      setBuyingProduct(await mapCartToBuyingProducts(resp.data!))
    }
  }

  useEffect(() => {
    fetchBuyingProducts()
  }, [])

  const removeFromCart = async (cartItemId: string) => {
    const resp = await ApiRepository.deleteCart(userId, [cartItemId])
    if (resp.esit) {
      setBuyingProduct(await mapCartToBuyingProducts(resp.data!))
    }
  }

  const getTotalPrice = (shipping: number = 0): number =>
    buyingProduct?.map((bp) => bp.cartItem).reduce((accumulator, value) => accumulator + value.price, shipping) || 0

  const constructPaymentDetails = (): JsonPaymentDetails => ({
    address: {
      zip: postal,
      city: city,
      country: stat,
      street: addr
    } as JsonAddress,
    cardName: name,
    cardNumber: card
  })

  const order = async (e: any) => {
    e.preventDefault()

    if (buyingProduct.length === 0) {
      toast.warning('You should select a product first!', { position: toast.POSITION.TOP_CENTER })
      return
    }

    if (!name || !exp || !addr || !cvc || !card || !stat || !city || !postal) {
      toast.warning('You should compile all the form!', { position: toast.POSITION.TOP_CENTER })
      return
    }

    const resp = await ApiRepository.postUserOrder(userId, constructPaymentDetails())
    if (resp.esit) {
      setBuyingProduct(await mapCartToBuyingProducts([]))
      toast.success('Congratulation, Bought!', { position: toast.POSITION.TOP_CENTER })
    }
  }

  return (
    <>
      <main data-aos="zoom-in" data-aos-duration="500" className="lg:overflow-hidden lg:flex lg:flex-row-reverse">
        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section
          className="bg-gray-50 px-4 pt-10 sm:px-6 lg:hidden"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <Disclosure as="div" className="max-w-lg mx-auto">
            <div className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl pl-5"> Summary</div>
            <Disclosure.Panel>
              <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
                {buyingProduct?.map((product, i) => (
                  <li key={i} className="flex py-6 space-x-6">
                    <img
                      src={product.product.image.filename}
                      alt={product.product.name}
                      className="flex-none w-40 h-40 object-center  bg-gray-200 rounded-md"
                    />
                    <div className="flex flex-col  space-y-4">
                      <div className="text-sm font-medium space-y-1">
                        <h3 className="text-gray-900">Name: {product.product.name}</h3>
                        <p className="text-gray-900">Price: {product.cartItem.price}$</p>
                        {product.cartItem.color && <p className="text-gray-500">Color: {product.cartItem.color}</p>}
                        <p className="text-gray-500">Size: {product.cartItem.size}</p>
                      </div>
                      <div className="flex 	 space-x-4">
                        <div className="flex  border-gray-300 ">
                          <button
                            type="button"
                            onClick={async () => await removeFromCart(product.cartItem._id)}
                            className="text-sm  font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </Disclosure>
        </section>

        {/* Order summary */}
        <section
          className=" bg-gray-50 w-full max-w-md flex-col lg:flex"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          {/* <h2 id="summary-heading" className="flex text-xl justify-center mt-5">
            Order summary
          </h2> */}
          {/* <div className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl pl-5'> Summary</div> */}

          <ul role="list" className="flex-auto overflow-y-auto divide-y divide-gray-200 px-6">
            {buyingProduct?.map((product, i) => (
              <li key={i} className="flex py-6 space-x-6">
                <img
                  src={product.product.image.filename}
                  alt={product.product.name}
                  className="flex-none w-40 h-40 object-center  bg-gray-200 rounded-md"
                />
                <div className="flex flex-col  space-y-4">
                  <div className="text-sm font-medium space-y-1">
                    <h3 className="text-gray-900">Name: {product.product.name}</h3>
                    <p className="text-gray-900">Price: {product.cartItem.price}$</p>
                    {product.cartItem.color && <p className="text-gray-500">Color: {product.cartItem.color}</p>}
                    <p className="text-gray-500">Size: {product.cartItem.size}</p>
                  </div>
                  <div className="flex list-item  space-x-4">
                    <div className="flex 	  border-gray-300">
                      <button
                        onClick={async () => await removeFromCart(product.cartItem._id)}
                        type="button"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            <div className="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
              <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
                <div className="flex justify-between">
                  <dt>Subtotal:</dt>
                  <dd className="text-gray-900">{getTotalPrice()}$</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">10$</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                  <dt className="text-base">Total:</dt>
                  <dd className="text-base">{getTotalPrice(10)}$</dd>
                </div>
              </dl>
            </div>
          </ul>
        </section>

        {/* Checkout form */}
        <section
          data-aos="zoom-in"
          className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
        >
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mt-5">Checkout </h1>

            <form className="mt-5 p-5" data-aos="zoom-in" data-aos-duration="500">
              <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                <div className="col-span-full">
                  <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      onChange={(e) => setName(e.target.value)}
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
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
                      onChange={(e) => setCard(e.target.value)}
                      minLength={16}
                      maxLength={16}
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-8 sm:col-span-9">
                  <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="expiration-date"
                      onChange={(e) => setExp(e.target.value)}
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      maxLength={3}
                      minLength={3}
                      onChange={(e) => setCvc(e.target.value)}
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
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
                      onChange={(e) => setAddr(e.target.value)}
                      autoComplete="street-address"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
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
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete="address-level2"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
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
                      onChange={(e) => setStat(e.target.value)}
                      autoComplete="address-level1"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
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
                      onChange={(e) => setPostal(e.target.value)}
                      autoComplete="postal-code"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={async (e) => {
                  await order(e)
                }}
                className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Pay {getTotalPrice(10)}$
              </button>
            </form>
          </div>
        </section>
        <ToastContainer />
      </main>
    </>
  )
}
export default Checkout
