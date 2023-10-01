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
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return new NextResponse(
        JSON.stringify({
          message: `Patient with userId ${userId} does not exist`,
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
    const bloodGroup = await BloodGroup.findOne({
      where: { bloodGroupId: patient?.getDataValue("bloodGroupId") },
    });
    const patientsWithDetail = {
      patient,
      bloodGroup,
      user,
    };

    return new NextResponse(JSON.stringify({ patient: patientsWithDetail }), {
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
