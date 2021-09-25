import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { ShipCreator } from "./components/ShipCreator";

export const StyledButton = styled.button`
  padding: 8px;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [userShips, setUserShips] = useState([]);

  const startMinting = ({ shipStat, shipParts }) => {
    setLoading(true);
    const mintableSpaceship = createMintableSpaceShip({ shipStat, shipParts });
    mintSpaceShip(mintableSpaceship);
  };

  const mintSpaceShip = (ship) => {
    blockchain.smartContract.methods
      .mintSpaceShip(blockchain.account, ship)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        setStatus("Error");
      })
      .then((receipt) => {
        console.log(receipt);
        setLoading(false);
        dispatch(fetchData(blockchain.account));
        setStatus("Successfully minting your NFT");
        setTimeout(() => {
          setStatus("");
          getMyShips();
        }, 2000);
      });
  };

  const createMintableSpaceShip = ({ shipStat, shipParts }) => {
    const parts = Object.keys(shipParts).map((key) => shipParts[key].val);
    const stats = Object.keys(shipStat).map((key) => shipStat[key].val);
    return ["0", stats, parts, false];
  };

  const getMyShips = async () => {
    const res = await blockchain.smartContract.methods.totalShips().call();
    let shipArray = [];
    for (let i = 0; i < res; i++) {
      const owner = await blockchain.smartContract.methods.ownerOf(i).call();
      if (owner === blockchain.account) {
        const ship = mapToShip(
          await blockchain.smartContract.methods.getShip(i).call()
        );
        ship.uri = await blockchain.smartContract.methods.tokenURI(i).call();
        shipArray.push(ship);
      }
    }
    setUserShips(shipArray);
  };

  const mapToShip = (ship) => {
    return {
      id: ship[0],
      stats: {
        atk: ship[1][0],
        def: ship[1][1],
        speed: ship[1][2],
      },
      parts: {
        body: ship[2][0],
        bodySkin: ship[2][1],
        reactor: ship[2][2],
        reactorSkin: ship[2][3],
        weapon: ship[2][4],
        weaponSkin: ship[2][5],
      },
      isDestroyed: ship[3],
    };
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      getMyShips();
    }
  }, [blockchain.smartContract, dispatch]);

  return (
    <s.Screen>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the Blockchain</s.TextTitle>
          <s.SpacerSmall />
          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </StyledButton>
          <s.SpacerSmall />
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
          <s.TextTitleBlock style={{ textAlign: "left" }}>
            <p>BlockChain Account: {blockchain.account}</p>
            <br></br>
            <p>BlockChain Name: {data.name}</p>
            <br></br>
            <p>Contract Addr: {blockchain.smartContract._address}</p>
          </s.TextTitleBlock>
          <s.SpacerLarge />
          <ShipCreator onMint={startMinting} />
          {loading ? (
            <>
              <s.SpacerSmall />
              <s.TextDescription style={{ textAlign: "center" }}>
                loading...
              </s.TextDescription>
            </>
          ) : status !== "" ? (
            <s.TextDescription style={{ textAlign: "center" }}>
              {status}
            </s.TextDescription>
          ) : (
            <s.Container style={{ padding: 16 }} key={userShips.length}>
              {userShips.length > 0
                ? userShips.map((ship) => (
                    <div key={ship.id}>
                      <span>
                        {ship.id} -> {ship.uri}
                      </span>
                      <br></br>
                      Stat = [ atk: {ship.stats.atk} / def: {ship.stats.def} /
                      speed: {ship.stats.speed} ]<br></br>
                      Parts = [ body: {ship.parts.body} / bodySkin:{" "}
                      {ship.parts.bodySkin} / reactor: {ship.parts.reactor} /
                      reactorSkin: {ship.parts.reactorSkin} / weapon:{" "}
                      {ship.parts.weapon} / weaponSkin: {ship.parts.weaponSkin}]
                      <br></br>
                      isDestroyed: {ship.isDestroyed ? "Yes" : "No"}
                      <br></br>
                      <br></br>
                    </div>
                  ))
                : null}
            </s.Container>
          )}
        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
