"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { followUser, unfollowUser } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "@/lib/use-toast";

export default function FollowButton({
  isFollowing,
  name,
  id,
  followingId,
}: {
  isFollowing: boolean;
  name: string;
  id: string;
  followingId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        toast({
          title: isFollowing ? "Unfollowed " + name : "Followed " + name,
        });
        startTransition(() => {
          if (isFollowing) {
            unfollowUser(id, followingId, pathname);
          } else {
            followUser(id, followingId, pathname);
          }
        });
      }}
      variant="outline"
      size="sm"
      className="w-24"
    >
      {isPending ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : isFollowing ? (
        "Following"
      ) : (
        "Follow"
      )}
    </Button>
  );
}
