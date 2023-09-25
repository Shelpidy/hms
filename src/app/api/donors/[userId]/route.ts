import Donor from "@/models/Donors";
import BloodGroup from "@/models/BloodGroups";
import { NextRequest } from "next/server";

type RouteParams = {
  params: {
    userId: string;
  };
};
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const donors = await Donor.findAll();
    const donorDetails = await Promise.all(
      donors.map(async (donor) => {
        const bloodGroup = await BloodGroup.findOne({
          where: { bloodGroupId: donor.bloodGroupId },
          attributes: ["bloodGroupId", "groupName"],
        });
        return {
          donor,
          bloodGroup,
        };
      }),
    );
    return new Response(JSON.stringify({ donors: donorDetails }), {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "server error", error: error.message }),
      { status: 400 },
    );
  }
}
