"use client";
import { FC } from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
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
      <div className=" mb-3 flex space-x-3 overflow-x-scroll ">
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
    </>
  );
};

export default NotificationsNav;
