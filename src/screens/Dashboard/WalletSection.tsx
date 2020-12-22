import { gql, useQuery } from "@apollo/client";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Card,
  Typography,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import {
  Column,
  EditWalletDialog,
  ErrorWithRetry,
  Row,
} from "../../components";
import { Wallet, WalletInfo } from "../../models";
import { calculateWalletMoneySum, getSortedWalletInfo } from "../../utils";
import WalletItem from "./WalletToken";

const useStyles = makeStyles({
  header: {
    alignItems: "center",
    padding: 12,
  },
  title: {
    textAlign: "left",
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

const itemProps: any = {
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
  xl: 2,
};

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
        }
      }
      tokens {
        balance
        tokenInfo {
          address
          name
          symbol
          image
          decimals
          price {
            currency
            rate
            diff
            diff7d
          }
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
  const [showEditDialog, setShowEditDialog] = useState(false);

  const classes = useStyles();

  const optionalWalletInfo = data?.walletInfo;
  const walletInfo: WalletInfo | undefined = useMemo(() => {
    if (!optionalWalletInfo) {
      return undefined;
    }
    return getSortedWalletInfo(optionalWalletInfo);
  }, [optionalWalletInfo]);

  useEffect(() => {
    refetch({ walletInfoAddress: wallet.address });
  }, [wallet.address, refetch]);

  const handleRetry = () => refetch();
  const handleEditClick = () => setShowEditDialog(true);
  const handleEditDialogClose = () => setShowEditDialog(false);

  return (
    <Column className={clsx(className, classes.container)}>
      <Row className={classes.header}>
        <Typography className={classes.title} variant="h4">
          {wallet.name}
        </Typography>
        <IconButton onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        <div style={{ flex: 1 }} />
        <Typography variant="h4" color="secondary">
          {walletInfo ? calculateWalletMoneySum(walletInfo) : ""}
        </Typography>
      </Row>
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
          <Grid item {...itemProps}>
            <Card elevation={3} className={classes.card}>
              <WalletItem ethInfo={walletInfo.ETH} />
            </Card>
          </Grid>
          {walletInfo.tokens.map((token) => (
            <Grid item {...itemProps} key={token.tokenInfo.address}>
              <Card elevation={3} className={classes.card}>
                <WalletItem tokenInfo={token} />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <EditWalletDialog
        open={showEditDialog}
        walletId={wallet.id}
        onClose={handleEditDialogClose}
      />
    </Column>
  );
}
