import { IRoute } from "../routes/AllRoutes";

export const filterUserRoutes = (role: string | null, routes: IRoute[]) => {
  if(role) return routes.filter((route) => route.allowedRoles.includes(role));
  
  return routes;
}