import * as React from "react";

/**
 * `React.memo` that keeps the component's own type.
 *
 * `React.memo` returns a `MemoExoticComponent`, which drops a `forwardRef`
 * component's call signature and cannot carry the statics that compound
 * components rely on (`Card.Header` and friends). Every memoised component here
 * used to work around that with `as any as typeof Component`, which cost an
 * `no-explicit-any` suppression in thirteen files.
 *
 * The cast is still a cast - it just lives in one auditable place instead of
 * thirteen, and it goes through `unknown` rather than `any`, so nothing
 * downstream silently loses type checking.
 */
export function memo<T>(Component: T): T {
  return React.memo(
    Component as unknown as React.FunctionComponent,
  ) as unknown as T;
}
