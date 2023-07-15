import { LogOutIcon } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";

interface SignOutProps {}

const SignOut: FC<SignOutProps> = ({}) => {
  return (
    <Button variant="ghost" size="icon">
      <LogOutIcon />
    </Button>
  );
};

export default SignOut;
