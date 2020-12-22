import React from "react";
import HelpIcon from "@material-ui/icons/Help";
import { Column, Row } from "../../components";
import { WalletEthInfo, WalletTokenInfo } from "../../models";
import {
  formatPrice,
  getRoundedTokenBalance,
  getTokenBalance,
} from "../../utils";
import { ReactComponent as EthImage } from "../../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import { makeStyles, Typography } from "@material-ui/core";

type StyleProps = {
  priceType24h: "higher" | "lower" | "unknown";
  priceType7d: "higher" | "lower" | "unknown";
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    alignItems: "center",
  },
  image: {
    width: 32,
    height: 32,
    marginBottom: 12,
    marginTop: 8,
  },
  infoRow: {
    alignSelf: "stretch",
  },
  infoLeftRowItem: {
    flex: 1,
    alignItems: "flex-start",
  },
  infoRightRowItem: {
    flex: 1,
    alignItems: "flex-end",
  },
  priceChangeLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "flex-start",
  },
  priceChangeRight: {
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "flex-end",
  },
  price24hChange: {
    color: (props: StyleProps) =>
      props.priceType24h === "higher"
        ? theme.palette.success.main
        : props.priceType24h === "lower"
        ? theme.palette.error.main
        : theme.palette.grey[500],
  },
  price7dChange: {
    color: (props: StyleProps) =>
      props.priceType7d === "higher"
        ? theme.palette.success.main
        : props.priceType7d === "lower"
        ? theme.palette.error.main
        : theme.palette.grey[500],
  },
}));

type Props = {
  tokenInfo?: WalletTokenInfo;
  ethInfo?: WalletEthInfo;
};

export default function WalletItem(props: Props) {
  const { ethInfo, tokenInfo } = props;

  const priceChange24h =
    ethInfo?.price.diff || tokenInfo?.tokenInfo?.price?.diff;
  const priceChange7d =
    ethInfo?.price.diff7d || tokenInfo?.tokenInfo?.price?.diff7d;

  const classes = useStyles({
    priceType24h: priceChange24h
      ? priceChange24h > 0
        ? "higher"
        : "lower"
      : "unknown",
    priceType7d: priceChange7d
      ? priceChange7d > 0
        ? "higher"
        : "lower"
      : "unknown",
  });

  const tokenInfoImage = tokenInfo?.tokenInfo.image;
  const Icon = ethInfo ? (
    <EthImage className={classes.image} />
  ) : tokenInfoImage ? (
    <img src={tokenInfoImage} className={classes.image} alt={"Token"} />
  ) : (
    <HelpIcon className={classes.image} />
  );
  const symbol = ethInfo ? "ETH" : tokenInfo?.tokenInfo.symbol || "";
  const name = ethInfo ? "Ethereum" : tokenInfo?.tokenInfo.name || "";
  const price = ethInfo?.price.rate || tokenInfo?.tokenInfo?.price?.rate;
  const balance =
    (ethInfo && getTokenBalance(ethInfo.balance, undefined)) ||
    (tokenInfo &&
      getTokenBalance(tokenInfo.balance, tokenInfo.tokenInfo.decimals));
  const currency =
    ethInfo?.price.currency || tokenInfo?.tokenInfo?.price?.currency;

  return (
    <Column className={classes.container}>
      {Icon}
      <Typography variant="h6">{symbol}</Typography>
      <Typography variant="subtitle1">{name}</Typography>
      <Row className={classes.infoRow}>
        <Column className={classes.infoLeftRowItem}>
          <Typography variant="caption">Price</Typography>
          <Typography variant="body1">
            {formatPrice(price, currency)}
          </Typography>
        </Column>
        <Column className={classes.infoRightRowItem}>
          <Typography variant="caption">Holdings</Typography>
          <Typography variant="body1">
            {formatPrice(
              price && balance ? price * balance : undefined,
              currency,
            )}
          </Typography>
        </Column>
      </Row>
      <Column>
        <Typography variant="caption">Balance</Typography>
        <Typography variant="body1">
          {balance ? getRoundedTokenBalance(balance, price) : "?"}
        </Typography>
      </Column>
      <Column className={classes.priceChangeLeft}>
        <Typography variant="caption">24h</Typography>
        <Typography variant="body1" className={classes.price24hChange}>
          {`${priceChange24h}%`}
        </Typography>
      </Column>
      <Column className={classes.priceChangeRight}>
        <Typography variant="caption">7d</Typography>
        <Typography variant="body1" className={classes.price7dChange}>
          {`${priceChange7d}%`}
        </Typography>
      </Column>
    </Column>
  );
}
