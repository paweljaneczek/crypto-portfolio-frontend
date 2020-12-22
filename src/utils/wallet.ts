import { v4 as uuidv4 } from "uuid";
import * as R from "ramda";
import { Wallet, WalletInfo, WalletTokenInfo } from "../models";
import { formatPrice } from "./utils";

export const createInitialWallet = (): Wallet => ({
  id: uuidv4(),
  address: "",
  name: "",
});

export const getTokenBalance = (balance: number, decimals?: string) => {
  if (!decimals) {
    return balance;
  }
  return balance / 10 ** parseInt(decimals);
};

export const getRoundedTokenBalance = (balance: number, price?: number) => {
  if (!price) {
    return balance;
  }
  return balance.toFixed(Math.round(price).toString().length);
};

export const calculateWalletMoneySum = (walletInfo: WalletInfo) => {
  let sum = walletInfo.ETH.balance * walletInfo.ETH.price.rate;
  walletInfo.tokens.forEach((token) => {
    const tokenInfo = token.tokenInfo;
    if (token.tokenInfo && tokenInfo.decimals && tokenInfo.price) {
      const balance = getTokenBalance(token.balance, tokenInfo.decimals);
      sum += balance * tokenInfo.price.rate;
    }
  });
  return formatPrice(sum, "USD");
};

export const getSortedWalletInfo = (walletInfo: WalletInfo) =>
  R.mergeDeepRight(walletInfo, {
    tokens: R.sort((a, b) => {
      const tokenInfoA = a.tokenInfo;
      const tokenInfoB = b.tokenInfo;
      if (tokenInfoB && !tokenInfoA) {
        return 1;
      } else if (!tokenInfoA && tokenInfoB) {
        return -1;
      } else if (!tokenInfoA && !tokenInfoB) {
        return 0;
      } else {
        if (tokenInfoA.price && tokenInfoB.price) {
          const balanceA = getTokenBalance(a.balance, tokenInfoA.decimals);
          const balanceB = getTokenBalance(b.balance, tokenInfoB.decimals);
          const priceA = balanceA * tokenInfoA.price.rate;
          const priceB = balanceB * tokenInfoB.price.rate;
          return priceB - priceA;
        } else if (!tokenInfoA.price && tokenInfoB.price) {
          return -1;
        } else if (tokenInfoA.price && !tokenInfoB.price) {
          return 1;
        } else {
          return 0;
        }
      }
    }, walletInfo.tokens),
  });
