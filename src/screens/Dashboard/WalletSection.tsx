import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Column } from "../../components";
import { Wallet } from "../../models";

const useStyles = makeStyles({
  container: {
    alignItems: "stretch",
  },
});

type Props = {
  wallet: Wallet;
};

export default function WalletSection(props: Props) {
  const { wallet } = props;

  const classes = useStyles();

  return <Column className={classes.container}>
    <Typography variant="h4">
      {wallet.name}
    </Typography>
    <Grid container spacing={2}>
      <Grid item>

      </Grid>
    </Grid>
  </Column>;
}
