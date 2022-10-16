import React from 'react'

const Reviewer = () => {
  const UsersReview = [
    {
      id: 1,
      name: 'Il man',
      star: 5,
      description: 'bello',
      added: '2 months ago'
    },
    {
      id: 2,
      name: 'gyerik',
      star: 3,
      description: '3 stelline',
      added: 'now'
    }
  ]

  return (
    <div className=" max-w-2xl mx-auto pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Reviews</h1>
            </div>
    <div className="mb-2 mt-5 rounded-t-8xl rounded-b-5xl overflow-hidden">
      {UsersReview.map((user,i) => (
        <div key={i}>
          <div  className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40" >
            <div className="flex flex-wrap items-center">
              <img className="mr-6" src="uinel-assets/images/ecommerce-reviews/user.png" alt="" />
              <h4 className="w-full md:w-auto text-xl font-heading font-medium">{user.name}</h4>
              <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
              <span className="mr-4 text-xl font-heading font-medium">{user.star}</span>
              <div className="inline-flex">
                {Array.from(Array(user.star), (e, i) => {
                  return (
                    <a className="inline-block mr-1" href="#" key={i}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="#FFCB00"
                        ></path>
                      </svg>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3 mb-6 md:mb-0">
                <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">{user.description}</p>
              </div>
              <div className="w-full md:w-1/3 text-right">
                <p className="mb-8 text-sm text-gray-300">{user.added}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Reviewer
