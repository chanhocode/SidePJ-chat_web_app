import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./redux/reducers";
import "bootstrap/dist/css/bootstrap.min.css";

// Comment:: 리덕스는 객체만 받을 수 있으므로 함수랑 프로미스도 받기 위해 미들웨어 사용.
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
        // Comment :: Extension 사용을 위해 추가.
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>
);
