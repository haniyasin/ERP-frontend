import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { protectedRoutes, routes } from "./AllRoutes";
import RequireAuth from "./RequireAuth";
import { useAuth, useUser } from "../hooks/contextHooks";
import { handleNotFound } from "./ErrorHandler";
import LoadingComponent from "../common/LoadingComponent";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const { userExists, loading } = useUser();

  if (loading) return <LoadingComponent />;

  if (userExists === null) return <LoadingComponent />;

  return (
    <Routes>
      <Route path="/*" element={handleNotFound()} />
      {!userExists && <Route path="/register" element={<Register />} />}
      {!isAuthenticated && <Route path="/login" element={<Login />} />}
      {routes.map(({ path, Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      {protectedRoutes.map(({ path, Element, allowedRoles }) => {
        return (
          <Route
            key={path}
            path={path}
            element={
              <RequireAuth allowedRoles={allowedRoles}>
                <Element />
              </RequireAuth>
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
