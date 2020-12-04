import axios from "axios";

export const ETHPLORER_URL = "https://api.ethplorer.io";
export const ETHPLORER_API_KEY = "EK-w5efY-b6j8UAm-1oJ3Q";
export const ETHPLORER_API = axios.create({
  baseURL: `${ETHPLORER_URL || ""}/`,
});
