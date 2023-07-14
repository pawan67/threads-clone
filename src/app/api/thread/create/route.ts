import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { ThreadValidator } from "@/lib/validators/threadSubmit";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = ThreadValidator.parse(body);
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const thread = await db.thread.create({
      data: {
        content,
        authorId: session.user.id,
      },
    });

    return new Response(JSON.stringify(thread), {
      headers: { "content-type": "application/json" },
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid Thread Request", { status: 422 });
    }
    console.log(error);
    return new Response("Could not post", { status: 500 });
  }
}
