import { connect } from "react-redux";
import { selectWallet } from "../../selectors";
import { Store } from "../../models";
import { createWallet, updateWallet } from "../../actions";
import EditWalletDialog from "./EditWalletDialog";

type OwnProps = {
  walletId?: string;
};

const select = (store: Store, props: OwnProps) => {
  const { walletId } = props;
  return {
    wallet: walletId ? selectWallet(store, walletId) : undefined,
  };
};

const actions = {
  createWallet,
  updateWallet,
};

export default connect(select, actions)(EditWalletDialog);
