import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";
import Filter from "bad-words";
import { db } from "./db";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date = new Date()): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

export const cleanup = (text: string) => {
  const filter = new Filter();

  try {
    return filter.clean(text);
  } catch {
    return text;
  }
};

export const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const metaTagsGenerator = ({
  title,
  description,
  img,
  url,
}: {
  title?: string;
  description?: string;
  img?: string;
  url?: string;
}) => {
  const metaObject = {
    title: title || "Threads | Meta's new app clone",
    description:
      description ||
      "Threads | Meta's new app clone created using Next.js 13 Server , TypeScript, Tailwind CSS, and Prisma.",

    openGraph: {
      type: "website",
      locale: "en_IE",
      url:
        `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}` ||
        process.env.NEXT_PUBLIC_PRODUCTION_URL,
      title: title || "",
      description:
        description ||
        "Threads | Meta's new app clone created using Next.js 13 Server , TypeScript, Tailwind CSS, and Prisma. ",
      images: [
        {
          url: img || "https://i.imgur.com/iwZOWHI.png",
          width: 800,
          height: 450,
        },
        {
          url: img || "https://i.imgur.com/iwZOWHI.png",
          width: 800,
          height: 450,
        },
      ],
      site_name: "Cinephilex",
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Threads | Meta's new app clone",
      description: description || "Threads | Meta's new app clone",
      // creator: "@goldeninfotech",
      images: [img || "https://i.imgur.com/iwZOWHI.png"],
    },
  };

  return metaObject;
};

export function createLinks(text: string) {
  const contentWithUserLinks = text.replace(
    /@(\w+)/g,
    (match: string, username: string) =>
      `<a href="/${username}" class="text-blue-500  font-semibold">${match}</a>`
  );
  return contentWithUserLinks.replace(
    /https?:\/\/\S+/g,
    (match: string) =>
      `<a href="${match}" class="text-blue-500 " target="_blank">${match}</a>`
  );
}

// async function validateIfTagged(text: string) {
//   const regex = /@(\w+)/g;
//   const found = text.match(regex);

//   const users = found?.map((user) => user.slice(1));
//   const allUsersFromDb = await db.user.findMany({
//     where: {
//       username: {
//         in: users,
//       },
//     },
//   });

//   console.log(users);

//   return found;
// }
