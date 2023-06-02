import Cookies from "js-cookie";

export const useCookie = <TCookie extends Record<string, string>>() =>
  new Proxy<TCookie>({} as TCookie, {
    get(_: unknown, prop: string) {
      return Cookies.get(prop);
    },
  });
