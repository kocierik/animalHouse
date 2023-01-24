export interface PostPatch {
    likes?: number
} 

export const SwaggerPostPatch = {
  type: 'object',
  properties: {
    likes: {
      type: 'number',
      nullable: true
    },
  }
}