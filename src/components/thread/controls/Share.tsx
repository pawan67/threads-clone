"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast, useToast } from "@/lib/use-toast";
import { Prisma } from "@prisma/client";
import { ClipboardCopy, Send, ShareIcon } from "lucide-react";
import { FC } from "react";

interface ShareProps {
  data: Prisma.ThreadGetPayload<{
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

const Share: FC<ShareProps> = ({ data }) => {
  const copyToClipboard = () => {
    const link = `https://threads-meta.vercel.app/thread/${data.id}`;
    navigator.clipboard.writeText(link);
    toast({
      description: "Link copied to clipboard",
    });
  };

  const shareToOthers = () => {
    const shareData = {
      title: "Threads",
      text: `Check out this thread by ${data.author.name} on Threads`,
      url: `https://threads-meta.vercel.app/thread/${data.id}`,
    };

    if (navigator.share) navigator.share(shareData);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Send className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-background">
        <DropdownMenuLabel>Share</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyToClipboard}>
          {" "}
          <ClipboardCopy className=" mr-2" size={18} /> Copy link{" "}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToOthers}>
          <ShareIcon size={18} className=" mr-2" />
          Share via..
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Share;
