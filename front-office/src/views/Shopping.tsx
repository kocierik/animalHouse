import Footer from './common/Footer'
import Navbar from './common/Navbar'
import DropDown from './common/DropDown'
import Articles from './common/shoppingComponents/Articles'
import { List } from './Community'
const Shopping = () => {
  const producs :List[] = [{id:1, name:'food'},{id:2, name: 'health product'}, {id:3, name: 'accessories'}, {id:4, name:'animal'}]
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
                <DropDown list={producs}  />
              </div>
              <Articles />
            </nav>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Shopping
