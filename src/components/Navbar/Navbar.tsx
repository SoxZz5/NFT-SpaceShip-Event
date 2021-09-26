import INav from "interfaces/nav.interface";
import React from "react";
import { Link } from "react-router-dom";
import * as s from "./Navbar.styles";

const NavBar: React.FunctionComponent<INav> = (props) => {
  return (
    <s.Nav>
      {props.routes.map((route) => (
        <Link to={route.path} key={route.name}>
          {route.name}
        </Link>
      ))}
    </s.Nav>
  );
};

export default NavBar;
