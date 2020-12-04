import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App";
import configureStore from "./utils/configureStore";
import reportWebVitals from "./reportWebVitals";
import { clearAllErrors } from "./actions";
import { isDev } from "./utils";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const { store, persistor } = configureStore();

// if you want to clear peristor uncomment
persistor.purge();

const onBeforeLift = () => {
  clearAllErrors(store.dispatch);
};

const THEME = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
      onBeforeLift={onBeforeLift}
    >
      <MuiThemeProvider theme={THEME}>
        <>
          <CssBaseline />
          <App />
        </>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (isDev()) {
  reportWebVitals(console.log);
} else {
  reportWebVitals();
}
