import Logo from "@/components/logo/Logo";
import HomeThreads from "@/components/thread/HomeThreads";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

async function HomePage() {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  const threads = await db.thread.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
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
    where: {
      parent: null,
    },
  });

  return (
    <>
      <div className=" sm:hidden flex justify-center ">
        <Logo />
      </div>
      <HomeThreads threads={threads} user={user} />
    </>
  );
}

export default HomePage;
