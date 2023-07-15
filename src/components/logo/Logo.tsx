import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <div>
      <Link href="/">
        <Image
          width={100}
          height={100}
          className="p-2 transition-all rounded-full hover:bg-muted  w-14"
          src="/logo/threads-dark.svg"
          alt="threads logo"
        />
      </Link>
    </div>
  );
}

export default Logo;
