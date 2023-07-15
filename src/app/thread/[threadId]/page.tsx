import Thread from "@/components/thread/Thread";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import React from "react";

interface ThreadPageProps {
  params: {
    threadId: string;
  };
}

const ThreadPage = async ({ params }: ThreadPageProps) => {
  const { threadId } = params;
  const session = await getAuthSession();

  const thread = await db.thread.findUnique({
    where: {
      id: threadId,
    },
  });

  const user = await db.user.findUnique({
    where: {
      id: thread?.authorId,
    },
  });

  if (!thread || !user) {
    return <div>Thread not found</div>;
  }

  return (
    <div>
      <Thread user={user} thread={thread} />
    </div>
  );
};

export default ThreadPage;
