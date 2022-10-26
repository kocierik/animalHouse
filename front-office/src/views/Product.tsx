import React, { useEffect } from 'react'
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import Reviewer from './common/shoppingComponents/Reviewer'
import { useParams } from 'react-router-dom'
import { ApiRepository, ProductMarked, ProductConstant, JsonReview } from 'shared';


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [prod, setProd] = useState<ProductMarked.IProductMarked>()
  const [id, setId] = useState("")
  const [productColor,setProductColor] = React.useState<string[]>([])
  const [post, setPost] = useState<boolean>(null!) 

  const params = useParams()

  const fetchProduct = async (id: string) =>{
    if ((await ApiRepository.getMarketProduct(id)).esit) {
      const val = (await ApiRepository.getMarketProduct(id)).data! as ProductMarked.IProductMarked 
      setProd(val!)
      setProductColor(val.colors!)
    }
  }
  
    const [reviewsStar,setReviewsStar] = useState<JsonReview.IReview[]>([])
    const [avarage,setAvarage] = useState(0)

    const fetchReview = async(productId : string) =>  {
        const val =  (await (ApiRepository.getProductReviews(productId))).data 
        setReviewsStar(val!)
        if(val){
          const sum = val.reduce((b, a) => b + a.star,1);
          setAvarage(sum/val?.length!)
        }
    }

  useEffect(()=>{
    setId(params.id!)
    setSelectedColor(prod?.colors![0]!)
    if(id){
      fetchProduct(id)
      fetchReview(id)
    }
  },[id,post])


const valueProduct = [{star: 1},{star: 2},{star: 3},{star: 4},{star: 5}]

  return (
    <>
      <div className="bg-white"  >
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
              
                <li key={prod?._id}>
                  <div className="flex items-center">
                    <a  className="mr-2 text-sm font-medium text-gray-900">
                      {ProductConstant.PRODUCT_TYPE[prod?.categoryId as string]}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-4 h-5 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>

              <li className="text-sm">
                <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {prod?.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mt-6 max-w-xl mx-auto sm:px-6 lg:max-w-4xl lg:px-4 lg:grid lg:grid-cols-2 p-5 lg:gap-x-8">
            <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={prod?.images[0]}
                alt={prod?.name}
                className="w-full h-full object-center object-cover"
              />
            </div>

              {/* Options */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <span className="text-3xl text-gray-900"> <p className='pb-5'>{prod?.name}</p> <p className='text-2xl'>Price: {prod?.price}$</p></span>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {valueProduct.map((rating) => (
                      <StarIcon
                        key={rating.star}
                        className={classNames(
                          avarage > rating.star ? 'text-gray-900' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span  className="ml-3 text-sm font-medium text-green-600 hover:text-green-500">
                    {reviewsStar.length} reviews
                  </span>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-md text-gray-900 font-medium">Color</h3>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {
                      productColor && productColor.map(
                        (color) => {
                        return (
                        <RadioGroup.Option
                          key={color}
                          value={color}
                          style={{backgroundColor: color}}
                          onClick={(()=>{setSelectedColor(color); console.log(selectedColor)})}
                          className={({ active, checked }) =>
                          classNames(
                              active || checked ? 'ring-2 bg-white' : '',
                              'h-8 w-8 border border-red border-opacity-10 rounded-full -m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                       )})}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md text-gray-900 ">Size</h3>
                  </div>

                  <div className="mt-4">
                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <label className="sr-only">Choose a size</label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {prod?.sizes?.map(size => {
                        return (
                        <RadioGroup.Option
                          key={size}
                          value={size}
                          onClick={(()=>setSelectedSize(size))}
                          className={({ active }) =>
                            classNames(
                               active ? "ring-1 bg-green-400 " : "",
                              'border-2 shadow-sm text-gray-900 cursor-pointer rounded	flex justify-center'
                            )
                          }
                        >{size}</RadioGroup.Option>
                        )
                      })}
                    </div>
                  </RadioGroup>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-10 ring-1 w-full bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add to bag
                </button>
              </form>
            </div>
          </div>

          {/* Product info */}
          <div  className="max-w-2xl mx-auto pt-10 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 ">Description</h1>
            </div>
            <div data-aos="fade-up" data-aos-duration="500" className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{prod?.description}</p>
                </div>
              </div>

              <div className="mt-10">
              <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 ">Highlights</h3>
                <div className="mt-4">
                  <ul role="list" className="pl-10 list-disc text-sm space-y-3">
                    {prod && prod.highlights?.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
              <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 ">Details</h3>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{prod?.details}</p>
                </div>
              </div>
            </div>
          </div>
           <Reviewer productId={id} post={post} setPost={setPost}/>
        </div>
      </div>
    </>
  )
}
