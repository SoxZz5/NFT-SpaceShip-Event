import Web3 from "web3";
import SpaceShipEventContract from "../../../contracts/SpaceShipEventContract.json";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload: any) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload,
  };
};

const connectFailed = (payload: any) => {
  return {
    type: "CONNECTION_FAILED",
    payload,
  };
};

const updateAccountRequest = (payload: any) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload,
  };
};

const getWeb3 = (): Web3 | null => {
  if ((window as any).ethereum) {
    return new Web3((window as any).ethereum);
  }
  return null;
};

export const connect = () => {
  return async (dispatch: any) => {
    dispatch(connectRequest());
    const web3: any = getWeb3();
    if (!web3) dispatch(connectFailed("Install Metamask to connect"));
    try {
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const networkData = await (SpaceShipEventContract.networks as any)[
        networkId
      ];
      if (!networkData) dispatch(connectFailed("Change network to Polygon."));
      const contractObj = new web3.eth.Contract(
        SpaceShipEventContract.abi,
        networkData.address
      );
      dispatch(
        connectSuccess({
          account: accounts[0],
          smartContract: contractObj,
          web3: web3,
        })
      );
      (window as any).ethereum.on("accountsChanged", (accounts: any) => {
        dispatch(updateAccount(accounts[0]));
      });
      (window as any).ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    } catch (err: any) {
      dispatch(connectFailed(`Something went wrong. -> ${err.message}`));
    }
  };
};

export const updateAccount = (account: string) => {
  return async (dispatch: any) => {
    dispatch(updateAccountRequest({ account }));
  };
};
