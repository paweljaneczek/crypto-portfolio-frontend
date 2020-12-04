import React, { useEffect } from "react";
import * as R from "ramda";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Wallet } from "../../models";
import { createInitialWallet, isEthAddress } from "../../utils";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";

type WalletForm = {
  name: string;
  address: string;
};

const useStyles = makeStyles({
  item: {
    marginTop: 16,
    marginBottom: 16,
  },
});

type Props = {
  open: boolean;
  wallet?: Wallet;
  createWallet: (wallet: Wallet) => void;
  updateWallet: (wallet: Wallet) => void;
  onClose: () => void;
};

export default function EditWalletDialog(props: Props) {
  const { open, wallet, createWallet, updateWallet, onClose } = props;

  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm<WalletForm>();

  useEffect(() => {
    if (wallet) {
      reset(wallet);
    } else {
      reset();
    }
  }, [wallet, reset]);

  const onSubmit = (data: WalletForm) => {
    if (wallet) {
      updateWallet(R.mergeRight(wallet, data));
    } else {
      createWallet(R.mergeRight(createInitialWallet(), data));
    }
    onClose();
  };

  const title = wallet ? "Edit Wallet" : "Add Wallet";
  const actionTitle = wallet ? "Save" : "Add";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            fullWidth
            name="name"
            error={!!errors.name}
            inputRef={register({ required: true })}
          />
          <TextField
            className={classes.item}
            autoFocus
            label="Address"
            fullWidth
            placeholder="0x..."
            name="address"
            error={!!errors.address}
            inputRef={register({
              required: true,
              validate: (value) => isEthAddress(value),
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {actionTitle}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
