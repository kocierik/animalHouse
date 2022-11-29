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
        {
          _id: new Types.ObjectId('635c088531e05da80c7faf6b'),
          age: 2,
          name: 'lalalal',
          type: 'dog',
          userId: '635c088531e05da80c7faf61',
          picture: {
            filename: "pappa.png",
            mimetype: "image/png",
            size: 1033
          },
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
      image: {
        filename: "pappa.png",
        mimetype: "image/png",
        size: 1033
      },
      alt: 'dog',
      animalTargets: ['0'],
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
      image: {
        filename: "62f425273418f02b236b58b1",
        mimetype: "image/png",
        size: 1033
      },
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
