/*
 * @Author: Booble 
 * @Date: 2021-05-Tu 08:33:26 
 * @Last Modified by:   Booble 
 * @Last Modified time: 2021-05-Tu 08:33:26 
 */
import { createStore, applyMiddleware, compose  } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import reducer from './reducers/index'
const persistConfig = {
  key: "root",
  storage: storage,
};
const myPersistReducer = persistReducer(persistConfig, reducer);
const store = createStore(
  myPersistReducer,
  //applyMiddleware(thunk),
  process.env.NODE_ENV === "development"?window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__():compose
);
export const persistor = persistStore(store);
export default store;