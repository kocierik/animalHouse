import { Game } from './entities/Community'
import { Types } from 'mongoose'
import ProductCategory from './entities/ProductCategory'
import Product from './entities/Product'
import { GAMES } from './const'
import AnimalCode from './entities/AnimalCode'
import User from './entities/User'
import Admin from './entities/Admin'
import ReservationCode from './entities/Service'
import Location from './entities/Location'
import Animal from './entities/Animal'
import { Forum } from './entities/Forum'
import { Post } from './entities/Post'
import { Order } from './entities/Order'
import Cart from './entities/Cart'

export const test = async () => {
  await Admin.deleteOne({ username: 'test-admin' })
  await Admin.insertMany([
    { username: 'test-admin', password: 'test', _id: new Types.ObjectId('000000000000000000000001') }
  ])

  await Animal.deleteMany()
  await Animal.insertMany([
    {
      _id: new Types.ObjectId('635c088531e05da80c7faf6a'),
      age: 20,
      name: 'Stefano Volpe',
      type: 'fox',
      userId: '635c088531e05da80c7faf61',
      picture: null
    },
    {
      _id: new Types.ObjectId('635c088531e05da80c7faf6b'),
      age: 2,
      name: 'lalalal',
      type: 'dog',
      userId: '635c088531e05da80c7faf61',
      picture: {
        filename: 'pappa.png',
        mimetype: 'image/png',
        size: 1033
      }
    }
  ])
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
      valid: true,
      profilePicture: null,
      animals: []
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
      valid: true,
      profilePicture: null,
      animals: ['635c088531e05da80c7faf6a', '635c088531e05da80c7faf6b']
    },
    {
      _id: new Types.ObjectId('635c088531e05da80c7faf62'),
      email: 'lele@ah.com',
      username: 'lele',
      password: 'gabriele',
      firstName: 'gabriele',
      lastName: 'crestanello',
      valid: true,
      phone: '3333333333',
      description: 'ciao',
      profilePicture: { filename: '635c088531e05da80c7faf62' },
      animals: []
    }
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
        filename: 'pappa.png',
        mimetype: 'image/png',
        size: 1033
      },
      alt: 'dog',
      animalTargets: ['0'],
      colors: ['black', 'white'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2L', '3L'],
      highlights: ['great', 'confort', 'animal', 'hot', 'cold'],
      details: 'perfect for burn cat'
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
        filename: '62f425273418f02b236b58b1',
        mimetype: 'image/png',
        size: 1033
      },
      alt: 'shirt',
      animalTargets: ['human'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2L', '3L'],
      highlights: ['beauty', 'confort', 'human', 'cold'],
      details: 'perfect for burn human'
    },
    {
      _id: new Types.ObjectId('62f425273418f02b236b58b4'),
      name: 'Grattaculo',
      description: 'so fresh',
      price: 1550,
      categoryId: '62f3c0540ac73a2bc4764da7',
      types: ['man', 'child', 'woman'],
      image: { filename: '62f425273418f02b236b58b4' },
      alt: 'shirt',
      animalTargets: ['human'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2L', '3L'],
      highlights: ['beauty', 'confort', 'human', 'cold'],
      details: 'perfect for burn human'
    },
    {
      _id: new Types.ObjectId('62f425273418f02b236b58b5'),
      name: 'Pupazzo papero strano',
      description: 'so fresh',
      price: 10000000,
      categoryId: '62f3c0540ac73a2bc4764da7',
      colors: ['white', 'red'],
      types: ['man', 'child', 'woman'],
      image: { filename: '62f425273418f02b236b58b5' },
      alt: 'shirt',
      animalTargets: ['dog', 'cat'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2L', '3L'],
      highlights: ['beauty', 'confort', 'human', 'cold'],
      details: 'perfect for burn human'
    },
    {
      _id: new Types.ObjectId('62f425273418f02b236b58b6'),
      name: 'sapone per cani',
      description: 'so fresh',
      price: 10,
      categoryId: '62f3c0540ac73a2bc4764da7',
      colors: ['white', 'red'],
      types: ['man', 'child', 'woman'],
      image: { filename: '62f425273418f02b236b58b6' },
      alt: 'shirt',
      animalTargets: ['dog'],
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2L', '3L'],
      highlights: ['beauty', 'confort', 'human', 'cold'],
      details: 'perfect for burn human'
    }
  ])
  await Cart.deleteMany()
  await Order.deleteMany()
  await Order.insertMany([
    {
      userId: "635c088531e05da80c7faf62",
      cartId: "635c088531e05da80c7fff62",
      executionDate: new Date("Thu 25 Jan 2023"),
      cartItems: [
        {
          productId: '62f425273418f02b236b58b5',
          price: 2563
        }
      ],
      cardName: "LELE",
      cardNumber: "1234 1234 1213 1234",
      address: { country: 'IT', city: 'Venezia', street: 'Via Pietro Arduino, 20', zip: '30175' },
    },
    {
      cartId: "635c088531e05da80c7fff62",
      executionDate: new Date("Thu 26 Jan 2023"),
      userId: "635c088531e05da80c7faf62",
      cartItems: [
        {
          productId: '62f425273418f02b236b58b4',
          price: 1550
        },
        {
          productId: '62f425273418f02b236b58b5',
          price: 4,
          size: 'XL'
        }
      ],
      cardName: "LELE",
      cardNumber: "1234 1234 1213 1234",
      address: { country: 'IT', city: 'Venezia', street: 'Via Pietro Arduino, 20', zip: '30175' },
    },
    {
      userId: "635c088531e05da80c7faf61",
      cartId: "635c088531e05da80c7fff62",
      executionDate: new Date("Thu 27 Jan 2023"),
      cartItems: [
        {
          productId: '62f425273418f02b236b58b4',
          price: 155
        }
      ],
      cardName: "MAN",
      cardNumber: "1234 1234 1213 1234",
      address: { country: 'IT', city: 'Venezia', street: 'Via Pietro Arduino, 20', zip: '30175' },
    },
    {
      userId: "635c088531e05da80c7faf61",
      cartId: "635c088531e05da80c7fff62",
      executionDate: new Date("Thu 27 Jan 2023"),
      cartItems: [
        {
          productId: '62f425273418f02b236b58b4',
          price: 165
        }
      ],
      cardName: "MAN",
      cardNumber: "1234 1234 1213 1234",
      address: { country: 'IT', city: 'Venezia', street: 'Via Pietro Arduino, 20', zip: '30175' },
    },
    {
      userId: "635c088531e05da80c7faf61",
      cartId: "635c088531e05da80c7fff62",
      executionDate: new Date("Thu 27 Jan 2023"),
      cartItems: [
        {
          productId: '62f425273418f02b236b58b5',
          price: 12
        }
      ],
      cardName: "MAN",
      cardNumber: "1234 1234 1213 1234",
      address: { country: 'IT', city: 'Venezia', street: 'Via Pietro Arduino, 20', zip: '30175' },
    }
    ,
    {
      userId: "635c088531e05da80c7faf61",
      cartId: "635c088531e05da80c7fff62",
      executionDate: new Date("Thu 27 Jan 2023"),
      cartItems: [
        {
          productId: '62f425273418f02b236b58b5',
          price: 114
        }
      ],
      cardName: "MAN",
      cardNumber: "1234 1234 1213 1234",
      address: { country: 'IT', city: 'Venezia', street: 'Via Pietro Arduino, 20', zip: '30175' },
    }
  ])
}

