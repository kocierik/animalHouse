import { Request, Response } from 'express'
import Product from '../entities/Product'
import User from '../entities/User'
import Score from '../entities/Score'
import { Game } from '../entities/Community'
import { JsonUserCreation, JsonLogin} from '../json/JsonUser'
import { JsonProduct } from '../json/JsonProduct'
import { JsonError } from '../json/JsonError'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { STATUS_OK, STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED, STATUS_NOT_FOUND } from '../const'
import { Types } from 'mongoose'

//TODO: validare input utente

export const getProducts = async (_: Request, res: Response) => {
  return res.json(await Product.find({}))
}

export const getProduct = async (req: Request, res: Response) => {
    let query = {_id:req.params.id};
    return res.status(STATUS_OK).json(await findProductsFromQuery(query))
}

export const deleteProduct = async (req: Request, res: Response) => {
    //TODO: check admin token + check input
    if(JSON.stringify((await findProductsFromQuery({_id:req.params.id})))=="[]")
      return res.status(STATUS_NOT_FOUND).json(new JsonError(`${req.params.it} is not a valid product id`))
    Product.deleteOne({_id:req.params.id},function(){
      return res.status(STATUS_OK).send('product removed successfully');
    });
}

export const postProduct = async (req: Request, res: Response) => {
    //TODO: check admin token
    const productCreation = req.body as JsonProduct;
    //CHECK INPUT
    const product = new Product();

    /*
    product.name = productCreation.name;
    product.price = productCreation.price;
    product.categoryId = productCreation.categoryId;
    product.description = productCreation.description;
    product.animalTargets = productCreation.animalTargets;
    product.image = productCreation.image;
    */
    console.log(req.body);
    product.name = "Prova1";
    product.price = 123;
    product.categoryId = "62f3c0540ac73a2bc4764da8";
    product.description = "test di fede";
    product.animalTargets = [];
    product.image = "https://qph.cf2.quoracdn.net/main-qimg-020fac071c01a6321fe24013aa136e60-pjlq";

  
    await product.save();
    return res.status(STATUS_OK).json(product);
}


// Common functions 
const findProductsFromQuery = async (query) => {
    const promises = (await Product.find(query));
    return await Promise.all(promises);
}