"use client";
import { FC } from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const notificationOptions = [
  {
    title: "All",
    path: "/notifications",
  },
  {
    title: "Likes",
    path: "/notifications/likes",
  },
  {
    title: "Replies",
    path: "/notifications/replies",
  },
  {
    title: "Mentions",
    path: "/notifications/mentions",
  },
];

interface NotificationsNavProps {}

const NotificationsNav: FC<NotificationsNavProps> = ({}) => {
  const pathname = usePathname();
  return (
    <>
      <h1 className=" text-2xl font-semibold mb-3">Activity</h1>

      <ScrollArea className=" mb-5 w-full   ">
        <ScrollBar orientation="horizontal" />
        <div className=" space-x-4 flex ">
          {notificationOptions.map((option) => (
            <Link
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: pathname === option.path ? "default" : "outline",
                }),
                " min-w-[6rem] text-center"
              )}
              href={option.path}
            >
              {option.title}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default NotificationsNav;
