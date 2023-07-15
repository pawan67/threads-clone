"use client";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import Privacy from "./Privacy";
import OnboardingProfileUpdate from "./OnboardingProfileUpdate";

interface ScreensProps {
  userData: {
    id: string ;
    onboarded: boolean;
    bio: string;
    username: string;
    name: string;
    image: string;
    email: string;
  };
  allUsernames: {
    username: string;
  }[];
}

const Screens: FC<ScreensProps> = ({ userData, allUsernames }) => {
  const [screen, setScreen] = useState(0);

  const nextScreen = () => setScreen((prev) => prev + 1);

  if (screen === 0) {
    return (
      <>
        <div className="w-full flex h-10 items-center justify-end mb-16">
          {/* Skip <ChevronRight className="w-4 h-4 ml-2" /> */}
        </div>

        <div className="mb-12 space-y-1">
          <div className="text-2xl font-semibold text-center">Profile</div>
          <div className="text-neutral-600 text-center">
            Customize your Threads profile.
          </div>
        </div>

        <OnboardingProfileUpdate
          allUsernames={allUsernames.map((user) => user.username)}
          userData={userData}
          next={nextScreen}
        />
      </>
    );
  }
  return (
    <>
      <Button
        onClick={() => setScreen(0)}
        className="pl-2.5 mb-16"
        variant="ghost"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Back
      </Button>

      <div className="mb-12 space-y-1">
        <div className="text-2xl font-semibold text-center">Privacy</div>
        <div className="text-neutral-600 text-center">
          Your privacy on Threads and Instagram can be different.
        </div>
      </div>

      <Privacy />
    </>
  );
};

export default Screens;
