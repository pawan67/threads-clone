"use client";

import { Loader2, Paperclip } from "lucide-react";
import { Button } from "../../ui/button";
import { useEffect, useState, useTransition } from "react";
import { Prisma } from "@prisma/client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { replyToThread } from "@/lib/actions";
import { toast } from "@/lib/use-toast";
import { useSession } from "next-auth/react";
import ThreadComponent from "../ThreadComponent";
import Create from "../create/Create";

export function CreateComment({
  thread,
}: {
  thread: Prisma.ThreadGetPayload<{
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
}) {
  const [comment, setComment] = useState("");
  const [clicked, setClicked] = useState(false);

  const { data, status } = useSession();
  const user = data?.user;

  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    if (clicked && !isPending) {
      setComment("");

      setClicked(false);
      toast({
        title: "Replied to thread",
      });
    }
  }, [isPending]);

  if (!user) return null;

  return (
    <div className=" mt-5">
      <ThreadComponent  data={thread} noLink comment />
      <Create thread={thread} user={user} isReply />
    </div>
  );
}
