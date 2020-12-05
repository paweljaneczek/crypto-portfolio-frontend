import React from "react";
import { Column } from "../../components";
import { WalletTokenInfo } from "../../models";
import { getTokenBalance } from "../../utils";

type Props = {
  tokenInfo: WalletTokenInfo;
};

export default function WalletItem(props: Props) {
  const { tokenInfo } = props;

  return (
    <Column>
      {tokenInfo.tokenInfo.name} <b>{tokenInfo.tokenInfo.symbol}</b>
      <br />
      {`Balance: ${getTokenBalance(tokenInfo)}`}
      <br />
      {`Price: ${tokenInfo.tokenInfo.price?.rate ?? "?"}`}
    </Column>
  );
}
