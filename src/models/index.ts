import { WalletReduxState } from "./wallet";

export * from "./wallet";
export * from "./utils";

export const CLEAR_STORE = "CLEAR_STORE";

export interface Store {
  wallet: WalletReduxState;
}
