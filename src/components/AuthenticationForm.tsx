"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import googleIcon from "@/assets/google.svg";
import Image from "next/image";
// import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/lib/use-toast";
import { signIn } from "next-auth/react";
import Logo from "./logo/Logo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader, Loader2 } from "lucide-react";

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
      <AlertDialog>
        <AlertDialogTrigger>
          <p className=" text-sm mt-3  text-muted-foreground ">
            By continuing, you agree to our{" "}
            <span className=" underline">
              User Agreement and Privacy Policy.
            </span>
          </p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Just Kidding</AlertDialogTitle>
            <AlertDialogDescription>
              I will not hack you, I promise.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        disabled={isLoading}
        onClick={loginWithGoogle}
        variant="default"
        className=" w-3/4   mt-5"
      >
        {isLoading ? (
          <Loader2 className=" animate-spin" />
        ) : (
          <>
            <Image
              width={20}
              height={220}
              src={googleIcon}
              className=" mr-2"
              alt="googleIcon"
            />
            Continue with Google
          </>
        )}
      </Button>
    </div>
  );
}

export default AuthenticationForm;
