import Web3 from "web3";
import SpaceShipEventContract from "contracts/SpaceShipEventContract.json";
import { PayloadAction } from "@reduxjs/toolkit";

export interface BlockchainState {
  account?: string;
  loading: boolean;
  contract?: typeof SpaceShipEventContract | null;
  web3?: Web3 | null;
  status: "connected" | "disconnected" | "error";
  error: string;
}

const initialState: BlockchainState = {
  account: "",
  loading: false,
  contract: null,
  web3: null,
  status: "disconnected",
  error: "",
};

const blockchainReducer = (
  state = initialState,
  action: PayloadAction<any>
): BlockchainState => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        contract: action.payload.smartContract,
        web3: action.payload.web3,
        status: "connected",
        error: "",
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        error: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
