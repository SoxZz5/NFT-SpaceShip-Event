import Main from "pages/Main/Main";
import IRoute from "interfaces/route.interface";

const connectedRoutes: IRoute[] = [
  {
    path: "/home",
    name: "Home",
    component: Main,
    exact: true,
  },
];

export default connectedRoutes;
