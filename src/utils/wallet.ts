import { v4 as uuidv4 } from "uuid";
import { Wallet } from "../models";

export const createInitialWallet = (): Wallet => ({
  id: uuidv4(),
  address: "",
  name: "",
});
