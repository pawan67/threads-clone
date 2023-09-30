"use client";
import { Prisma, Thread, User } from "@prisma/client";
import Image from "next/image";
import { Image as AntImage } from "antd";
import Link from "next/link";
import { FC } from "react";
import loop from "@/assets/loop.svg";
import lightLoop from "@/assets/loop-light.svg";
import AuthorNameLink from "./AuthorNameLink";
import UserActions from "./controls";
import MoreMenu from "./MoreMenu";
import { formatTimeToNow } from "@/lib/utils";
import Others from "./Others";
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

const ThreadComponent: FC<ThreadComponentProps> = ({
  data,
  comment = false,
  threads,
  noLink = false,

  parent = false,
  role,
}) => {
  const mainClass = parent
    ? "px-3 pt-4 space-x-2 flex font-light"
    : comment
    ? `space-x-2 flex font-light ${noLink ? "pointer-events-none" : ""}`
    : `px-3 py-4 space-x-2 flex border-b font-light  ${
        noLink ? "pointer-events-none" : ""
      }`;

  return (
    <>
      <div className={mainClass}>
        <div className="flex flex-col items-center justify-between">
          <div className="w-8 h-8 mt-1 rounded-full  overflow-hidden">
            <Link href={`/${data.author.username}`}>
              <Image
                src={data.author.image}
                height={32}
                width={32}
                className=" aspect-square  object-cover"
                alt={data.author.name}
              />
            </Link>
          </div>
          <div
            className={`w-0.5 grow mt-2 rounded-full bg-border relative ${
              parent ? "mb-5" : null
            }`}
          >
            {parent ? (
              <div className="-bottom-7 absolute right-0 w-4 h-8">
                <Image
                  alt=""
                  src={loop}
                  width={16}
                  height={32}
                  className="w-full hidden dark:block object-cover h-full"
                />
                <Image
                  alt=""
                  src={lightLoop}
                  width={16}
                  height={32}
                  className="w-full dark:hidden  object-cover h-full"
                />
              </div>
            ) : null}
          </div>
          {comment || parent ? null : <Others others={data.children} />}
        </div>
        <div className="w-full space-y-1">
          <div className="w-full flex items-center justify-between">
            <AuthorNameLink
              role={data.author.role}
              username={data.author.username}
              name={data.author.name}
            />
            {comment ? null : (
              <Link
                href={`/thread/${data.id}`}
                className="flex items-center space-x-3 "
              >
                <span className="text-sm text-muted-foreground">
                  {formatTimeToNow(data.createdAt)}
                </span>
                <MoreMenu
                  role={role}
                  name={data.author.name}
                  id={data.id}
                  author={data.author.id}
                />
              </Link>
            )}
          </div>

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

          {comment ? null : (
            <>
              <UserActions
                data={data}
                numPosts={threads ? threads.length : -1}
              />
              <Link href={`/thread/${data.id}`}>
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
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ThreadComponent;
