import { gql, useQuery } from "@apollo/client";
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

const WALLET_INFO = gql`
  query Query($walletInfoAddress: String) {
    walletInfo(address: $walletInfoAddress) {
      countTxs
      ETH {
        balance
        price {
          currency
          diff
          diff7d
          rate
          ts
        }
      }
      tokens {
        balance
        tokenInfo {
          address
          name
        }
      }
    }
  }
`;

type Props = {
  className?: string;
  wallet: Wallet;
};

export default function WalletSection(props: Props) {
  const { className, wallet } = props;
  const { loading, error, data, refetch } = useQuery(WALLET_INFO, {
    variables: { walletInfoAddress: wallet.address },
  });

  console.log("DUPA", loading, error, data);

  const classes = useStyles();

  const walletInfo: WalletInfo | undefined = data?.walletInfo;

  const handleRetry = () => refetch();

  return (
    <Column className={clsx(className, classes.container)}>
      <Typography className={classes.title} variant="h4">
        {wallet.name}
      </Typography>
      {!walletInfo && loading && (
        <CircularProgress className={classes.centered} />
      )}
      {!walletInfo && error && (
        <ErrorWithRetry
          className={classes.centered}
          message="Could not fetch data. Please Retry."
          onRetry={handleRetry}
        />
      )}
      {walletInfo && (
        <Grid container spacing={2}>
          {walletInfo.tokens.map((token) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              xl={1}
              key={token.tokenInfo.address}
            >
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
