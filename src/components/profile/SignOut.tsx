"use client";
import { LogOutIcon } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

interface SignOutProps {}

const SignOut: FC<SignOutProps> = ({}) => {
  return (
    <Button onClick={() => signOut()} variant="ghost" size="icon">
      <LogOutIcon />
    </Button>
  );
};

export default SignOut;
