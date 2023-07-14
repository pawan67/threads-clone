"use server";

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
      //   onboarded: true,
    },
  });
}
