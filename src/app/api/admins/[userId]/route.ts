import User from "@/models/Users";
import Admin from "@/models/Admins";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: {
    userId: string;
  };
};
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = params;
    const admin = await Admin.findOne({ where: { userId } });

    if (!admin) {
      return new NextResponse(
        JSON.stringify({
          message: `Admin with userId ${userId} does not exist`,
        }),
        {
          status: 404,
        },
      );
    }

    const user = await User.findOne({
      where: { userId },
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "profileImage",
        "contactNumber",
        "gender",
        "dateOfBirth",
        "address",
        "email",
        "role",
      ],
    });

    const adminsWithDetail = {
      admin,
      user,
    };

    return new NextResponse(JSON.stringify({ admin: adminsWithDetail }), {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "server error", error: error.message }),
      { status: 500 },
    );
  }
}
