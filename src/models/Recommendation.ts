export interface Recommendation {
  recommendationId: number,
  fromUserToken: string,
  productId: number,
  client: string,
  phone1: string,
  phone2?: string,
  createdAt: string,
  status: string
}
