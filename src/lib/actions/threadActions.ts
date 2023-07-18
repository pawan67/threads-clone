"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";

export const likeThread = async (
  thread: string,
  userId: string,
  receiverId: string,
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

  await db.notification.create({
    data: {
      senderId: userId,
      threadId: thread,
      type: "LIKE",
      receiverId: receiverId,
    },

    include: {
      sender: true,
      receiver: true,
      thread: true,
    },
  });

  revalidatePath(pathname);
  revalidatePath("/notifications");
};

export const unlikeThread = async (
  thread: string,
  userId: string,
  receiverId: string,
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

  await db.notification.deleteMany({
    where: {
      senderId: userId,
      threadId: thread,
      type: "LIKE",
      receiverId: receiverId,
    },
  });

  revalidatePath(pathname);
  revalidatePath("/notifications");
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
