export const useHash = <THash extends Record<string, string>>() => {
  const params = new URLSearchParams(
    new URL(window.location.href).hash.replace("#", "?")
  );

  return new Proxy<THash>({} as THash, {
    get(_: unknown, prop: string) {
      return params.get(prop);
    },
  });
};
