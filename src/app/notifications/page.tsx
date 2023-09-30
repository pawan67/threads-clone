import Logo from "@/components/logo/Logo";
import AllNotifications from "@/components/notifications/AllNotifications";
import Notification from "@/components/notifications/Notification";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      following: true,
    },
  });

  const notifications = await db.notification.findMany({
    where: {
      receiverId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sender: true,

      thread: {
        include: {
          author: true,
        },
      },
    },
  });

  if (user?.onboarded === false) return redirect("/onboarding");
  if (!user) return redirect("/");

  return (
    <div className=" space-y-2  ">
      {notifications.length > 0
        ? notifications.map((notification) => (
          
            <Notification user={user} data={notification} />
          ))
        : "No notifications"}
    </div>
  );
};

export default page;
