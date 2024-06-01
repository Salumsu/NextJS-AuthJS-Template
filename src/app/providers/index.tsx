import { PropsWithChildren } from "react";
import AuthSessionProvider from "./session";

export default function Providers({ children }: PropsWithChildren) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
