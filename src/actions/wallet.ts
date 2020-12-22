import { Wallet } from "../models";
import { create } from "./creators";

export const createWallet = create<Wallet>("CREATE_WALLET");
export const deleteWallet = create<Wallet>("DELETE_WALLET");
export const updateWallet = create<Wallet>("UPDATE_WALLET");
