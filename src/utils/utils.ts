import * as sha3 from "js-sha3";

const development: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export function isDev(): boolean {
  return development;
}

export const isEthAddress = (address: string) => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    // If it's all small caps or all all caps, return true
    return true;
  } else {
    // Otherwise check each case
    return isChecksumAddress(address);
  }
};

export const isChecksumAddress = (address: string) => {
  // Check each case
  address = address.replace("0x", "");
  var addressHash = sha3.keccak256(address.toLowerCase());
  for (var i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }
  return true;
};

const CURRENCY_SYMBOL_MAP: { [key: string]: string } = {
  USD: "$",
};

export const formatPrice = (price?: number, currency?: string) => {
  const symbol = CURRENCY_SYMBOL_MAP[currency || "USD"];
  if (!price) {
    return `${symbol}?`;
  }
  const length = (Math.log(Math.round(1 / price)) * Math.LOG10E + 1) | 0;
  return `${symbol}${price.toFixed(2 + Math.max(0, length - 1))}`;
};
