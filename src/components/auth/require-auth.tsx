import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./auth-context";
import { FC } from "react";

export interface RequiresAuthProps {
  redirectTo: string;
}

export const RequiresAuth: FC<RequiresAuthProps> = ({ redirectTo }) => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn()) {
    return <Outlet />;
  }

  return <Navigate to={redirectTo} />;
};
