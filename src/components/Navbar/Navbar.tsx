import {
  Anchor,
  Box,
  Header,
  Image,
  Nav,
  ResponsiveContext,
  Menu,
  Button,
  Spinner,
} from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  connect,
  updateAccount,
} from "services/redux/blockchain/blockchain.action";

const NavBar: React.FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state: any) => state.blockchain);
  const anchors: any[] = [
    { label: "About", href: "#" },
    { label: "Collection", href: "#" },
    { label: "Event", href: "#" },
    { label: "Roadmap", href: "#" },
  ];

  useEffect(() => {
    if (!isConnected) {
      dispatch(updateAccount(blockchain.account));
    }
  }, [blockchain.contract, dispatch]);

  const isConnected = (): boolean => {
    return (
      blockchain.account &&
      blockchain.contract &&
      blockchain.status === "connected"
    );
  };

  return (
    <ResponsiveContext.Consumer>
      {(size) =>
        size === "small" ? (
          <Header
            background="brand"
            pad={{ vertical: "1rem", horizontal: "2rem" }}
            height="xsmall"
            elevation="large"
          >
            <Box height="xsmall" width="xsmall">
              <Image
                src={require("../../assets/images/logo.png").default}
                fit="cover"
              />
            </Box>
            <Box justify="end" align="center">
              <Button primary label="Connect Wallet" active />
              <Menu
                a11yTitle="Navigation Menu"
                dropProps={{ align: { top: "bottom", right: "right" } }}
                icon={<MenuIcon color="accent-1" />}
                items={anchors}
              />
            </Box>
          </Header>
        ) : (
          <Header
            background="brand"
            pad={{ vertical: "2rem", horizontal: "5rem" }}
            height="xsmall"
            elevation="large"
          >
            <Box height="xsmall" width="xsmall">
              <Image
                src={require("../../assets/images/logo.png").default}
                fit="cover"
              />
            </Box>
            <Box justify="between" direction="row" align="center">
              <Nav direction="row">
                {anchors.map((anchor) => (
                  <Anchor
                    label={anchor.label}
                    href={anchor.href}
                    key={anchor.label}
                  />
                ))}
                {isConnected() ? <Link to="/home">My dashboard</Link> : null}
              </Nav>
              {isConnected() ? (
                <Button
                  primary
                  label={`Disconnect ${blockchain.account.slice(0, 10)}...`}
                  active
                  margin={{ left: "2rem" }}
                />
              ) : (
                <Button
                  primary
                  label={blockchain.loading ? <Spinner /> : "Connect Wallet"}
                  active
                  margin={{ left: "2rem" }}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                  }}
                />
              )}
            </Box>
          </Header>
        )
      }
    </ResponsiveContext.Consumer>
  );
};

export default NavBar;
