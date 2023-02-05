import React, { useEffect } from 'react'
import { ApiRepository, JsonReview } from 'shared'
import { StarIcon } from '@heroicons/react/solid'
import { toast, ToastContainer } from 'react-toastify'
import { Helpers } from 'shared'

interface IProps {
  post: boolean
  setPost: React.Dispatch<React.SetStateAction<boolean>>
  productId: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const PostReview = (props: IProps) => {
  const { post, setPost, productId } = props
  const [textComment, setTextComment] = React.useState('')
  const [username, setUsername] = React.useState('')

  const getUserInfo = async () => {
    if (Helpers.isLogged()) {
      const user = (await ApiRepository.getCurrentUser()).data
      setUsername(user?.username!)
    }
  }

  const postComment = async () => {
    if (star === 0) {
      toast.warn('You should leave a star!', {
        position: toast.POSITION.TOP_CENTER
      })
      return
    }
    await getUserInfo()
    setPost(!post)

    const data: JsonReview.IReview = {
      username: username,
      productId: productId,
      comment: textComment,
      star: star,
      date: new Date()
    }
    setTextComment('')
    await ApiRepository.postProductReview(productId, data)
  }

  const valueProduct = [{ star: 1 }, { star: 2 }, { star: 3 }, { star: 4 }, { star: 5 }]
  const [star, setStar] = React.useState(0)

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <ToastContainer />
      {/* Card Base */}
      {Helpers.isLogged() && (
        <div className="max-w-2xl mx-auto pb-16  px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          {/* Top Half - Avatar & Text Box */}
          <div className="flex flex-col mt-10 content-start p-4">
            <div className="flex mb-5">
              <span className="flex" style={{ flex: '0 0 auto' }}>
                <img
                  src="/imageprofile.jpg"
                  className="rounded-full flex-initial max-h-12 w-12 sm:max-h-14 sm:w-14  duration-150"
                  alt="User profile"
                />
              </span>
              <div className="flex items-center" style={{ flex: '1 1 90%' }}>
                <span className="font-black	text-lg	p-4">{username}</span>
                <div className="flex">
                  {valueProduct.map((rating) => (
                    <button aria-label={rating.star.toString() + " star"} onClick={() => setStar(rating.star)}>
                      <StarIcon
                        key={rating.star}
                        className={classNames(
                          star + 1 > rating.star ? 'text-yellow-400 ' : 'text-gray-200',
                          'h-7 w-7 flex-shrink-0 cursor-pointer	'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex ">
              <textarea
                value={textComment}
                onChange={(e) => setTextComment(e.target.value)}
                id="post-input"
                rows={3}
                placeholder="What do you think about this article?"
                className="w-1/2 flex flex-1 w-10 rounded font-sans placeholder-gray-400 self-start ml-3 sm:ml-4 mt-2 sm:mt-3 text-sm sm:text-base focus:outline-none"
              />
            </div>
          </div>

          {/* Lower Half - Photo/Video & Post Buttons */}
          <div className="flex p-2 justify-end sm:p-4 mr-5">
            <button
              onClick={postComment}
              className="hover:-translate-y-1 hover:scale-105 duration-300 px-3 py-1 sm:px-4 sm:py-2 rounded-md text-white sm:font-medium sm:text-base text-sm bg-green-500 hover:bg-green-600 duration-150"
            >
              Post It
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default PostReview
