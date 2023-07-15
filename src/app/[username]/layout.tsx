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

  if (!user) {
    return (
      <div className=" flex flex-col space-y-3 items-center justify-center">
        <Logo />
        <h1 className="  text-lg font-semibold">
          Sorry, this page isn't available
        </h1>
        <p className=" text-muted-foreground">
          The link you followed may be broken, or the page may have been removed
        </p>
      </div>
    );
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
