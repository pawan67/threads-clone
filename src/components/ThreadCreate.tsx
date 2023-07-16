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
import Create from "./thread/create/Create";
import { User } from "next-auth";

interface ThreadCreateProps {
  user: User;
  isReply?: boolean;
}

const ThreadCreate: FC<ThreadCreateProps> = ({ user, isReply }) => {
  const router = useRouter();
  return (
    <>
      <div className=" flex items-center justify-between space-x-3">
        <span className=" font-semibold">New Thread</span>
        <Button onClick={() => router.back()} variant="ghost">
          Cancel
        </Button>
      </div>
      <Separator className=" my-3" />

      <Create user={user} />
    </>
  );
};

export default ThreadCreate;
