"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthorNameLink({
  name,
  username,
}: {
  name: string;
  username: string;
}) {
  return (
    <Link href={`/${username}`} className="font-semibold">
      {username}
    </Link>
  );
}
