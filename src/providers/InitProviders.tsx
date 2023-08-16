import React, { ReactElement } from "react";
import AuthProvider from "./AuthProvider";
import UserProvider from "./UserProvider";
import RoleProvider from "./RoleProvider";
import DepartmentProvider from "./DepartmentProvider";

interface IProvider {
  Provider: React.ComponentType<any>;
  props?: any;
}

interface IProviderWrapperProps {
  providers: IProvider[];
  children: ReactElement;
}

const InitProviders = ({ providers, children }: IProviderWrapperProps) => {
  const renderedProviders = providers.reduce((acc, { Provider, props }) => {
    return <Provider {...props}>{acc}</Provider>;
  }, children);

  return <>{renderedProviders}</>;
};

const Providers: IProvider[] = [
  { Provider: AuthProvider },
  { Provider: UserProvider },
  { Provider: RoleProvider },
  { Provider: DepartmentProvider },
];

export { Providers };

export default InitProviders;