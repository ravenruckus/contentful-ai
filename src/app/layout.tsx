import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/app/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contentful Byline Generator",
  description: "Contentful web app for generating bylines in the editor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
        </body>
    </html>
  );
}
