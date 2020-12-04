import { AxiosResponse } from "axios";
import { WalletInfo } from "../models";
import { ETHPLORER_API, ETHPLORER_API_KEY } from "./creators";

export const getAddressInfo = (
  address: string,
): Promise<AxiosResponse<WalletInfo>> => {
  return ETHPLORER_API.get(
    `getAddressInfo/${address}?apiKey=${ETHPLORER_API_KEY}`,
  );
};
