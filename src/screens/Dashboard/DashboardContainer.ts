import { connect } from "react-redux";
import { selectWallets } from "../../selectors";
import { Store } from "../../models";
import Dashboard from "./Dashboard";

const select = (store: Store) => {
  return {
    wallets: selectWallets(store),
  };
};

export default connect(select)(Dashboard);
