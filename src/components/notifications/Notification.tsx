"use client";
import { Prisma, User } from "@prisma/client";
import { FC, useEffect } from "react";
import Image from "next/image";
import AuthorNameLink from "../thread/AuthorNameLink";
import Link from "next/link";
import { Heart } from "react-iconly";
import { formatTimeToNow } from "@/lib/utils";
import FollowButton from "../search/FollowButton";
import { StarIcon, User2Icon, UserIcon } from "lucide-react";
import { readNotification } from "@/lib/actions";
interface NotificationProps {
  data: Prisma.NotificationGetPayload<{
    include: {
      sender: true;
      thread: true;
    };
  }>;
  user: Prisma.UserGetPayload<{
    include: {
      following: true;
    };
  }>;
}

const Notification: FC<NotificationProps> = ({ data, user }) => {
  useEffect(() => {
    if (!data.read) readNotification(data.id);
  }, []);

  if (data.thread && data.type === "LIKE") {
    return (
      <Link href={`/thread/${data.thread.id}`}>
        <div className=" py-4 border-b items-center flex space-x-3">
          <div className=" relative">
            <Image
              className=" aspect-square object-cover rounded-full"
              alt={data.sender.name}
              src={data.sender.image}
              width="40"
              height="40"
            />
            <div className=" flex justify-center items-center absolute rounded-full p-1 border-2 border-background -right-1 -bottom-1 bg-red-600 ">
              <Heart size={12} filled primaryColor="#fff" />
            </div>
          </div>
          <div className=" grow">
            <div className=" flex space-x-2 items-center ">
              <AuthorNameLink
                name={data.sender.name}
                username={data.sender.username}
                role={data.sender.role}
              />
              <span className=" text-muted-foreground text-sm">
                {formatTimeToNow(data.createdAt)}
              </span>
            </div>

            <span className="text-muted-foreground -mt-1 text-sm line-clamp-1 ">
              {/* @ts-ignore */}
              {data.thread?.content.text || "liked your post"}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (data.type === "FOLLOW") {
    const isFollowing = user.following.some(
      (following) => following.id === data.senderId
    );

    return (
      <Link href={`/${data.sender.username}`}>
        <div className=" flex justify-between border-b w-full items-center ">
          <div className=" py-4  items-center flex space-x-3">
            <div className=" relative">
              <Image
                className=" aspect-square object-cover rounded-full"
                alt={data.sender.name}
                src={data.sender.image}
                width="40"
                height="40"
              />
              <div className=" flex justify-center items-center absolute rounded-full p-1 border-2 border-background -right-1 -bottom-1 bg-violet-600 ">
                <User2Icon size={12} fill="#fff" />
              </div>
            </div>
            <div className=" grow">
              <div className=" flex space-x-2 items-center ">
                <AuthorNameLink
                  name={data.sender.name}
                  username={data.sender.username}
                  role={data.sender.role}
                />
                <span className=" text-muted-foreground text-sm">
                  {formatTimeToNow(data.createdAt)}
                </span>
              </div>

              <span className="text-muted-foreground -mt-1 text-sm line-clamp-1 ">
                Followed you
              </span>
            </div>
          </div>
          <FollowButton
            name={data.sender.name}
            id={data.senderId}
            followingId={user.id}
            isFollowing={isFollowing}
          />
        </div>
      </Link>
    );
  }

  if (data.thread && data.type === "REPLY") {
    return (
      <Link href={`/thread/${data.thread.id}`}>
        <div className=" py-4 border-b items-center flex space-x-3">
          <div className=" relative">
            <Image
              className=" aspect-square object-cover rounded-full"
              alt={data.sender.name}
              src={data.sender.image}
              width="40"
              height="40"
            />
            <div className=" flex justify-center items-center absolute rounded-full p-1 border-2 border-background -right-1 -bottom-1 bg-blue-600 ">
              <StarIcon size={12} fill="#fff" />
            </div>
          </div>
          <div className=" grow">
            <div className=" flex space-x-2 items-center ">
              <AuthorNameLink
                name={data.sender.name}
                username={data.sender.username}
                role={data.sender.role}
              />
              <span className=" text-muted-foreground text-sm">
                {formatTimeToNow(data.createdAt)}
              </span>
            </div>
            <span className="text-muted-foreground -mt-1 text-sm line-clamp-1 ">
              Replied to your post
            </span>
            <span className="  text-sm line-clamp-1 ">
              {/* @ts-ignore */}
              {data.thread?.content.text}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return <div></div>;
};

export default Notification;
