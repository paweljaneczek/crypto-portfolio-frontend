import { combineReducers } from "redux";
import wallet from "./wallet";
import { CLEAR_STORE, Store } from "../models";

const reducers = combineReducers({
  wallet,
});

export default function createReducers(state: Store | undefined, action: any) {
  if (action.type === CLEAR_STORE) {
    state = undefined;
  }

  return reducers(state, action as any);
}
