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
  });

  if (user?.onboarded === false) return redirect("/onboarding");
  return (
    <div className=" ">
      <h1 className="text-2xl font-semibold">Notifications</h1>
      
    </div>
  );
};

export default page;
