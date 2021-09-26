import IRoute from "interfaces/route.interface";
import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import routes from "services/routes";
import NavBar from "components/Navbar/Navbar";

const App: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar routes={routes} />
        <Switch>
          {routes.map((route: IRoute, index: number) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <route.component
                    name={route.name}
                    {...props}
                    {...route.props}
                  />
                )}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
