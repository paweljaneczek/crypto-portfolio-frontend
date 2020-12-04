import * as R from "ramda";
import { Wallet, WalletInfo } from "../models";
import { getAddressInfo } from "../network";
import { create, createAsync } from "./creators";

export const createWallet = create<Wallet>("CREATE_WALLET");
export const deleteWallet = create<Wallet>("DELETE_WALLET");
export const updateWallet = create<Wallet>("UPDATE_WALLET");

export const getWalletInfo = createAsync<
  { wallet: Wallet },
  WalletInfo,
  Error
>("GET_WALLET_INFO", async ({ wallet }, _, getState) => {
  const result = (await getAddressInfo(wallet.address)).data;
  return R.mergeRight(result, { ts: Math.floor(Date.now() / 1000) });
});
