"use client";

import { UserCog } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import VerifiedBadge from "@/assets/verified.png";

export default function AuthorNameLink({
  name,
  username,
  role,
}: {
  name: string;
  username: string;
  role?: string;
}) {
  return (
    <Link
      href={`/${username}`}
      className=" flex items-center space-x-1 font-semibold"
    >
      <span>{username}</span>

      {role === "ADMIN" && (
        <div className=" flex items-center space-x-1">
          <Image src={VerifiedBadge} width={14} height={14} alt="verified" />
          <UserCog size={14} />
        </div>
      )}
    </Link>
  );
}
