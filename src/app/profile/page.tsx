import { getAuthSession } from "@/lib/auth";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getAuthSession();

  return <div>page</div>;
};

export default page;
