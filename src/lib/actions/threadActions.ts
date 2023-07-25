"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getAuthSession } from "../auth";

export const createThread = async (
  content: any,
  authorId: string,
  pathname: string
) => {
  await db.thread.create({
    data: {
      content: content,
      authorId: authorId,
    },
  });
  revalidatePath(pathname);
};

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

  if (userId !== receiverId) {
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
  }

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
  const receiver = await db.thread.findUnique({
    where: {
      id: threadId,
    },
    select: {
      authorId: true,
    },
  });

  const thread = await db.thread.create({
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

  if (authorId !== receiver?.authorId) {
    await db.notification.create({
      data: {
        senderId: authorId,
        threadId: thread.id,
        type: "REPLY",
        receiverId: receiver?.authorId as string,
      },

      include: {
        sender: true,
        receiver: true,
        thread: true,
      },
    });
  }

  revalidatePath(path);
}

export async function readNotification(id: string) {
  await db.notification.update({
    where: {
      id: id,
    },
    data: {
      read: true,
    },
  });

  revalidatePath("/");
}
