import { Link } from 'react-router-dom'
import { Product } from '../../Shopping'

const Articles = (props: { product: Product }) => {
  return (
    <Link to="/product/">
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div key={props.product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={props.product.imageSrc}
                  alt={props.product.imageAlt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={props.product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {props.product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{props.product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{props.product.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Articles
