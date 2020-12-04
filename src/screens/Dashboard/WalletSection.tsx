import {
  CircularProgress,
  Grid,
  makeStyles,
  Card,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { Column, ErrorWithRetry } from "../../components";
import { RequestState, Wallet, WalletInfo } from "../../models";
import WalletItem from "./WalletToken";

const useStyles = makeStyles({
  title: {
    marginBottom: 16,
  },
  container: {
    alignItems: "stretch",
  },
  centered: {
    alignSelf: "center",
  },
  card: {
    padding: 16,
  },
});

type Props = {
  className?: string;
  wallet: Wallet;
  info?: WalletInfo;
  requestState: RequestState;
  getWalletInfo: (data: { wallet: Wallet }) => void;
};

export default function WalletSection(props: Props) {
  const { className, wallet, info, requestState, getWalletInfo } = props;

  const classes = useStyles();

  useEffect(() => {
    getWalletInfo({ wallet });
  }, [wallet, getWalletInfo]);

  const handleRetry = () => getWalletInfo({ wallet });

  return (
    <Column className={clsx(className, classes.container)}>
      <Typography className={classes.title} variant="h4">
        {wallet.name}
      </Typography>
      {!info && requestState.isOngoing && (
        <CircularProgress className={classes.centered} />
      )}
      {!info && requestState.error && (
        <ErrorWithRetry
          className={classes.centered}
          message="Could not fetch data. Please Retry."
          onRetry={handleRetry}
        />
      )}
      {info && (
        <Grid container spacing={2}>
          {info.tokens.map((token) => (
            <Grid item xs={12} md={4} xl={3} key={token.tokenInfo.address}>
              <Card elevation={3} className={classes.card}>
                <WalletItem tokenInfo={token} />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Column>
  );
}
