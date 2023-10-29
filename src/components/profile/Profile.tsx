"use client";
import { User } from "@prisma/client";
import { FC, useTransition } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useToast } from "@/lib/use-toast";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import EditProfile from "./EditProfile";
import { createLinks } from "@/lib/utils";

interface ProfileProps {
  user: User & {
    followedBy: User[];
  };

  getSelf: User | null;
  isFollowing: boolean;
  self: boolean;
  unfollowUser: (userId: string, followingId: string, pathname: string) => void;
  followUser: (userId: string, followingId: string, pathname: string) => void;
  allUsernames: string[];
}

const Profile: FC<ProfileProps> = ({
  user,
  getSelf,
  self,
  isFollowing,
  followUser,
  unfollowUser,
  allUsernames,
}) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();
  if (!getSelf) return null;

  const userData = {
    id: user.id,
    username: user.username,
    name: user.name,
    bio: user.bio,
    image: user.image,
  };

  const shareProfile = () => {
    const shareData = {
      title: "Threads",
      text: `Check out ${user.name}'s (@${user.username}) on Threads`,
      url: `https://threads-meta.vercel.app/${user.username}`,
    };
    if (navigator.share) navigator.share(shareData);
  };

  const bioWithLinks = user.bio.replace(
    /https?:\/\/\S+/g,
    (match) =>
      `<a class="text-blue-500 underline" href="${match}" target="_blank">${match}</a>`
  );

  return (
    <div>
      <div className=" flex flex-col   space-y-3">
        <div className=" mt-3 flex justify-between items-center">
          <div>
            <div className=" text-2xl font-semibold">{user.name}</div>
            <div className=" flex space-x-2 ">
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
          </div>
          <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-600">
            <Image
              src={user.image}
              className="object-cover "
              alt={user.name}
              height={56}
              width={56}
            />
          </div>
        </div>
        <div>
          {/* <p className=" whitespace-pre">{user.bio}</p> */}
          <p
            className="whitespace-pre"
            dangerouslySetInnerHTML={{ __html: createLinks(user.bio) }}
          />
        </div>
        <div className=" text-muted-foreground">
          {user.followedBy.length} followers
        </div>

        {self ? (
          <div className=" flex space-x-2  mt-4">
            <EditProfile userData={userData} allUsernames={allUsernames} />
            <Button
              onClick={shareProfile}
              size="lg"
              className="w-full"
              variant="outline"
            >
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
