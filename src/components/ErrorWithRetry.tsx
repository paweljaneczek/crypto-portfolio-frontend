import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";
import { Column } from "./containers";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
  },
  retry: {
    marginTop: 16,
  },
});

type Props = {
  className?: string;
  message: string;
  onRetry: () => void;
};

export default function ErrorWithRetry(props: Props) {
  const { className, message, onRetry } = props;

  const classes = useStyles();

  return (
    <Column className={clsx(className, classes.container)}>
      <Typography variant="body1">{message}</Typography>
      <Button className={classes.retry} variant="contained" onClick={onRetry}>
        Retry
      </Button>
    </Column>
  );
}
