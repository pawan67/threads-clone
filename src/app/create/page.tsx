import { X } from "lucide-react";
import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import ThreadCreate from "@/components/ThreadCreate";
import { Button } from "@/components/ui/button";
import SubmitThread from "@/components/SubmitThread";
interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  return (
    <div className=" mt-5">
      <div className=" flex items-center space-x-3">
        <span className=" font-semibold">New Thread</span>
      </div>
      <Separator className=" my-3" />
      <ThreadCreate user={session?.user} />

      <SubmitThread />
    </div>
  );
};

export default page;
