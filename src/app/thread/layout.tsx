import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import BackButton from "@/components/thread/BackButton";
import { db } from "@/lib/db";



export default async function ThreadPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  const getUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <div className="px-3 relative  mb-6">
        <BackButton />
        <div className="text-2xl font-semibold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          Thread
        </div>
      </div>

      {children}
    </>
  );
}
