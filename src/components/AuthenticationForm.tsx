"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/lib/use-toast";
import { signIn } from "next-auth/react";
import Logo from "./logo/Logo";
function AuthenticationForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      // toast notification
      toast({
        title: "There was an problem.",
        description: "There was an eror logging in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center flex-col">
      <Logo />
      <h1 className=" mt-3 text-3xl font-bold gradient ">Threads</h1>
      <p className=" text-sm mt-3  text-muted-foreground ">
        By continuing, you agree to our User Agreement and Privacy Policy.
      </p>

      <Button
        disabled={isLoading}
        onClick={loginWithGoogle}
        variant="default"
        className=" w-3/4   mt-5"
      >
        <FcGoogle className=" mr-2" />
        Continue with Google
      </Button>
    </div>
  );
}

export default AuthenticationForm;
