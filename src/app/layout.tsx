import { cn, metaTagsGenerator } from "@/lib/utils";
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
import { db } from "@/lib/db";
const inter = Inter({ subsets: ["latin"] });

export const metadata = metaTagsGenerator({});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  const username = session?.user?.username;

  const isUser = !!session?.user;

  const notifcations = await db.notification.findMany({
    where: {
      receiverId: session?.user?.id,
      read: false,
    },
  });

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className={cn(inter.className)}>
        <Providers>
          <div className=" mx-auto max-w-4xl ">
            <div className=" flex max-w-4xl justify-center ">
              {isUser && (
                <Navbar
                  unReadNotificationCount={notifcations.length}
                  username={username}
                />
              )}

              <main className=" pt-5 pb-10 container  relative  antialiased">
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
