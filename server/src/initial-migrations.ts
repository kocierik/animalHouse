import { Game } from './entities/Community'
import { Types } from 'mongoose'
import ProductCategory from './entities/ProductCategory'
import Product from './entities/Product'
import Review from './entities/Review'
import { GAMES } from './const'
import AnimalCode from './entities/AnimalCode'
import User from './entities/User'
import Admin from './entities/Admin'
import Animal from './entities/Animal'

export const test = async () => {
  await User.deleteMany()
  await User.insertMany([
    {
      email: 'mattia@ah.com',
      username: 'mattia',
      password: 'mattia',
      firstName: 'mattia',
      lastName: 'girolimetto',
      phone: '3333333333',
      description: 'ciao',
      profilePicture: null,
      animals: [],
    },
    {
      _id: new Types.ObjectId('635c088531e05da80c7faf61'),
      email: 'man@ah.com',
      username: 'erikMan',
      password: 'erik',
      firstName: 'erik',
      lastName: 'koci',
      description: 'ciao',
      phone: '3333333333',
      profilePicture: null,
      animals: [
        {
          _id: new Types.ObjectId('635c088531e05da80c7faf6a'),
          age: 20,
          name: 'Stefano Volpe',
          type: 'fox',
          userId: '635c088531e05da80c7faf61',
          picture: null,
        },
      ],
    },
    {
      email: 'lele@ah.com',
      username: 'lele',
      password: 'gabriele',
      firstName: 'gabriele',
      lastName: 'crestanello',
      phone: '3333333333',
      description: 'ciao',
      profilePicture: null,
      animals: [],
    },
  ])

  await Product.deleteMany()
  await Product.insertMany([
    {
      _id: new Types.ObjectId('62f425273418f02b236b58b0'),
      name: 'dog food',
      description: 'dog for every food',
      price: 69,
      categoryId: '62f3c0540ac73a2bc4764da8',
      images: [
        'data:image/jpeg;base64,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',
      ],
      alt: 'dog',
      animalTargets: ['dog'],
      colors: ['black', 'white'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2L', '3L'],
      highlights: ['great', 'confort', 'animal', 'hot', 'cold'],
      details: 'perfect for burn cat',
    },
    {
      _id: new Types.ObjectId('62f425273418f02b236b58b1'),
      name: 'cool T-shirt',
      description: 'so fresh',
      price: 420,
      categoryId: '62f3c0540ac73a2bc4764da7',
      colors: ['white', 'red'],
      types: ['man', 'child', 'woman'],
      images: ['https://www.impericon.com/media/catalog/product/s/p/spongebobsquarepants_happyface_yellow_girl_lg.jpg'],
      alt: 'shirt',
      animalTargets: ['human'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2L', '3L'],
      highlights: ['beauty', 'confort', 'human', 'cold'],
      details: 'perfect for burn human',
    },
  ])
}

export const initAdmin = async () => {
  await Admin.deleteMany()
  await Admin.insertMany([
    {
      username: 'admin',
      password: 'secret',
    },
  ])
}

export const initGames = async () => {
  await Game.deleteMany()
  await Game.insertMany(GAMES)
}

export const initProductCategories = async () => {
  await ProductCategory.deleteMany()
  await ProductCategory.insertMany([
    {
      name: 'wearing',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da7'),
    },
    {
      name: 'food',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da8'),
    },
    {
      name: 'health',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da9'),
    },
    {
      name: 'accessories',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764daa'),
    },
    {
      name: 'puppies',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764dab'),
    },
    {
      name: 'entertainment',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764dac'),
    },
    {
      name: 'beauty',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764dad'),
    },
  ])
}

export const initAnimalCodes = async () => {
  await AnimalCode.deleteMany()
  await AnimalCode.insertMany([
    { code: 0, value: 'Dog' },
    { code: 1, value: 'Cat' },
    { code: 2, value: 'Fox' },
    { code: 3, value: 'Duck' },
    { code: 4, value: 'Bunny' },
    { code: 5, value: 'Koala' },
    { code: 6, value: 'Panda' },
    { code: 7, value: 'Shiba' },
    { code: 8, value: 'Lizard' },
  ])
}
