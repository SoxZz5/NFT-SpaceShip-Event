import styled from "styled-components";
import { colors, textColors } from "assets/styles/variables";

interface INavBlock {
  flex?: number;
  jc?: string;
  ai?: string;
}

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: ${colors.primary};
  height: 5rem;
  color: ${textColors.primary};
  align-items: center;
  padding: 0.5rem 4rem;
  box-sizing: border-box;
`;

export const NavBlock = styled.div`
  display: flex;
  flex: direction: row;
  flex: ${(props: INavBlock) => (props.flex ? props.flex : 0)};
  justify-content: ${(props: INavBlock) => (props.jc ? props.jc : "start")};
  align-items: ${(props: INavBlock) => (props.ai ? props.ai : "start")};
`;
