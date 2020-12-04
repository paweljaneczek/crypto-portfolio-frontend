import * as R from "ramda";
import { Store, Wallet } from "../models";

export const selectWallets = (store: Store): Wallet[] => store.wallet.wallets;

export const selectWallet = (store: Store, walletId: string) =>
  R.find(R.propEq("id", walletId), store.wallet.wallets);

export const selectWalletInfo = (store: Store, walletId: string) =>
  store.wallet.infos[walletId];

export const selectWalletInfoRequestState = (store: Store, walletId: string) =>
  store.wallet.infoRequestStates[walletId];
