"use client";
import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { Button } from "./ui/button";

function SubmitThread() {
  return null
  return (
    <div className=" absolute inset-x-0 p-3 bottom-0 ">
      <Separator className=" my-3" />
      <div className=" flex justify-between">
        <div>Anyone can reply</div>
        <Button
          type="submit"
          form="thread-post-form"
          className=" text-blue-400"
          variant="secondary"
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default SubmitThread;
