import { v4 as uuidv4 } from "uuid";
import { Wallet, WalletTokenInfo } from "../models";

export const createInitialWallet = (): Wallet => ({
  id: uuidv4(),
  address: "",
  name: "",
});

export const getTokenBalance = (tokenInfo: WalletTokenInfo) => {
  const decimals = parseInt(tokenInfo.tokenInfo.decimals);
  return tokenInfo.balance / 10 ** decimals;
};
