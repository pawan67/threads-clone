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

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const pathname = usePathname();
  return (
    <>
      {/* For mobile devices */}
      {pathname !== "/create" && (
        <div className=" z-[1000] md:hidden fixed bottom-0 inset-x-0 p-7   ">
          <div className=" flex space-x-3 justify-between">
            {navigationUrls.map((navItem, index) => (
              <Link href={navItem.url} key={index}>
                {navItem.url === pathname ? (
                  <navItem.icon set="bold" size={25} />
                ) : (
                  <navItem.icon primaryColor="gray" size={25} />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* For desktop devices */}

      <aside className="     hidden  md:block left-0 inset-y-0    ">
        <div className=" flex flex-col w-full space-y-6 p-5  ">
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
                "justify-start w-full   break-before-avoid whitespace-nowrap flex-shrink-0 flex items-center px-4  rounded-md  font-medium   transition-all"
              )}
            >
              {navItem.url === pathname ? (
                <navItem.icon set="bold" size={20} />
              ) : (
                <navItem.icon primaryColor="gray" size={20} />
              )}
              <span className="ml-2">{navItem.name}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
