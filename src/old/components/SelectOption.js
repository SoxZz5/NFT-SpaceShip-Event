import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/fontawesome-free-solid";
import * as s from "../styles/globalStyles";
import { useState, useEffect } from "react";

fontawesome.library.add(faArrowLeft, faArrowRight);

export function SelectOptions(props) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    setVal(props.val);
  }, []);

  const prevClick = () => {
    if (val - 1 < 0) {
      setVal(0);
      props.onChange(props.partKey, 0);
    } else {
      setVal(val - 1);
      props.onChange(props.partKey, val - 1);
    }
  };

  const nextClick = () => {
    if (val + 1 > props.maxVal) {
      setVal(props.maxVal);
      props.onChange(props.partKey, props.maxVal);
    } else {
      setVal(val + 1);
      props.onChange(props.partKey, val + 1);
    }
  };

  return (
    <s.Container flex={1} ai={"center"} jc={"center"} fd={"column"}>
      <s.Container flex={1} ai={"center"} jc={"space-between"} fd={"row"}>
        <div onClick={() => prevClick()}>
          <FontAwesomeIcon icon="arrow-left" />
        </div>
        <span>{val}</span>
        <div onClick={() => nextClick()}>
          <FontAwesomeIcon icon="arrow-right" />
        </div>
      </s.Container>
      <s.Container
        flex={1}
        ai={"center"}
        jc={"center"}
        fd={"row"}
        ma={"0.5rem 0 0 0"}
      >
        {props.label}
      </s.Container>
    </s.Container>
  );
}