export const initAdmin = async () => {
  await Admin.deleteMany()
  await Admin.insertMany([
    {
      username: 'admin',
      password: 'secret'
    }
  ])
}

export const initForums = async () => {
  await Forum.deleteMany()
  await Forum.insertMany([
    {
      _id: '63cef427d93bbce76c2ca583',
      name: 'Welcome',
      description: 'Welcome to our community! Speak with other people here!'
    },
    {
      _id: new Types.ObjectId('63cfc9ffab338c98b2473d37'),
      name: 'Here it is',
      description: 'Share the photos of your friends with the Animal House community!'
    },
    {
      _id: '63cef427d93bbce76c2ca585',
      name: 'Help',
      description: 'Ask the Animal House community for help!'
    },
    {
      _id: '63cef427d93bbce76c2ca586',
      name: 'It\'s your turn!',
      description: 'Let your animal share his/her thoughts with the House comunity for help!'
    },
    {
      _id: '63cef427d93bbce76c2ca587',
      name: 'My advice is...',
      description: 'Here users can share advices with other memeber of the community'
    },
    {
      _id: '63cef427d93bbce76c2ca588',
      name: 'LOL - laughing togheter',
      description: 'Share your jokes with the Animal House comunity'
    }
  ])
  await Post.deleteMany()
  await Post.insertMany([
    {
      text: "Il mio animale domestico è un gatto di nome Luna. È una gatta tigrata dolce e affettuosa, sempre pronta a ricevere coccole. Adora giocare con i suoi giocattoli e passare del tempo con la sua famiglia umana. Non potrei chiedere di meglio come compagnia!",
      date: "2023-01-24T12:22:01.880Z",
      userId: "635c088531e05da80c7faf62",
      forumId: "63cfc9ffab338c98b2473d37",
      valid: true,
    },
    {
      text: "Mi chiamo Luna e ho un gatto adorabile di nome Felix. È un gattino tigrato con occhi verdi e una personalità dolce e affettuosa. Adoro guardarlo giocare e ronfare accanto a me mentre lavoro. Non posso immaginare la mia vita senza di lui!",
      date: "2023-01-24T12:23:05.880Z",
      userId: "635c088531e05da80c7faf62",
      forumId: "63cfc9ffab338c98b2473d37",
      valid: true,
    },
    {
      text: "Il mio cane si chiama Bella e lei è un Labrador Retriever. È così leale e divertente, sempre pronta per una passeggiata o un gioco. Ha un pelo morbido e marrone scuro che amo accarezzare. È anche una grande guardiana e mi fa sentire sempre al sicuro. Non potrei chiedere di meglio come animale domestico!",
      date: "2023-01-24T12:28:31.800Z",
      userId: "635c088531e05da80c7faf62",
      forumId: "63cfc9ffab338c98b2473d37",
      valid: true,
    },
    {
      text: "Il mio animale domestico è un pappagallo di nome Polly. È una parlantina intelligente e adoro insegnarle nuove parole e trucchi. Ha un piumaggio colorato con sfumature di verde, giallo e rosso che è sempre un piacere vedere. E' molto affettuosa e mi fa compagnia durante le lunghe giornate. Non potrei immaginare la mia vita senza di lei.",
      date: "2023-01-24T12:28:31.800Z",
      userId: "635c088531e05da80c7faf62",
      forumId: "63cfc9ffab338c98b2473d37",
      valid: true,
    },
    {
      text: "Questo post non dovrebbe essere valido",
      date: "2023-01-24T12:32:31.800Z",
      userId: "635c088531e05da80c7faf62",
      forumId: "63cfc9ffab338c98b2473d37",
      valid: false,
    },
    {
      text: "Il mio animale domestico è un pesce rosso chiamato Nemo (sì, come quello del film). Non fa molto, a parte nuotare in cerchio e guardarmi mentre mangio. Ma devo ammettere che è un gran esperto di scienze marine, basta guardare la sua abilità nel respirare sott'acqua. E' anche un gran nuotatore, se solo avesse un po' più di carattere sarebbe un vero campione!",
      date: "2023-01-24T12:29:31.800Z",
      userId: "635c088531e05da80c7faf61",
      forumId: "63cfc9ffab338c98b2473d37",
      valid: true,
    }
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
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da7')
    },
    {
      name: 'food',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da8')
    },
    {
      name: 'health',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764da9')
    },
    {
      name: 'accessories',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764daa')
    },
    {
      name: 'puppies',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764dab')
    },
    {
      name: 'entertainment',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764dac')
    },
    {
      name: 'beauty',
      _id: new Types.ObjectId('62f3c0540ac73a2bc4764dad')
    }
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
    { code: 8, value: 'Lizard' }
  ])
}
export const initReservationCodes = async () => {
  await ReservationCode.deleteMany()
  await ReservationCode.insertMany([
    {
      _id: new Types.ObjectId('137a10397c883b752202e441'),
      title: 'Find Partner',
      description:
        "Introducing the ultimate matchmaking service for animals! Our state-of-the-art technology takes into consideration factors such as breed, personality, and compatibility to help you find the perfect partner for your furry friend. We've got you covered.",
      color: 'red'
    },
    {
      _id: new Types.ObjectId('237a10397c883b752202e442'),
      title: 'Help animals',
      description:
        'Introducing our animal assistance service, dedicated to helping animals in need. Our mission is to provide support and resources for animals of all kinds, whether they are stray, abandoned, or simply in need of a helping hand. We are the best in this sector!',
      color: 'green'
    },
    {
      _id: new Types.ObjectId('337a10397c883b752202e443'),
      title: 'Psychologist',
      description:
        'Our animal psychology service offers a unique approach to understanding and improving the well-being of animals. Our team of trained and experienced animal psychologists specialize in providing behavioral and emotional support for a wide range of animals.',
      color: 'indigo'
    },
    {
      _id: new Types.ObjectId('437a10397c883b752202e444'),
      title: 'Dog Sitter',
      description:
        "Introducing our top-rated dog sitting service for pet owners in need of a reliable and caring sitter for their furry friend. Our team of experienced dog sitters provide a safe and comfortable environment for your dog while you're away. All animal smile.",
      color: 'coral'
    },
    {
      _id: new Types.ObjectId('537a10397c883b752202e445'),
      title: 'Veterinary',
      description:
        'Welcome to our comprehensive veterinary service for animals. Our team of highly trained and experienced veterinarians and staff are dedicated to providing the best possible care for your furry friend. We have many professional certification in this sector',
      color: 'blue'
    },
    {
      _id: new Types.ObjectId('637a10397c883b752202e446'),
      title: 'Pension',
      description:
        "Introducing our luxury animal pension service, where your pet can enjoy a comfortable and stress-free vacation while you're away. Our facilities offer spacious and well-appointed accommodations for a wide range of animals. from sleeping to have fun!",
      color: 'orange'
    },
    {
      _id: new Types.ObjectId('737a10397c883b752202e447'),
      title: 'Wash Animal',
      description:
        'Introducing our premium animal grooming service, where the care and comfort of your pet is our top priority. Our team of expert groomers use the latest techniques and high-quality products to keep your animal looking and feeling their best.',
      color: 'brown'
    },
    {
      _id: new Types.ObjectId('837a10397c883b752202e448'),
      title: 'Home visit',
      description:
        'Introducing our in-home animal care service, where we bring professional care to the comfort of your own home. Our team of trained and experienced animal caregivers provide a wide range of services to meet the needs of your pet, including all services.',
      color: 'pink'
    },
    {
      _id: new Types.ObjectId('937a10397c883b752202e449'),
      title: 'Grooming',
      description:
        'Introducing our luxury animal grooming service, where we pamper your pet with the highest quality grooming services. Our team of expert groomers use the latest techniques and high-quality products to keep your animal looking and feeling their best.',
      color: 'deeppink'
    }
  ])
}

