import * as s from "../styles/globalStyles";
import { SelectOptions } from "./SelectOption";
import { ShipViewer } from "./ShipViewer";
import { ShipStats } from "./ShipStats";
import { useState } from "react";

export function ShipCreator(props) {
  const [state, setState] = useState({
    body: { val: 0, label: "Body", maxVal: 10 },
    bodySkin: { val: 0, label: "Body Skin", maxVal: 10 },
    reactor: { val: 0, label: "Reactor", maxVal: 10 },
    reactorPart: { val: 0, label: "Reactor Skin", maxVal: 10 },
    weapon: { val: 0, label: "Weapon", maxVal: 10 },
    weaponPart: { val: 0, label: "Weapon Skin", maxVal: 10 },
  });
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
          {Object.keys(state).map((part) => (
            <s.Container
              flex={1}
              ai={"center"}
              jc={"center"}
              fd={"row"}
              key={part}
              pa={"1rem 0"}
            >
              <SelectOptions
                val={state[part].val}
                label={state[part].label}
                maxVal={state[part].maxVal}
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
          <ShipViewer />
        </s.Container>
        <s.Container flex={1} ai={"center"} jc={"start"} fd={"column"}>
          <ShipStats />
        </s.Container>
      </s.Container>
    </s.Container>
  );
}
