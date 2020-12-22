import { RequestState } from "./utils";

export type Wallet = {
  id: string;
  name: string;
  address: string;
};

export type WalletEthInfo = {
  balance: number;
  price: {
    currency: string;
    rate: number;
    diff: number;
    diff7d: number;
    ts: number;
  };
};

export type WalletTokenInfo = {
  balance: number;
  tokenInfo: {
    address: string;
    name: string;
    decimals?: string;
    symbol?: string;
    totalSupply: string;
    owner: string;
    holdersCount: number;
    image?: string;
    website?: string;
    telegram?: string;
    twitter?: string;
    coingecko?: string;
    price: {
      rate: number;
      diff: number;
      diff7d: number;
      ts: number;
      currency: string;
    } | null;
    publicTags: string[];
  };
};

export type WalletInfo = {
  ts: number;
  ETH: WalletEthInfo;
  countTxs: number;
  tokens: WalletTokenInfo[];
};

export interface WalletReduxState {
  wallets: Wallet[];
}
