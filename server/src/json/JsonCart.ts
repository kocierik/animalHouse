import { JsonCartItem } from "./JsonCartItem"

export interface JsonCart {
    _id: string
    userId: string
    cartItems: JsonCartItem[]
}

export const SwaggerCart = {
    type: 'object',
    properties: {
        _id: {
            type: 'string'
        },
        userId: {
            type: 'string',
        },
        cartItems: {
            type: 'array',
            items: {
                type: 'object',
                schema: {
                    "$ref": "#/components/schemas/CartItem"
                }
            }
        }
    }
}