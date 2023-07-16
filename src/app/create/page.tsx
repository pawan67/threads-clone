import { X } from "lucide-react";
import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import ThreadCreate from "@/components/ThreadCreate";
import { Button } from "@/components/ui/button";
import SubmitThread from "@/components/SubmitThread";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (user?.onboarded === false) return redirect("/onboarding");

  if (!session?.user) return redirect("/sign-in");

  return (
    <div>
      <ThreadCreate user={session?.user} />
      <SubmitThread />
    </div>
  );
};

export default page;
