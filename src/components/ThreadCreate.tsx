"use client";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import type EditorJS from "@editorjs/editorjs";
import TextareaAutosize from "react-textarea-autosize";
// import { Image } from "lucide-react";
import { Button } from "./ui/button";
import { Carousel, Image } from "antd";
import axios from "axios";
import { ImAttachment } from "react-icons/im";
import { setLogger } from "next-auth/utils/logger";
import { useMutation } from "@tanstack/react-query";
import { ThreadCreationRequest } from "@/lib/validators/threadSubmit";
import { toast } from "@/lib/use-toast";
import { useRouter } from "next/navigation";
import { uploadFiles } from "@/lib/uploadthing";
import Slider from "react-slick";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ThreadCreateProps {
  user: any;
  isReply?: boolean;
}
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const ThreadCreate: FC<ThreadCreateProps> = ({ user, isReply }) => {
  const [loading, setLoading] = React.useState(false);
  const [contentJson, setContentJson] = React.useState<any>({
    text: "",
    images: [],
  });

  const isContentEmpty = () => {
    return contentJson.text === "" && contentJson.images.length === 0;
  };

  const isImagesEmpty = () => contentJson.images.length === 0;

  const router = useRouter();

  const { mutate: createThread, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: ThreadCreationRequest = {
        content: contentJson,
      };
      const { data } = await axios.post("/api/thread/create", payload);
      return data;
    },
    onError: (err) => {
      return toast({
        title: "Something went wrong",
        description: "Thread was not created",
        variant: "destructive",
      });
    },

    onSuccess: (data) => {
      router.push(`/thread/${data.id}`);
      return toast({
        description: "Thread was created successfully",
      });
    },
  });

  const imageUploader = async (pics: File[] | null) => {
    if (!pics) return;

    if (pics.length > 4)
      return toast({
        title: "You can only upload 4 images",
        variant: "destructive",
      });

    setLoading(true);

    for (let i = 0; i < pics.length; i++) {
      const payload = new FormData();
      payload.append("file", pics[i]);
      payload.append("upload_preset", "helloworld");
      payload.append("cloud_name", "dewctbby3");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dewctbby3/image/upload",
        payload
      );

      setContentJson((prevState: { text: string; images: string[] }) => ({
        ...prevState,
        images: [...prevState.images, data.secure_url],
      }));
    }

    setLoading(false);
  };

  return (
    <div className=" w-full ">
      <div className=" flex space-x-3   w-full  ">
        <div>
          <Avatar>
            <AvatarImage src={user.image} />
          </Avatar>
          <Separator className=" w-[2px] mx-auto my-2" orientation="vertical" />
        </div>
        <div className=" my-2    ">
          <p className=" text-sm"> @{user.username}</p>

          <div className=" my-1      ">
            <TextareaAutosize
              placeholder={
                isReply ? "Reply to thread" : "Start a new thread..."
              }
              onChange={(e) => {
                setContentJson({ ...contentJson, text: e.target.value });
              }}
              className=" my-4 text-lg   w-full resize-none appearance-none overflow-hidden bg-transparent   focus:outline-none"
            />
            <div className="   ">
              {contentJson.images.length > 0 && (
                <Image.PreviewGroup>
                  <div className="grid grid-cols-2 gap-3">
                    {contentJson.images.map((image: string, index: string) => (
                      <div className=" max-w-xl relative ">
                        <Image
                          key={index}
                          className=" aspect-[4/3] object-cover rounded-md"
                          src={image}
                        />
                        <Button
                          onClick={() =>
                            setContentJson({
                              ...contentJson,
                              images: contentJson.images.filter(
                                (img: string) => img !== image
                              ),
                            })
                          }
                          variant="outline"
                          className=" absolute top-3 right-3 p-2 rounded-full"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Image.PreviewGroup>
              )}
            </div>
          </div>

          {isImagesEmpty() && (
            <Button className=" p-3" variant="outline">
              <label htmlFor="imageUpload">
                <input
                  multiple
                  id="imageUpload"
                  // @ts-ignore
                  onChange={(e) => imageUploader(e.target.files)}
                  type="file"
                  hidden
                />
                <ImAttachment size={16} />
              </label>
            </Button>
          )}
        </div>
      </div>

      <div className=" mt-24    ">
        <Separator className=" my-3" />
        <div className=" flex justify-between">
          <div
            className={` ${
              (isLoading || isContentEmpty()) && " text-secondary "
            } `}
          >
            Anyone can reply
          </div>

          <Button
            onClick={() => createThread()}
            disabled={isContentEmpty() || isLoading}
            type="submit"
            form="thread-post-form"
            className=" text-blue-400"
            variant="secondary"
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadCreate;
