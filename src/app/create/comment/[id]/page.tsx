import SorryPageNotFound from "@/components/miscellaneous/SorryPageNotFound";
import { CreateComment } from "@/components/thread/comment/CreateComponent";
import { db } from "@/lib/db";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const ThreadComment: FC<pageProps> = async ({ params }) => {
  const { id } = params;

  const thread = await db.thread.findUnique({
    where: {
      id: id,
    },
    include: {
      parent: true,
      children: {
        include: {
          author: true,
        },
      },
      likes: true,
      author: true,
    },
  });

  if (!thread) return <SorryPageNotFound />;

  return (
    <div>
      <CreateComment  itemData={thread} />
    </div>
  );
};

export default ThreadComment;
