import * as s from "../styles/globalStyles";
import { SelectOptions } from "./SelectOption";
import { ShipViewer } from "./ShipViewer";
import { ShipStats } from "./ShipStats";
import { useState } from "react";
import layersConf from "../assets/layers/layers.json";

export function ShipCreator(props) {
  const [shipParts] = useState({
    body: { val: 0, label: "Body", maxVal: layersConf.maxBody - 1 },
    bodySkin: {
      val: 0,
      label: "Body Skin",
      maxVal: layersConf.maxBodySkin - 1,
    },
    reactor: { val: 0, label: "Reactor", maxVal: layersConf.maxReactor - 1 },
    reactorSkin: {
      val: 0,
      label: "Reactor Skin",
      maxVal: layersConf.maxReactorSkin - 1,
    },
    weapon: { val: 0, label: "Weapon", maxVal: layersConf.maxWeapon - 1 },
    weaponSkin: {
      val: 0,
      label: "Weapon Skin",
      maxVal: layersConf.maxWeaponSkin - 1,
    },
  });
  const [shipStat, setShipStat] = useState({
    atk: { val: 0, label: "Attack", maxVal: 5000 },
    def: { val: 0, label: "Defense", maxVal: 5000 },
    speed: { val: 0, label: "Speed", maxVal: 5000 },
  });
  const [updateStat, setUpdateStat] = useState(0);

  const handlePartsChange = (key, val) => {
    shipParts[key].val = val;
    handleStatsChange(
      "atk",
      Math.floor(0 + Math.random() * shipStat["atk"].maxVal)
    );
    handleStatsChange(
      "def",
      Math.floor(0 + Math.random() * shipStat["def"].maxVal)
    );
    handleStatsChange(
      "speed",
      Math.floor(0 + Math.random() * shipStat["speed"].maxVal)
    );
    setUpdateStat(Math.random());
  };

  const handleStatsChange = (key, val) => {
    const newShipStats = shipStat;
    newShipStats[key].val = val;
    setShipStat(newShipStats);
  };

  return (
    <s.Container
      flex={1}
      ai={"center"}
      jc={"center"}
      fd={"column"}
      style={{ padding: 24 }}
    >
      <s.TextTitle style={{ textAlign: "center" }}>
        Create Your Own Space Ship !
      </s.TextTitle>
      <s.Container
        flex={1}
        ai={"center"}
        jc={"center"}
        fd={"row"}
        ma={"2rem 0 0 0"}
      >
        <s.Container flex={1} ai={"center"} jc={"start"} fd={"column"}>
          {Object.keys(shipParts).map((part) => (
            <s.Container
              flex={1}
              ai={"center"}
              jc={"center"}
              fd={"row"}
              key={part}
              pa={"1rem 0"}
            >
              <SelectOptions
                partKey={part}
                val={shipParts[part].val}
                label={shipParts[part].label}
                maxVal={shipParts[part].maxVal}
                onChange={handlePartsChange}
              />
            </s.Container>
          ))}
        </s.Container>
        <s.Container
          flex={2}
          ai={"center"}
          jc={"start"}
          fd={"column"}
          ma={"0 4rem"}
        >
          <ShipViewer parts={shipParts} key={updateStat} />
        </s.Container>
        <s.Container
          flex={1}
          ai={"center"}
          jc={"start"}
          fd={"column"}
          key={updateStat}
        >
          {Object.keys(shipStat).map((stat) => (
            <s.Container
              flex={1}
              ai={"center"}
              jc={"center"}
              fd={"row"}
              key={stat}
              pa={"1rem 0"}
            >
              <ShipStats
                val={shipStat[stat].val}
                label={shipStat[stat].label}
                maxVal={shipStat[stat].maxVal}
              />
            </s.Container>
          ))}
        </s.Container>
      </s.Container>
      <s.Button onClick={() => props.onMint({ shipStat, shipParts })}>
        Mint my ship
      </s.Button>
    </s.Container>
  );
}
