import styled from "styled-components";

const Viewer = styled.div`
  width: 600px;
  height: 600px;
  background: white;
  color: black;
`;

export function ShipViewer(props) {
  return (
    <Viewer>
      <span>
        <p>Created ship code will be something like</p>
        <br></br>
        <p>
          ipfs://CID/{props.parts.body.val}-{props.parts.bodySkin.val}_
          {props.parts.reactor.val}-{props.parts.reactorSkin.val}_
          {props.parts.weapon.val}-{props.parts.weaponSkin.val}
        </p>
      </span>
    </Viewer>
  );
}
