import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_FOUND } from '../const'
import JsonError from '../json/JsonError'
import { Request, Response } from 'express'
import Review from '../entities/Review'
import { JsonReview } from '../json/JsonReview';


export const getReviews = async (req: Request, res: Response) => {
  const pathId = req.params.id
  if (pathId) {
    // Check existing review
    if(res.status(STATUS_OK).json(await Review.find({productId: pathId}))){
      return res.status(STATUS_OK).json(await Review.find({productId: pathId}))
    } else return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Invalid  product id ${pathId}`))
  } else {
    return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Url Product id doesn't exist ${pathId}`))
  }
}

export const postReview = async (req: Request, res: Response) => {
  const pathId = req.params.id
  const reviewCreation = req.body as JsonReview
  
  // Check existing product
  if (pathId) {
    if(!reviewCreation.star)
      return res.status(STATUS_BAD_REQUEST).json(new JsonError(`insert a valid number of star`))
    if(reviewCreation.star){
      const review = new Review()
      review.username = reviewCreation.username
      review.productId = reviewCreation.productId
      review.comment = reviewCreation.comment
      review.star = reviewCreation.star
      review.date = reviewCreation.date
      try {
        await review.save()
      } catch (error) {
        return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Error on creation review: ${error}`))
      }
      return res.status(STATUS_OK).json(review)
    } 
  } else {
    return res.status(STATUS_BAD_REQUEST).json(new JsonError(`Url Product id doesn't exist ${pathId}`))
  }
}