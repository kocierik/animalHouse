import { JsonAddress } from "./JsonAddress"

export interface JsonOrder {
    _id: string
    cartId: string
    executionDate: string
    cardName: string
    cardNumber: string
    address: JsonAddress 
}

export const SwaggerOrder = {
    type: 'object',
    properties: {
        _id : {
            type: 'string'
        },
        cartId: {
            type: 'string'
        },
        executionDate: {
            type: 'string'
        },
        cardName: {
            type: 'string'
        },
        cardNumber: {
            type: 'string'
        },
        address: {
            type: 'object',
            schema: {
                "$ref": "#/components/schemas/Address"
            }
        }
    }
}