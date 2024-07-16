import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Higher-Lower Food",
  description: "Spiele das bekannte Higher-Lower Spiel mit Essen",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <main className="w-full h-screen flex flex-col lg:flex-row items-center justify-around">{children}</main>
      </body>
    </html>
  );
}
