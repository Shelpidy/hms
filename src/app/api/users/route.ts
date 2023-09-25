import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  console.log(searchParams.get(""));

  return new Response(JSON.stringify({ message: "Post successfully" }), {
    status: 200,
  });
}
