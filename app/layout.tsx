import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./layouts/navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/auth/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/auth/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Gym-eco",
  description: "Generated by create next app",
};
export const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser()
  
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
