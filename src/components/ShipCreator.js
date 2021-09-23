import * as s from "../styles/globalStyles";
import { SelectOptions } from "./SelectOption";
import { ShipViewer } from "./ShipViewer";
import { ShipStats } from "./ShipStats";
import { useState } from "react";

export function ShipCreator(props) {
  const [shipParts] = useState({
    body: { val: 0, label: "Body", maxVal: 10 },
    bodySkin: { val: 0, label: "Body Skin", maxVal: 10 },
    reactor: { val: 0, label: "Reactor", maxVal: 10 },
    reactorSkin: { val: 0, label: "Reactor Skin", maxVal: 10 },
    weapon: { val: 0, label: "Weapon", maxVal: 10 },
    weaponSkin: { val: 0, label: "Weapon Skin", maxVal: 10 },
  });
  const [shipStats, setShipStats] = useState({
    atk: { val: 0, label: "Attack", maxVal: 5000 },
    def: { val: 0, label: "Defense", maxVal: 5000 },
    speed: { val: 0, label: "Speed", maxVal: 5000 },
  });
  const [updateStat, setUpdateStat] = useState(0);

  const handlePartsChange = (key, val) => {
    shipParts[key].val = val;
    handleStatsChange(
      "atk",
      Math.floor(0 + Math.random() * shipStats["atk"].maxVal)
    );
    handleStatsChange(
      "def",
      Math.floor(0 + Math.random() * shipStats["def"].maxVal)
    );
    handleStatsChange(
      "speed",
      Math.floor(0 + Math.random() * shipStats["speed"].maxVal)
    );
    setUpdateStat(Math.random());
  };

  const handleStatsChange = (key, val) => {
    const newShipStats = shipStats;
    newShipStats[key].val = val;
    setShipStats(newShipStats);
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
          {Object.keys(shipStats).map((stat) => (
            <s.Container
              flex={1}
              ai={"center"}
              jc={"center"}
              fd={"row"}
              key={stat}
              pa={"1rem 0"}
            >
              <ShipStats
                val={shipStats[stat].val}
                label={shipStats[stat].label}
                maxVal={shipStats[stat].maxVal}
              />
            </s.Container>
          ))}
        </s.Container>
      </s.Container>
    </s.Container>
  );
}
