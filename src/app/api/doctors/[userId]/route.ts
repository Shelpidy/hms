import Doctor from "@/models/Doctors";
import Specialization from "@/models/Specializations";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: {
    userId: string;
  };
};
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = params;
    const doctor = await Doctor.findOne({ where: { userId } });

    if (!doctor) {
      return new NextResponse(
        JSON.stringify({
          message: `Doctor with userId ${userId} does not exist`,
        }),
        {
          status: 404,
        },
      );
    }

    const specialization = await Specialization.findOne({
      where: { specializationId: doctor?.getDataValue("specializationId") },
      attributes: ["specializationId", "specializationName"],
    });

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

    const doctorsWithDetail = {
      doctor,
      specialization,
      user,
    };

    return new NextResponse(JSON.stringify({ doctor: doctorsWithDetail }), {
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