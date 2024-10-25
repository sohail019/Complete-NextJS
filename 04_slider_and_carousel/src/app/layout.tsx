import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "Slider and Carousel",
  description: "Digital Salt Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SidebarProvider>
        <AppSidebar />
          <SidebarTrigger />
          <div className="w-full lg:h-[80vh] lg:p-10 sm:p-5">{children}</div>
        </SidebarProvider>
      </body>
    </html>
  );
}
