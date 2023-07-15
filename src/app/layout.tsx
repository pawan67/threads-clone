import { cn } from "@/lib/utils";
import "./globals.css";
import "./styles/editor.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { getAuthSession } from "@/lib/auth";
import Providers from "@/components/common/Providers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  const username = session?.user?.username;

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className={cn(inter.className)}>
        <Providers>
          <div className=" mx-auto max-w-3xl ">
            <div className=" flex max-w-3xl justify-center ">
              <Navbar username={username} />
              <main className="  container pt-5     relative  antialiased">
                {children}
              </main>
            </div>
          </div>
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
