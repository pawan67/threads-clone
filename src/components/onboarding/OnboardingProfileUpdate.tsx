import { useToast } from "@/lib/use-toast";
import { validateUsername } from "@/lib/username";
import { FC, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { AlertCircle, Pencil } from "lucide-react";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Filter from "bad-words";
import { onboardData } from "@/lib/actions";
import Image from "next/image";
import { uploadImage } from "@/lib/uploadImage";
interface OnboardingProfileUpdateProps {
  userData: {
    id: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  next: () => void;
  allUsernames: string[];
}

const OnboardingProfileUpdate: FC<OnboardingProfileUpdateProps> = ({
  userData,
  next,
  allUsernames,
}) => {
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState(userData.username);
  const [name, setName] = useState(userData.name);
  const [bio, setBio] = useState(userData.bio || "");
  const [image, setImage] = useState(userData.image || "");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: any) => {
    setLoading(true);

    const file = e.target.files[0];
    const imgUrl = await uploadImage(file);
    setImage(imgUrl);
    setLoading(false);
  };

  const { toast } = useToast();
  const filter = new Filter();

  return (
    <>
      <Card className="w-full border-none pt-6">
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className=" flex justify-center">
                <div className=" relative">
                  <Image
                    className="aspect-square object-cover rounded-full"
                    alt={userData.name}
                    src={image as string}
                    width={80}
                    height={80}
                  />

                  <label htmlFor="profileInput">
                    <Pencil className=" absolute bottom-0 right-0  rounded-full " />
                  </label>
                  <input
                    onChange={handleUpload}
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    id="profileInput"
                    name="profileInput"
                    hidden
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  placeholder="Your unique username"
                />
                {allUsernames.includes(username) &&
                username !== userData.username ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Username is taken.
                  </div>
                ) : null}
                {filter.isProfane(username) ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Choose an
                    appropriate username.
                  </div>
                ) : null}
                {!validateUsername(username) ? (
                  <div className="text-red-500 text-sm flex items-center leading-snug">
                    <AlertCircle className="min-w-[16px] min-h-[16px] mr-1" />{" "}
                    Only use lowercase letters, numbers, underscores, & dots
                    (cannot start/end with last 2).
                  </div>
                ) : null}
                {username.length === 0 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Username cannot be
                    empty.
                  </div>
                ) : username.length > 16 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Username is too
                    long.
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Name displayed on your profile"
                />
                {name.length === 0 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Your name cannot be
                    empty.
                  </div>
                ) : name.length > 16 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Your name is too
                    long.
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  id="bio"
                  placeholder="+ Write bio"
                />
                {name.length > 100 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Your bio is too
                    long.
                  </div>
                ) : null}
              </div>
            </div>
          </form>
          <Button
            onClick={() => {
              startTransition(() => {
                onboardData(username, name, bio, userData.image, userData.id);
              });
              toast({
                title: "Updated user data",
              });
              next();
            }}
            variant="secondary"
            className="w-full mt-6"
            disabled={
              name.length === 0 ||
              name.length > 16 ||
              username.length === 0 ||
              username.length > 16 ||
              bio.length > 100 ||
              (allUsernames.includes(username) &&
                username !== userData.username) ||
              !validateUsername(username) ||
              filter.isProfane(username)
            }
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default OnboardingProfileUpdate;
