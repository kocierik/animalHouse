import { model, Schema } from "mongoose"
import { cartItemSchema, ICartItem } from "./CartItem"
import { IAddress } from "./User"

export interface IOrder {
    _id: string
    cartId: string
    executionDate: Date
    cardName: string
    cardNumber: string
    address: IAddress
}

const orderSchema = new Schema<IOrder>({
    cartId: {type: String, required: true},
    executionDate: {type: Date, required: true},
    cardName: {type: String, required: true},
    cardNumber: {type: String, required: true},
})

export const Order = model<IOrder>('Orders', orderSchema)