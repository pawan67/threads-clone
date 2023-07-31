import MainThread from "@/components/thread/MainThread";
import ThreadComponent from "@/components/thread/ThreadComponent";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

import { Metadata } from "next";
import { metaTagsGenerator } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const thread = await db.thread.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });

  return metaTagsGenerator({
    title: `Checkout this thread by ${thread?.author.name}`,
    url: `/thread/${id}`,
  });
}

export default async function ThreadDetailedPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const session = await getAuthSession();

  const thread = await db.thread.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      children: {
        include: {
          author: true,
          children: {
            include: {
              author: true,
            },
          },
          parent: true,
          likes: true,
        },
      },
      parent: {
        include: {
          author: true,
          children: {
            include: {
              author: true,
            },
          },
          parent: {
            include: {
              author: true,
            },
          },
          likes: true,
        },
      },
      likes: true,
    },
  });

  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (!thread) {
    return (
      <div className="text-center text-neutral-600">thread not found.</div>
    );
  }

  return (
    <>
      {thread.parent && thread.parent.parent ? (
        <Link href={"/thread/" + thread.parent.parentId}>
          <Button
            size="sm"
            variant="ghost"
            className="flex pl-2 text-neutral-600"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            <div className="overflow-hidden rounded-full h-4 w-4 mr-2 bg-neutral-600">
              <Image
                src={thread.parent.parent.author.image}
                alt={thread.parent.parent.author.name + "'s avatar"}
                width={16}
                height={16}
              />
            </div>
            See earlier reply
          </Button>
        </Link>
      ) : null}
      {thread.parent ? (
        <ThreadComponent
          role={user?.role}
          key={thread.parent.id}
          parent
          data={thread.parent}
        />
      ) : null}
      <MainThread role={user?.role} key={thread.id} data={thread} />
      {thread.children.map((child) => (
        <ThreadComponent role={user?.role} key={child.id} data={child} />
      ))}
    </>
  );
}
