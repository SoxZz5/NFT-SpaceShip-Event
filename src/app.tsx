import IRoute from "interfaces/route.interface";
import React from "react";
import { Grommet } from "grommet";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import routes from "services/routes";
import NavBar from "components/Navbar/Navbar";
import theme from "assets/config/grommet.theme";
import { useDispatch, useSelector } from "react-redux";

const App: React.FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state: any) => state.blockchain);
  const isConnected = (): boolean => {
    return (
      blockchain.account &&
      blockchain.contract &&
      blockchain.status === "connected"
    );
  };

  return (
    <Grommet plain theme={theme} className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          {routes.map((route: IRoute, index: number) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) =>
                  route.guardByAuth ? (
                    isConnected() ? (
                      <route.component
                        name={route.name}
                        {...props}
                        {...route.props}
                      />
                    ) : (
                      <Redirect to="/" />
                    )
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </Grommet>
  );
};

export default App;
