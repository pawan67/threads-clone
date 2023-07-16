"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";

export const likeThread = async (
  thread: string,
  userId: string,
  pathname: string
) => {
  await db.likes.create({
    data: {
      thread: {
        connect: {
          id: thread,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  await db.thread.update({
    where: {
      id: thread,
    },
    data: {
      likes: {
        connect: {
          threadId_userId: {
            threadId: thread,
            userId: userId,
          },
        },
      },
    },
  });

  revalidatePath(pathname);
};

export const unlikeThread = async (
  thread: string,
  userId: string,
  pathname: string
) => {
  await db.likes.delete({
    where: {
      threadId_userId: {
        threadId: thread,
        userId: userId,
      },
    },
  });

  revalidatePath(pathname);
};

export async function deleteThread(id: string, pathname: string) {
  await db.likes.deleteMany({
    where: {
      threadId: id,
    },
  });

  await db.thread.delete({
    where: {
      id: id,
    },
  });

  revalidatePath(pathname);
}

export async function replyToThread(
  content: any,
  authorId: string,
  threadId: string,
  path: string
) {
  await db.thread.create({
    data: {
      content: content,
      author: {
        connect: {
          id: authorId,
        },
      },
      parent: {
        connect: {
          id: threadId,
        },
      },
    },
  });

  revalidatePath(path);
}
