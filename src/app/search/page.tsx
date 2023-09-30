import { Bar } from "@/components/search/Bar";
import { SearchUser } from "@/components/search/SearchUser";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  const getUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  // if there's no query, return top followed users
  const users = searchParams?.q
    ? await db.user.findMany({
        include: {
          followedBy: true,
        },
        where: {
          NOT: {
            id: user.id,
          },
          OR: [
            {
              username: {
                contains: searchParams.q as string,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: searchParams.q as string,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          followedBy: {
            _count: "desc",
          },
        },
      })
    : await db.user.findMany({
        include: {
          followedBy: true,
        },
        where: {
          NOT: {
            id: user.id,
          },
        },
        orderBy: {
          followedBy: {
            _count: "desc",
          },
        },
      });

  return (
    <div className=" pb-10">
      <div className="px-3 mb-3">
        <div className="text-2xl font-semibold pt-8 pb-5">Search</div>
        <Bar />
      </div>
      {users.length === 0 ? (
        <div className="text-neutral-600 mt-4 text-center leading-loose">
          No results
        </div>
      ) : (
        <>
          {users.map((user) => {
            const isFollowing = user.followedBy.some(
              (follow) => follow.id === getUser.id
            );
            return (
              <SearchUser
                isFollowing={isFollowing}
                key={user.id}
                id={getUser.id}
                user={user}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
