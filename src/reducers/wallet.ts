import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as R from "ramda";
import { WalletReduxState } from "../models";
import {
  clearCache,
  createWallet,
  deleteWallet,
  updateWallet,
} from "../actions";

export const WALLET_INITIAL_STATE: WalletReduxState = {
  wallets: [],
};

export default reducerWithInitialState(WALLET_INITIAL_STATE)
  .case(clearCache, (state) =>
    R.mergeRight(state, {
      infoRequestStates: {},
    }),
  )
  .case(createWallet, (state, wallet) =>
    R.mergeRight(state, { wallets: [...state.wallets, wallet] }),
  )
  .case(updateWallet, (state, wallet) =>
    R.mergeRight(state, {
      wallets: R.update(
        R.findIndex(R.propEq("id", wallet.id), state.wallets),
        wallet,
        state.wallets,
      ),
    } as WalletReduxState),
  )
  .case(deleteWallet, (state, wallet) =>
    R.mergeRight(state, {
      wallets: R.remove(
        R.findIndex(R.propEq("id", wallet.id), state.wallets),
        1,
        state.wallets,
      ),
    } as WalletReduxState),
  );
