import Landing from "pages/Landing/Landing";
import IRoute from "interfaces/route.interface";

const disconnectedRoutes: IRoute[] = [
  {
    path: "/",
    name: "Landing Page",
    component: Landing,
    exact: true,
  },
];

export default disconnectedRoutes;
