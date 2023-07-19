"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";

export async function onboardData(
  username: string,
  name: string,
  bio: string,
  image: string,
  userId: string
) {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
      name,
      bio,
      image,
      onboarded: true,
    },
  });

  revalidatePath("/");
}

export const followUser = async (
  userId: string,
  followingId: string,
  pathname: string
) => {
 

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      followedBy: {
        connect: {
          id: followingId,
        },
      },
    },
  });

  await db.notification.create({
    data: {
      senderId: followingId,
      type: "FOLLOW",
      receiverId: userId,
    },

    include: {
      sender: true,
      receiver: true,
    },
  });

  revalidatePath(pathname);
};

export const unfollowUser = async (
  userId: string,
  followingId: string,
  pathname: string
) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      followedBy: {
        disconnect: {
          id: followingId,
        },
      },
    },
  });
  revalidatePath(pathname);
};

export async function deleteAccount(userId: string) {
  await db.user.delete({
    where: {
      id: userId,
    },
  });

  await db.thread.deleteMany({
    where: {
      authorId: userId,
    },
  });

  await db.likes.deleteMany({
    where: {
      userId,
    },
  });
}
