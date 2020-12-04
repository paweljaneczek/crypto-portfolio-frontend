import React from "react";
import { Column } from "../../components";
import { WalletTokenInfo } from "../../models";

type Props = {
  tokenInfo: WalletTokenInfo;
};

export default function WalletItem(props: Props) {
  const { tokenInfo } = props;

  return (
    <Column>
      {tokenInfo.tokenInfo.name} <b>{tokenInfo.tokenInfo.symbol}</b>
      <br />
      {`Balance: ${tokenInfo.balance}`}
      <br />
      {`Price: ${tokenInfo.tokenInfo.price?.rate ?? "?"}`}
    </Column>
  );
}
