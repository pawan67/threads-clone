"use client";
import { FC } from "react";
import { Home, Search, EditSquare, Heart2, User } from "react-iconly";
import { usePathname } from "next/navigation";
import { navigationUrls } from "@/urls/navigationUrls";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import Logo from "../logo/Logo";

interface NavbarProps {
  username?: any;
  unReadNotificationCount?: number;
}

const Navbar: FC<NavbarProps> = ({ username, unReadNotificationCount }) => {
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

      <aside className="     hidden sticky  md:block left-0 inset-y-0    ">
        <div className=" sticky top-0 flex flex-col w-full space-y-6 p-5  ">
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
                "justify-start relative w-full drop-shadow-md    break-before-avoid whitespace-nowrap flex-shrink-0 flex items-center px-4    font-medium   transition-all"
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
      </aside>
    </>
  );
};

export default Navbar;
