import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface CommentProps {
  id: string;
}

const Comment: FC<CommentProps> = ({ id }) => {
  return (
    <Link href={`/create/comment/${id}`}>
      <MessageCircleIcon className="w-5 h-5" />
    </Link>
  );
};

export default Comment;
