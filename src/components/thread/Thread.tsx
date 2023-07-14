"use client";
import { Thread, User } from "@prisma/client";
import { FC } from "react";
import { Separator } from "../ui/separator";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatTimeToNow } from "@/lib/utils";
import { Image } from "antd";

interface contentJson {
  text: string;
  images: string[];
}
interface ThreadProps {
  thread: Thread & { content: contentJson };
  user: User;
}

const Thread: FC<ThreadProps> = ({ thread, user }) => {
  console.log(thread);
  console.log(user);

  return (
    <div className=" mt-5">
      <div className=" flex items-center space-x-3">
        <Button variant="ghost" className="  rounded-full p-2 ">
          <ArrowLeft size={18} />
        </Button>
        <span className=" font-semibold"> Thread</span>
      </div>
      <Separator className=" my-3" />

      <div className=" flex justify-between items-center">
        <div className=" flex space-x-3 items-center">
          <Avatar>
            <AvatarImage src={user.image} />
          </Avatar>

          <span>{user.username}</span>
        </div>

        <div>
          <span className=" text-sm text-muted-foreground">
            {formatTimeToNow(new Date(thread.createdAt))}
          </span>
        </div>
      </div>

      <div className=" my-5">
        <div className=" whitespace-pre-line">{thread?.content?.text}</div>
        <div className=" my-5   ">
          {thread?.content?.images.length > 0 && (
            <Image.PreviewGroup>
              <div className="grid grid-cols-2 gap-3">
                {thread?.content?.images.map((image: string, index: number) => (
                  <div className=" max-w-xl  ">
                    <Image
                      key={index}
                      className=" aspect-[4/3] object-cover rounded-md"
                      src={image}
                    />
                  </div>
                ))}
              </div>
            </Image.PreviewGroup>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thread;
