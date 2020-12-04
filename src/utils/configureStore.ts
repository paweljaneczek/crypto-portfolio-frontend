import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import rootReducer from "../reducers";
import { isDev } from "./utils";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    isDev() ? applyMiddleware(thunk, logger) : applyMiddleware(thunk),
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
