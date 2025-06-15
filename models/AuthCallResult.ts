import type { Result } from "./Result";

export type AuthCallResult<T> = {
  result: Result<T>;
  refreshSuccess: boolean;
};