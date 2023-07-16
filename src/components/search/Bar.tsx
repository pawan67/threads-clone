"use client";

import { Search } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export function Bar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  //query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        console.log("pushing /search?q=" + search);
        router.push("/search?q=" + search);
        // console.log("searching for: " + search);
      } else {
        console.log("pushing /search");
        router.push("/search");
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="relative">
      <Search className="w-4 h-4 text-neutral-600 absolute top-3 left-2.5 z-10" />

      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
