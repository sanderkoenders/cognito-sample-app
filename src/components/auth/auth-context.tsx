import { FC, ReactNode, createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { DateTime } from "luxon";
import { useEnv } from "../../util/use-env";

type IAuthContext = {
  setJwt: (jwt: string, expiresIn?: number) => void;
  isLoggedIn: () => boolean;
  getLoginUrl: (state?: Record<string, string>) => string;
};

export const AuthContext = createContext<IAuthContext>({
  setJwt: () => void 0,
  isLoggedIn: () => false,
  getLoginUrl: () => "",
});

export type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [jwt, setJwt] = useState<string>(Cookies.get("jwt") ?? "");
  const {
    REACT_APP_COGNITO_BASE_URL,
    REACT_APP_COGNITO_CLIENT_ID,
    REACT_APP_COGNITO_REDIRECT_URI,
    REACT_APP_COGNITO_SCOPE,
  } = useEnv();

  const getExpiryDate = (expiresIn: number) =>
    DateTime.now().plus({ seconds: expiresIn }).toJSDate();

  const setJwtValue = (jwt: string, expiresIn = 3600) => {
    console.log(getExpiryDate(expiresIn));

    if (jwt) {
      Cookies.set("jwt", jwt, {
        expires: getExpiryDate(expiresIn),
      });
    } else {
      Cookies.remove("jwt");
    }

    setJwt(jwt);
  };

  const constructLoginUrl = (state?: Record<string, string>) => {
    const props = {
      client_id: REACT_APP_COGNITO_CLIENT_ID,
      redirect_uri: REACT_APP_COGNITO_REDIRECT_URI,
      scope: REACT_APP_COGNITO_SCOPE,
      response_type: "token",
      state: state ? encodeURI(JSON.stringify(state)) : undefined,
    };

    return Object.entries(props).reduce(
      (acc, [key, value]) => (value ? `${acc}&${key}=${value}` : acc),
      `${REACT_APP_COGNITO_BASE_URL}?`
    );
  };

  return (
    <AuthContext.Provider
      value={{
        setJwt: setJwtValue,
        isLoggedIn: () => !!jwt,
        getLoginUrl: constructLoginUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