export const initLocationCodes = async () => {
  await Location.deleteMany()
  await Location.insertMany([
    {
      _id: new Types.ObjectId('637a10397c883b752202e444'),
      address: { country: 'IT', city: 'Bologna', street: 'Via Eleonora Duse, 13/C', zip: '40127' },
      name: 'Animal House',
      latitude: '44.5019306',
      longitude: '11.3705182'
    },
    {
      _id: new Types.ObjectId('637a10397c883b752202e442'),
      address: { country: 'IT', city: 'Ravenna', street: 'SS16, km 162', zip: '47832' },
      name: 'Mirabilandia',
      latitude: '44.3378048',
      longitude: '12.2633986'
    },
    {
      _id: new Types.ObjectId('637a10397c883b752202e443'),
      address: { country: 'IT', city: 'Venezia', street: 'Via Pietro Arduino, 20', zip: '30175' },
      name: 'Nave de Vero',
      latitude: '45.4595039',
      longitude: '12.2126283'
    },
    {
      _id: new Types.ObjectId('637a10397c883b752202e445'),
      address: { country: 'IT', city: 'Milano Marittima (RA)', street: 'Via III Traversa, 281', zip: '48015' },
      name: 'Papeete Beach',
      latitude: '44.2816929',
      longitude: '12.3521182'
    },
    {
      _id: new Types.ObjectId('637a10397c883b752202e446'),
      address: { country: 'IT', city: 'Porto Tolle (RO)', street: '???', zip: '00000' },
      name: 'Palude',
      latitude: '44.9734477',
      longitude: '12.5529393'
    },
    {
      _id: new Types.ObjectId('637a10397c883b752202e447'),
      address: { country: 'IT', city: 'Asiago (VI)', street: 'Via Trento e Trieste, 15', zip: '36012' },
      name: 'Animal Zone',
      latitude: '45.8741378',
      longitude: '11.5078029'
    }
  ])
}
