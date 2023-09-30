"use client";
import { Prisma, Thread, User } from "@prisma/client";
import Image from "next/image";
import { Image as AntImage } from "antd";
import Link from "next/link";
import { FC } from "react";
import loop from "@/assets/loop.svg";
import AuthorNameLink from "./AuthorNameLink";
import UserActions from "./controls";
import MoreMenu from "./MoreMenu";
import { formatTimeToNow } from "@/lib/utils";
interface ThreadComponentProps {
  data: Prisma.ThreadGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }> & {
    content: any;
  };
  comment?: boolean;
  threads?: Prisma.ThreadGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>[];

  parent?: boolean;
  noLink?: boolean;
  role?: string;
}

const MainThread: FC<ThreadComponentProps> = ({
  data,
  comment = false,
  threads,
  role,
}) => {
  return (
    <>
      <div className="px-3 py-4 space-y-3 flex flex-col border-b font-light ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full  overflow-hidden">
              <Image
                src={data.author.image}
                height={32}
                width={32}
                className="object-cover  aspect-square "
                alt={data.author.name + "'s profile image"}
              />
            </div>
            <AuthorNameLink
              role={data.author.role}
              username={data.author.username}
              name={data.author.name}
            />
          </div>
          <div className="flex items-center space-x-3 ">
            <span className="text-sm text-muted-foreground">
              {formatTimeToNow(data.createdAt) || "now"}
            </span>
            <MoreMenu
              name={data.author.name}
              id={data.id}
              author={data.author.id}
              role={role}
            />
          </div>
        </div>
        <div className="w-full space-y-1">
          <Link href={`/thread/${data.id}`}>
            <div className="text-base/relaxed  text-left whitespace-pre-line">
              {data.content?.text}
            </div>
          </Link>
          <div>
            {data.content?.images.length > 1 ? (
              <div className=" my-2 grid grid-cols-2 gap-3">
                <AntImage.PreviewGroup>
                  {data.content?.images.map((image: string, index: number) => (
                    <div className="   ">
                      <AntImage
                        alt={data.author.name}
                        key={index}
                        className=" shadow-xl border aspect-[4/3] object-cover rounded-md"
                        src={image}
                      />
                    </div>
                  ))}
                </AntImage.PreviewGroup>
              </div>
            ) : data.content?.images.length === 1 ? (
              <div className=" my-2 grid grid-cols-1 gap-3">
                {data.content?.images.map((image: string, index: number) => (
                  <div className="   ">
                    <AntImage
                      alt={data.author.name}
                      key={index}
                      className=" shadow-xl border aspect-[4/3] object-cover rounded-md"
                      src={image}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <>
            <UserActions data={data} numPosts={threads ? threads.length : -1} />
            <div className="flex text-neutral-600 items-center space-x-2">
              {data.children.length > 0 ? (
                <div>
                  {data.children.length}{" "}
                  {data.children.length === 1 ? "reply" : "replies"}
                </div>
              ) : null}
              {data.children.length > 0 && data.likes.length > 0 ? (
                <div className="w-1 h-1 rounded-full bg-neutral-600" />
              ) : null}
              {data.likes.length > 0 ? (
                <div>
                  {data.likes.length}{" "}
                  {data.likes.length === 1 ? "like" : "likes"}
                </div>
              ) : null}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default MainThread;
