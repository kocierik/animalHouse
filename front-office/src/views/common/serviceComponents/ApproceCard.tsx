import React from 'react'

const ApproceCard = () => {
  return (
<div data-aos="zoom-in" className="py-16 bg-gray-50 overflow-hidden">
    <div className="container m-auto px-6 space-y-8 text-gray-500 md:px-12">
        <div>
            <span className="text-gray-600 text-lg font-semibold">Main features</span>
            <h2 className="mt-4 text-2xl text-gray-900 font-bold md:text-3xl">How We Work Together</h2>
        </div>
        <div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
                <div className="relative p-8 space-y-8">
                    <img src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/burger.png" className="w-10" width="512" height="512" alt="burger illustration" />
                    
                    <div className="space-y-2">
                        <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">Analize the problem</h5>
                        <p className="text-sm text-gray-600">Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.</p>
                    </div>
                </div>
            </div>
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
                <div className="relative p-8 space-y-8">
                    <img src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/trowel.png" className="w-10" width="512" height="512" alt="burger illustration" />
                    
                    <div className="space-y-2">
                        <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">Ask to our expert</h5>
                        <p className="text-sm text-gray-600">Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.</p>
                    </div>
                </div>
            </div>
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
                <div className="relative p-8 space-y-8">
                    <img src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/package-delivery.png" className="w-10" width="512" height="512" alt="burger illustration" />
                    
                    <div className="space-y-2">
                        <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">Diagnostics the cause</h5>
                        <p className="text-sm text-gray-600">Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.</p>
                    </div>
                </div>
            </div>
            <div className="relative group bg-gray-100 transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
                <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90">
                    <img src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/metal.png" className="w-10" width="512" height="512" alt="burger illustration" />
                    
                    <div className="space-y-2">
                        <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">Left the animal</h5>
                        <p className="text-sm text-gray-600">Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ApproceCard