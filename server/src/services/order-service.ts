import { IOrder, Order } from "../entities/Order";
import { IAddress } from "../entities/User";
import { JsonCartItem } from "../json/JsonCartItem";
import { JsonServerError } from "../json/JsonError";
import { JsonOrder } from "../json/JsonOrder";
import { JsonPaymentDetails } from "../json/JsonPaymentDetails";
import { JsonAddress } from "../json/JsonUser";
import * as CartService from "./cart-service"

export const orderToJsonOrder = (order: IOrder) : JsonOrder => 
({
    _id: order._id,
    address: order.address as JsonAddress,
    cardName: order.cardName,
    cardNumber: order.cardNumber,
    executionDate: order.executionDate.toDateString(),
    cartId: order.cartId
} as JsonOrder)

export const findOrderById = (id: string) => Order.findById(id)

export const createOrderForUser = async (cartId: string, paymentDetails: JsonPaymentDetails, date=new Date()) : Promise<IOrder> => {
    // Check that the cart is deactivated
    if (!await CartService.isCartDeactivated(cartId)) 
        throw new JsonServerError("Cannot create order from an active cart")
    
    const order = new Order()
    order.cartId = cartId
    order.cardName = paymentDetails.cardName
    order.cardNumber = paymentDetails.cardNumber
    order.address = paymentDetails.address as IAddress
    order.executionDate = date
    await order.save()

    return order as IOrder
}