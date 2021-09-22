import * as s from "../styles/globalStyles";
import { useState } from "react";

export function ShipStats(props) {
  const [state, setState] = useState({
    atk: { val: 0, label: "Attack", maxVal: 5000 },
    def: { val: 0, label: "Defense", maxVal: 5000 },
    speed: { val: 0, label: "Speed", maxVal: 5000 },
  });
  return (
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
          {state[part].label} -> {state[part].val}/{state[part].maxVal}
        </s.Container>
      ))}
    </s.Container>
  );
}
