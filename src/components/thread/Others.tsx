import { Prisma } from "@prisma/client";
import Image from "next/image";

export default function Others({
  others,
}: {
  others: Prisma.ThreadGetPayload<{
    include: {
      author: true;
    };
  }>[];
}) {
  if (others.length === 0) {
    return null;
  }
  if (others.length === 1) {
    return (
      <div className="w-5 h-5 relative mt-2">
        <div className="w-5 h-5 rounded-full  absolute top-0 left-0 overflow-hidden">
          <Image
            src={others[0].author.image}
            height={20}
            width={20}
            className=" aspect-square object-cover"
            alt={others[0].author.name}
          />
        </div>
      </div>
    );
  }
  if (others.length === 2) {
    return (
      <div className="w-8 h-8 relative mt-2">
        <div className="w-[18px] h-[18px] rounded-full  absolute top-0 left-0 overflow-hidden">
          <Image
            src={others[0].author.image}
            height={18}
            width={18}
            className="object-cover aspect-square"
            alt={others[0].author.name}
          />
        </div>
        <div className="w-4 h-4 rounded-full  absolute bottom-0 right-0 overflow-hidden">
          <Image
            src={others[1].author.image}
            height={16}
            width={16}
            className="object-cover aspect-square"
            alt={others[1].author.name}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 relative mt-2">
      <div className="w-4 h-4 rounded-full  absolute top-0 left-0 overflow-hidden">
        <Image
          src={others[0].author.image}
          height={16}
          width={16}
          className="object-cover aspect-square"
          alt={others[0].author.name + "'s profile image"}
        />
      </div>
      <div className="w-3.5 h-3.5 rounded-full  absolute top-[15%] right-0 overflow-hidden">
        <Image
          src={others[1].author.image}
          height={14}
          width={14}
          className="object-cover aspect-square"
          alt={others[1].author.name + "'s profile image"}
        />
      </div>
      <div className="w-3.5 h-3.5 rounded-full  absolute bottom-0 left-[15%] overflow-hidden">
        <Image
          src={others[2].author.image}
          height={14}
          width={14}
          className="object-cover aspect-square"
          alt={others[2].author.name + "'s profile image"}
        />
      </div>
    </div>
  );
}
