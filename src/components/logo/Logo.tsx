import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function Logo() {
  return (
    <div>
      <Link href="/">
        <img
          className="p-2 transition-all rounded-full hover:bg-muted  w-14"
          src="/logo/threads-dark.svg"
          alt=""
        />
      </Link>
    </div>
  );
}

export default Logo;
