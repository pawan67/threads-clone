"use client";
import { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
interface PrivacyProps {}

const Privacy: FC<PrivacyProps> = ({}) => {
  return (
    <>
      <Card className="w-full !border-white border-2 cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg">Public profile</CardTitle>
          <CardDescription>
            Anyone on or off Threads can see, share and interact with your
            content.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="opacity-50 cursor-not-allowed">
        <Card className="w-full mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Private profile</CardTitle>
            <CardDescription>
              Only your approved followers can see and interact with your
              content. (coming soon)
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <a href="/">
        <Button variant="secondary" className="w-full mt-6">
          Done
        </Button>
      </a>
    </>
  );
};

export default Privacy;
