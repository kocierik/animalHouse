import { JsonAddress } from '../json/JsonAddress'
import { IOrder, Order } from '../entities/Order'
import { JsonCartItem } from '../json/JsonCartItem'
import { JsonServerError } from '../json/JsonError'
import { JsonOrder } from '../json/JsonOrder'
import { JsonPaymentDetails } from '../json/JsonPaymentDetails'
import * as CartService from './cart-service'
import { IAddress } from '../entities/Address'
import { idText } from 'typescript'
import { ICart } from '../entities/Cart'

export const orderToJsonOrder = (order: IOrder): JsonOrder =>
  ({
    _id: order._id,
    address: order.address as JsonAddress,
    cardName: order.cardName,
    cardNumber: order.cardNumber,
    userId: order.userId,
    cartItems: order.cartItems,
    executionDate: order.executionDate.toDateString(),
    cartId: order.cartId
  } as JsonOrder)

export const findOrderById = (id: string) => Order.findById(id)

export const createOrderForUser = async (
  oldCart: ICart,
  paymentDetails: JsonPaymentDetails,
  userId: string,
  date = new Date()
): Promise<IOrder> => {
  // Check that the cart is deactivated
  if (!(await CartService.isCartDeactivated(oldCart._id)))
    throw new JsonServerError('Cannot create order from an active cart')

  const order = new Order()
  order.cartId = oldCart._id
  order.userId = userId
  order.cartItems = oldCart.cartItems
  order.cardName = paymentDetails.cardName
  order.cardNumber = paymentDetails.cardNumber
  order.address = paymentDetails.address as IAddress
  order.executionDate = date
  await order.save()

  return order as IOrder
}
