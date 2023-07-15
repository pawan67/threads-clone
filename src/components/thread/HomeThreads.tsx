"use client";
import { Prisma, User } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Thread from "./Thread";
import ThreadComponent from "./ThreadComponent";

interface HomeThreadsProps {
  user: User | null;
  threads: Prisma.ThreadGetPayload<{
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
  }>[];
}

const HomeThreads: FC<HomeThreadsProps> = ({ user, threads }) => {
  const [items, setItems] = useState(threads);
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(threads);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !noMore) {
      setLoading(true);
      loadMore();
      console.log("LOADING MORE");
    }
  }, [inView, noMore]);

  useEffect(() => {
    setItems(threads);
  }, [threads]);

  const loadMore = async () => {
    const morePosts = await fetch(
      `/api/loadmore?cursor=${items[items.length - 1].id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    if (morePosts.data.length === 0) {
      setNoMore(true);
    }

    setItems([...items, ...morePosts.data]);
    setLoading(false);
  };

  return (
    <>
     
    </>
  );
};

export default HomeThreads;
