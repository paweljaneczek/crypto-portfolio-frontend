import { connect } from "react-redux";
import {
  selectWalletInfo,
  selectWalletInfoRequestState,
} from "../../selectors";
import { createInitialRequestState, Store, Wallet } from "../../models";
import { getWalletInfo } from "../../actions";
import WalletSection from "./WalletSection";

type OwnProps = {
  wallet: Wallet;
};

const select = (store: Store, props: OwnProps) => {
  const walletId = props.wallet.id;
  return {
    info: selectWalletInfo(store, walletId),
    requestState:
      selectWalletInfoRequestState(store, walletId) ||
      createInitialRequestState(),
  };
};

const actions = {
  getWalletInfo,
};

export default connect(select, actions)(WalletSection);
