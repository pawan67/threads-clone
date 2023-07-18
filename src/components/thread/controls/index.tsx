"use client";
import { Prisma } from "@prisma/client";
import Like from "./Like";
import Repost from "./Repost";
import Share from "./Share";
import Comment from "./Comment";

export default function UserActions({
  data,
  numPosts,
}: {
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
  }>;
  numPosts?: number;
}) {
  const likes = data.likes.map((like) => like.userId);

  return (
    <div className="relative h-9">
      <div className="flex items-center absolute top-0 left-0 space-x-3.5 py-2 z-10">
        <Like likes={likes} thread={data} numPosts={numPosts} />
        <Comment id={data.id} />
        <Repost />
        <Share data={data} />
      </div>
    </div>
  );
}
