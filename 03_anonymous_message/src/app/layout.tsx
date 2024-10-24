import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={"antialiased"}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
