import INav from "interfaces/nav.interface";
import React from "react";
import { Link } from "react-router-dom";
import * as s from "./Navbar.styles";

const NavBar: React.FunctionComponent<INav> = (props) => {
  return (
    <s.Nav>
      <s.NavBlock flex={1}>
        <img className="AppLogo" alt="app logo" />
      </s.NavBlock>
      <s.NavBlock flex={1} jc={"center"}>
        {props.routes.map((route) => (
          <Link to={route.path} key={route.name}>
            {route.name}
          </Link>
        ))}
      </s.NavBlock>
      <s.NavBlock flex={1} jc={"end"}>
        HERE GOES LOGIN AND LANG CHANGER
      </s.NavBlock>
    </s.Nav>
  );
};

export default NavBar;
