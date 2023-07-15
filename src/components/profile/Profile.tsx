"use client";
import { User } from "@prisma/client";
import { FC, useTransition } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useToast } from "@/lib/use-toast";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProfileProps {
  user: User & {
    followedBy: User[];
  };
  getSelf: User | null;
  isFollowing: boolean;
  self: boolean;
  unfollowUser: (userId: string, followingId: string, pathname: string) => void;
  followUser: (userId: string, followingId: string, pathname: string) => void;
}

const Profile: FC<ProfileProps> = ({
  user,
  getSelf,
  self,
  isFollowing,
  followUser,
  unfollowUser,
}) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();
  if (!getSelf) return null;
  return (
    <div>
      <div className=" flex flex-col   space-y-3">
        <div className=" text-2xl font-semibold">{user.name}</div>
        <div className="-mt-2 flex space-x-2 ">
          <div className="  ">{user.username}</div>
          <div>
            <Badge
              className=" text-muted-foreground rounded-full"
              variant="secondary"
            >
              threads.net
            </Badge>
          </div>
        </div>
        <div>
          <p className=" whitespace-pre">{user.bio}</p>
        </div>
        <div className=" text-muted-foreground">
          {user.followedBy.length} followers
        </div>

        {self ? (
          <div className=" flex space-x-2  mt-4">
            <Button size="lg" className=" w-full" variant="outline">
              Edit profile
            </Button>
            <Button size="lg" className="w-full" variant="outline">
              Share profile
            </Button>
          </div>
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault();
              toast({
                title: isFollowing ? "Unfollowed " + name : "Followed " + name,
              });
              startTransition(() => {
                if (isFollowing) {
                  unfollowUser(user.id, getSelf.id, pathname);
                } else {
                  followUser(user.id, getSelf.id, pathname);
                }
              });
            }}
            className="w-full"
            variant="outline"
          >
            {isPending ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : isFollowing ? (
              "Following"
            ) : (
              "Follow"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
