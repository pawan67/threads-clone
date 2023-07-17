import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div>
      <h1 className=" text-2xl font-semibold">Settings</h1>
      <div className=" mt-10">{children}</div>
    </div>
  );
};

export default layout;
