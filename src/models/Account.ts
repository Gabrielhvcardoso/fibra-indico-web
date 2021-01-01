export interface Account {
  accountId: number,
  token: string,
  accountJson: string
}

export const isAccount = (toBeDetermined: any | Account): toBeDetermined is Account => {
  if ((toBeDetermined as Account).accountId) return true;
  return false;
};
