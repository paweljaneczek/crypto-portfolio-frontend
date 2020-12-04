import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { ColumnContainer, EditWalletDialog } from "../../components";
import { Wallet } from "../../models";
import wallet from "../../reducers/wallet";

const useStyles = makeStyles({
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "stretch",
  },
});

type Props = {
  wallets: Wallet[];
};

export default function Dashboard(props: Props) {
  const { wallets } = props;

  const classes = useStyles();
  const [editWallet, setEditWallet] = useState<Wallet | null | undefined>(
    undefined,
  );

  const handleAddWallet = () => setEditWallet(null);
  const handleCloseEditWalletDialog = () => setEditWallet(undefined);

  const content =
    wallets.length === 0 ? (
      <ColumnContainer className={classes.emptyContainer}>
        <Typography variant="h5" gutterBottom>
          Please first add new Ethereum wallet address.
        </Typography>
        <Button variant="outlined" onClick={handleAddWallet}>
          Create New Wallet
        </Button>
      </ColumnContainer>
    ) : (
      <ColumnContainer className={classes.container}>
        {wallets.map(wallet => )}
      </ColumnContainer>
    );
  return (
    <>
      {content}
      <EditWalletDialog
        open={editWallet !== undefined}
        walletId={editWallet?.id}
        onClose={handleCloseEditWalletDialog}
      />
    </>
  );
}
