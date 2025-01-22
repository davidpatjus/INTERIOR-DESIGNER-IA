import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/app/provider"
import "./globals.css";

const outfit = Kanit({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diseñador De Interiores IA",
  description: "Diseñador de interiores con inteligencia artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} antialiased`}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
