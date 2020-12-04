import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as R from "ramda";
import { WalletReduxState } from "../models";
import {
  clearCache,
  createWallet,
  deleteWallet,
  getWalletInfo,
  updateWallet,
} from "../actions";

export const WALLET_INITIAL_STATE: WalletReduxState = {
  wallets: [],
  infos: {},
  infoRequestStates: {},
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
      infos: R.dissoc(wallet.id, state.infos),
    } as WalletReduxState),
  )
  .case(deleteWallet, (state, wallet) =>
    R.mergeRight(state, {
      wallets: R.remove(
        R.findIndex(R.propEq("id", wallet.id), state.wallets),
        1,
        state.wallets,
      ),
      infos: R.dissoc(wallet.id, state.infos),
    } as WalletReduxState),
  )
  .case(getWalletInfo.async.started, (state, { wallet }) =>
    R.mergeDeepRight(state, {
      infoRequestStates: { [wallet.id]: { error: null, isOngoing: true } },
    }),
  )
  .case(getWalletInfo.async.failed, (state, { params: { wallet }, error }) =>
    R.mergeDeepRight(state, {
      infoRequestStates: { [wallet.id]: { error, isOngoing: false } },
    }),
  )
  .case(getWalletInfo.async.done, (state, { params: { wallet }, result }) =>
    R.mergeDeepRight(state, {
      infoRequestStates: { [wallet.id]: { error: null, isOngoing: false } },
      infos: { [wallet.id]: result },
    }),
  );
