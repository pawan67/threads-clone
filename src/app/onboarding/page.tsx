import Screens from "@/components/onboarding/Screens";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { FC } from "react";

const OnboardingPage = async ({}) => {
  const session = await getAuthSession();

  const getUser = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (!getUser) redirect("/");

  const userData = {
    id: getUser.id,
    onboarded: true,
    bio: getUser.bio,
    username: getUser?.username,
    name: getUser.name,
    image: getUser.image,
    email: getUser.email,
  };

  const allUsernames = await db.user.findMany({
    select: {
      username: true,
    },
  });

  return (
    <div>
      {session && <Screens userData={userData} allUsernames={allUsernames} />}
    </div>
  );
};

export default OnboardingPage;
