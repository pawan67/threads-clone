import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FC } from "react";
import { redirect } from "next/navigation";
import Notification from "@/components/notifications/Notification";
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
      type: "LIKE",
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
    <div>
      {notifications.length > 0
        ? notifications.map((notification) => (
          
            <Notification user={user} data={notification} />
          ))
        : "No notifications"}
    </div>
  );
};

export default page;
