import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/lib/use-toast";
import { ThreadCreationRequest } from "@/lib/validators/threadSubmit";
import { useMutation } from "@tanstack/react-query";
import { Image as AntdImage } from "antd";
import Image from "next/image";
import axios from "axios";
import { X } from "lucide-react";
import { User } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState, useTransition } from "react";
import { ImAttachment } from "react-icons/im";
import TextareaAutosize from "react-textarea-autosize";
import { replyToThread } from "@/lib/actions";
import { Prisma } from "@prisma/client";
interface CreateProps {
  isReply?: boolean;
  user: User;
  thread: Prisma.ThreadGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>;
}

const Create: FC<CreateProps> = ({ isReply = false, user, thread }) => {
  const [loading, setLoading] = useState(false);
  const [contentJson, setContentJson] = useState<any>({
    text: "",
    images: [],
  });
  const [repliedClicked, setRepliedClicked] = useState(false);
  const [isPending, startTransition] = useTransition();
  // reply to thread handling
  useEffect(() => {
    if (!isPending && repliedClicked) {
      toast({
        description: "Replied to thread",
      });
      router.push(`/thread/${thread.id}`);
    }
  }, [isPending]);

  const pathname = usePathname();
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
      <div className=" flex space-x-2   w-full  ">
        <div className="space-x-2 flex font-light">
          <div className="flex flex-col items-center justify-start">
            <div className="w-8 h-8 rounded-full bg-neutral-600 overflow-hidden">
              <Image
                src={user.image as string}
                height={32}
                width={32}
                className=""
                alt={user.name + "'s profile image"}
              />
            </div>
            <div className="w-0.5 grow mt-2 rounded-full bg-neutral-800" />
          </div>
        </div>
        <div className="    ">
          <p className=" font-semibold  ">Me</p>

          <div className=" my-1      ">
            <TextareaAutosize
              placeholder={
                isReply ? "Reply to thread" : "Start a new thread..."
              }
              onChange={(e) => {
                setContentJson({ ...contentJson, text: e.target.value });
              }}
              autoFocus
              className=" my-4 text-lg   w-full resize-none appearance-none overflow-hidden bg-transparent   focus:outline-none"
            />
            <div className="   ">
              {contentJson.images.length > 0 && (
                <AntdImage.PreviewGroup>
                  <div className="grid grid-cols-2 gap-3">
                    {contentJson.images.map((image: string, index: string) => (
                      <div className=" max-w-xl relative ">
                        <AntdImage
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
                </AntdImage.PreviewGroup>
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
            {isReply ? "Replying to thread" : "Anyone can reply to this thread"}
          </div>

          {isReply ? (
            <Button
              onClick={() => {
                startTransition(() => {
                  replyToThread(contentJson, user.id, thread.id, pathname);
                });
                setRepliedClicked(true);
              }}
              disabled={isContentEmpty()}
              className=" text-blue-400"
              variant="secondary"
            >
              Submit
            </Button>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
