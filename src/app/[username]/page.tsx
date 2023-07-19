import { FC } from "react";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import ThreadComponent from "@/components/thread/ThreadComponent";
interface pageProps {
  params: {
    username: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const session = await getAuthSession();
  if (!session) return null;

  const user = await db.user.findUnique({
    where: {
      username: params.username,
    },
  });

  const threads = await db.thread.findMany({
    where: {
      authorId: user?.id,
      parent: null,
    },
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
  });

  return (
    <>
      <div className="w-full mt-4 flex">
        <button className="w-full h-10 py-2 font-semibold border-b border-b-black dark:border-b-white text-center">
          Threads
        </button>
        <Link
          href={`/${params.username}/replies`}
          className="w-full h-10 py-2 font-medium border-b border-neutral-900 duration-200 hover:border-neutral-700 hover:text-neutral-500 text-center text-neutral-600"
        >
          Replies
        </Link>
      </div>
      {threads.length === 0 ? (
        <div className="text-neutral-600 mt-4 text-center leading-loose">
          No threads posted yet.
        </div>
      ) : (
        threads.map((thread) => <ThreadComponent data={thread} />)
      )}
    </>
  );
};

export default page;
