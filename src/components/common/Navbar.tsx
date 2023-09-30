"use client";
import { FC, useEffect, useState } from "react";
import { Home, Search, EditSquare, Heart2, User } from "react-iconly";
import { usePathname } from "next/navigation";
import { navigationUrls } from "@/urls/navigationUrls";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import Logo from "../logo/Logo";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

interface NavbarProps {
  username?: any;
  unReadNotificationCount?: number;
}

const Navbar: FC<NavbarProps> = ({ username, unReadNotificationCount }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => setMounted(true), []);
  const pathname = usePathname();
  return (
    <>
      {/* For mobile devices */}
      {pathname !== "/create" && (
        <div className=" z-[1000] md:hidden bg-background fixed bottom-0 inset-x-0 px-7 py-4   ">
          <div className=" flex space-x-3 justify-between">
            {navigationUrls.map((navItem, index) => (
              <Link href={navItem.url} className=" relative" key={index}>
                {navItem.url === pathname ? (
                  <navItem.icon stroke="bold" set="bold" size={25} />
                ) : (
                  <navItem.icon primaryColor="gray" size={25} />
                )}
                {navItem.url === "/notifications" &&
                  unReadNotificationCount !== 0 && (
                    <span className=" text-[10px] bottom-0 aspect-square w-4 h-4 flex text-white justify-center items-center  -right-1 bg-red-500 rounded-full p-1 absolute">
                      <p>{unReadNotificationCount}</p>
                    </span>
                  )}
              </Link>
            ))}
            {username && (
              <Link href={`/${username}`}>
                {`/${username}` === pathname ? (
                  <User set="bold" size={25} />
                ) : (
                  <User primaryColor="gray" size={25} />
                )}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* For desktop devices */}

      <aside className="     hidden sticky min-w-[250px]  md:block left-0 inset-y-0    ">
        <div className=" sticky top-0 bottom-0 h-[100vh] p-5  ">
          <div className="flex flex-col w-full space-y-6">
            <Logo />
            {navigationUrls.map((navItem, index) => (
              <Link
                key={navItem.url}
                href={navItem.url}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  pathname === navItem.url
                    ? "bg-muted  hover:bg-muted"
                    : " hover:bg-muted",
                  "justify-start relative w-full     break-before-avoid whitespace-nowrap flex-shrink-0 flex items-center px-4    font-medium   transition-all"
                )}
              >
                {navItem.url === pathname ? (
                  <navItem.icon set="bold" size={20} />
                ) : (
                  <navItem.icon primaryColor="gray" size={20} />
                )}
                {navItem.url === "/notifications" &&
                  unReadNotificationCount !== 0 && (
                    <span className=" text-[10px] bottom-0 aspect-square w-5 h-5 flex text-white justify-center items-center  -right-1 bg-red-500 rounded-full p-1 absolute">
                      <p>{unReadNotificationCount}</p>
                    </span>
                  )}
                <span className="ml-2">{navItem.name}</span>
              </Link>
            ))}
            {username && (
              <Link
                href={`/${username}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  pathname === `/${username}`
                    ? "bg-muted  hover:bg-muted"
                    : " hover:bg-muted",
                  "justify-start w-full    break-before-avoid whitespace-nowrap flex-shrink-0 flex items-center px-4    font-medium   transition-all"
                )}
              >
                {`/${username}` === pathname ? (
                  <User set="bold" size={20} />
                ) : (
                  <User primaryColor="gray" size={20} />
                )}
                <span className="ml-2">Profile</span>
              </Link>
            )}
          </div>

          <div className=" absolute bottom-10">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className=" outline-none" variant="outline" size={"icon"}>
                  <Menu className=" text-muted-foreground" size={25} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={switchTheme}>
                  Switch Appearence
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    target="_blank"
                    href="mailto:pawantamada8@gmail.com?subject=Bug%20Report%20for%20Threads%20Application"
                  >
                    Report a bug
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a target="_blank" href="https://pawan67.vercel.app">
                    About Me
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
