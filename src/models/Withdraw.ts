export interface Withdraw {
  withdrawOrderId: number,
  fromUserToken: number,
  amount: number,
  status: string,
  createdAt: string,
  method: string
}
