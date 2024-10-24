//todo: Create AuthProvider using SessionProvider from next-auth/react, which is used to provide authentication state(Session) to the rest of our app.
"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}


