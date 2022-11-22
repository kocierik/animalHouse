export interface JsonCartItem {
    price: number
    productId: string
    color?: string 
    size?: string 
    type?: string 
}

export const SwaggerCartItem = {
    type: 'object',
    required: ['productId'],
    properties: {
        productId: {
            type: 'string',
        },
        color: {
            type: 'string',
        },
        size: {
            type: 'string',
        },
        type: {
            type: 'string',
        },
    },
}