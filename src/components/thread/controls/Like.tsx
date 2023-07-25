"use client";
import { FC, useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { likeThread, unlikeThread } from "@/lib/actions/threadActions";
import { Heart } from "lucide-react";
import { Prisma } from "@prisma/client";
interface LikeProps {
  likes: string[];
  numPosts?: number;
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
}

const Like: FC<LikeProps> = ({ likes, numPosts, thread }) => {
  const [liked, setLiked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const { data, status } = useSession();

  const user = data?.user;

  useEffect(() => {
    if (user) {
      if (likes.includes(user.id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [user, numPosts]);

  const handleLike = () => {
    // vibrate the device if possible
    if (typeof window !== "undefined") {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }

    const wasLiked = liked;
    setLiked(!liked);

    if (user) {
      if (!wasLiked) {
        startTransition(() =>
          likeThread(thread.id, user.id, thread.author.id, pathname)
        );
      } else {
        startTransition(() =>
          unlikeThread(thread.id, user.id, thread.author.id, pathname)
        );
      }
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleLike();
      }}
      className={`w-5 duration-200 h-5 ${liked ? "text-red-600" : ""}`}
    >
      <Heart fill={liked ? "#dc2626" : "transparent"} className="w-5 h-5" />
    </button>
  );
};

export default Like;
