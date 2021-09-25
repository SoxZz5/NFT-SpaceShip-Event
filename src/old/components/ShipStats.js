import { useEffect, useState } from "react";
import * as s from "../styles/globalStyles";
export function ShipStats(props) {
  const [val, setVal] = useState(props.val);

  useEffect(() => {
    setVal(props.val);
  }, [props.val]);

  return (
    <s.Container flex={1} ai={"center"} jc={"start"} fd={"column"}>
      {props.label} => {val} / {props.maxVal}
    </s.Container>
  );
}
