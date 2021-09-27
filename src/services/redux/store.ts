import {
  ThunkAction,
  Action,
  combineReducers,
  compose,
  applyMiddleware,
  StoreEnhancer,
  createStore,
} from "@reduxjs/toolkit";
import thunk, { ThunkMiddleware } from "redux-thunk";
import blockchainReducer from "./blockchain/blockchain.reducer";

const rootReducer: any = combineReducers({
  blockchain: blockchainReducer,
});

const middleware: ThunkMiddleware[] = [thunk];

const composeEhancers: StoreEnhancer = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEhancers);
};

const store = configureStore();
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
