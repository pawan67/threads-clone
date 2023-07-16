import Logo from "@/components/logo/Logo";
import Profile from "@/components/profile/Profile";
import SignOut from "@/components/profile/SignOut";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Instagram } from "lucide-react";
import { redirect } from "next/navigation";
import { FC } from "react";
import { followUser, unfollowUser } from "@/lib/actions";
import SorryPageNotFound from "@/components/miscellaneous/SorryPageNotFound";
interface layoutProps {
  params: {
    username: string;
  };
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ params, children }) => {
  const { username } = params;

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
    include: {
      followedBy: true,
    },
  });

  const session = await getAuthSession();

  if (!session) return redirect("/");

  const getSelf = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (getSelf?.onboarded === false) return redirect("/onboarding");

  if (!user) {
    return <SorryPageNotFound />;
  }

  const self = getSelf?.username === username;

  const isFollowing = self
    ? false
    : user.followedBy.some((follow) => follow.id == getSelf?.id);

  return (
    <>
      <div className=" relative  ">
        <div className=" flex justify-end space-x-3">
          <div>
            <a
              className={buttonVariants({ size: "icon", variant: "ghost" })}
              href="https://instagram.com"
            >
              <Instagram />
            </a>
          </div>
          <SignOut />
        </div>
        <Profile
          followUser={followUser}
          unfollowUser={unfollowUser}
          user={user}
          getSelf={getSelf}
          isFollowing={isFollowing}
          self={self}
        />
      </div>
      {children}
    </>
  );
};

export default layout;
