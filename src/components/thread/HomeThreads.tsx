"use client";
import { Prisma, User } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Thread from "./Thread";
import ThreadComponent from "./ThreadComponent";
import { Loader2 } from "lucide-react";

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

  console.log("items", items);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !noMore) {
      setLoading(true);
      loadMore();
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

    console.log("morePosts", morePosts);

    setItems([...items, ...morePosts.data]);
    setLoading(false);
  };

  return (
    <>
      {items.map((item, i) => {
        if (i === items.length - 1)
          return (
            <div key={item.id} ref={ref}>
              <ThreadComponent role={user?.role} threads={items} data={item} />
            </div>
          );
        return (
          <ThreadComponent
            role={user?.role}
            key={item.id}
            threads={items}
            data={item}
          />
        );
      })}
      <div className="w-full py-4 flex justify-center">
        {items.length === 0 ? (
          <div className="text-neutral-600 mt-4 text-center leading-loose">
            There are no threads... <br />
            Try making one!
          </div>
        ) : null}

        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
        ) : null}
      </div>
    </>
  );
};

export default HomeThreads;
