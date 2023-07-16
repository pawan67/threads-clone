import Logo from "@/components/logo/Logo";
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
    <div className="  ">
      <div className="  flex  justify-center">
        <Logo />
      </div>
      <h1 className="text-2xl font-semibold text-center">Notifications</h1>
      <p className=" text-muted-foreground text-center ">
        Notifications are not yet implemented. Please check back later.{" "}
      </p>
    </div>
  );
};

export default page;
