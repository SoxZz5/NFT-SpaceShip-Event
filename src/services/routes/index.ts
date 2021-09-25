import IRoute from "interfaces/route.interface";
import connectedRoutes from "./connected";
import disconnectedRoutes from "./disconnected";

const routes: IRoute[] = [...connectedRoutes, ...disconnectedRoutes];

export default routes;
