"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

function Logo() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <div>
      <Image
        onClick={() => setTheme("light")}
        width={100}
        height={100}
        className="p-2 transition-all hidden dark:block rounded-full hover:bg-muted  w-14"
        src="/logo/threads-dark.svg"
        alt="threads logo"
      />
      <Image
        onClick={() => setTheme("dark")}
        width={100}
        height={100}
        className="p-2 transition-all dark:hidden  rounded-full hover:bg-muted  w-14"
        src="/logo/threads.svg"
        alt="threads logo"
      />
    </div>
  );
}

export default Logo;
