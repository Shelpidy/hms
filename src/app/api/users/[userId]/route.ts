import Patient from "@/models/Patients";
import BloodGroup from "@/models/BloodGroups";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: {
    userId: string;
  };
};
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    let { userId } = params;
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: `User with userId ${userId} does not exist`,
        }),
        {
          status: 404,
        },
      );
    }

    return new NextResponse(JSON.stringify({ user }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong in the get all patients",
      }),
      {
        status: 500,
      },
    );
  }
}
