import { useEffect, useState } from "react";
import styled from "styled-components";

const Viewer = styled.div`
  width: 400px;
  height: 600px;
  background: white;
  color: black;
  position: relative;
  border-radius: 5%;
`;

const ShipImgPart = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ zi }) => (zi ? zi : 0)};
`;

export function ShipViewer(props) {
  useEffect(() => {
    const tabImages = [];
    Object.keys(props.parts).forEach((key) => {
      if (key === "body" || key === "reactor" || key === "weapon") {
        import(`../assets/layers/${key}/${props.parts[key].val}.png`).then(
          (image) => {
            tabImages.push(image);
          }
        );
      }
    });
  }, []);

  const getImageFromParts = (key, val) => {
    if (key === "body" || key === "reactor" || key === "weapon") {
      return require(`../assets/layers/${key}/${val}.png`);
    } else {
      return "";
    }
  };

  const getZIndex = (key) => {
    switch (key) {
      case "body":
        return 10;
      case "reactor":
        return 8;
      case "weapon":
        return 6;
    }
  };

  return (
    <Viewer>
      {Object.keys(props.parts).map((key) => (
        <div key={key}>
          <ShipImgPart
            src={getImageFromParts(key, props.parts[key].val)?.default}
            zi={getZIndex(key)}
          />
        </div>
      ))}
    </Viewer>
  );
}
