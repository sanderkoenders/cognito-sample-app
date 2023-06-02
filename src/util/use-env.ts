export const useEnv = <Env extends Record<string, string>>() =>
  new Proxy<Env>({} as Env, {
    get(_: unknown, prop: string) {
      return process.env[prop];
    },
  });
