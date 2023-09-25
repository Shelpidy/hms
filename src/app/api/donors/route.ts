import Donor from "@/models/Donors";
import BloodGroup from "@/models/BloodGroups";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
    return new NextResponse(JSON.stringify({ donors: donorDetails }), {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "server error", error: error.message }),
      { status: 400 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const bloodGroup = data.bloodGroup;
    const firstName = data.firstName as string;
    const lastName = data.lastName as string;
    const middleName = data.middleName as string;
    const email = data.email as string;
    const address = data.address as string;
    const gender = data.gender;
    const contactNumber = data.contactNumber as string;
    const dateOfBirth = data.dateOfBirth as string;

    const bloodGrp = await BloodGroup.create({
      groupName: bloodGroup,
    });
    const { bloodGroupId } = bloodGrp.dataValues;

    const donor = await Donor.create({
      firstName,
      lastName,
      middleName,
      email,
      address,
      gender,
      contactNumber,
      dateOfBirth,
      bloodGroupId,
    });
    return new NextResponse(
      JSON.stringify({ message: "donor created successfully", donor }),
      { status: 201 },
    );
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "server error", error: error.message }),
      { status: 400 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const bloodGroup = data.bloodGroup;
    const donorId = data.donorId;
    const firstName = data.firstName as string;
    const lastName = data.lastName as string;
    const middleName = data.middleName as string;
    const email = data.email as string;
    const address = data.address as string;
    const gender = data.gender;
    const contactNumber = data.contactNumber as string;
    const dateOfBirth = data.dateOfBirth as string;

    const donor = await Donor.findOne({ where: { donorId: donorId } });

    if (!donor) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const { bloodGroupId } = donor.dataValues;
    const updatedDonorBloodGroup = await BloodGroup.update(
      { groupName: bloodGroup, bloodGroupId },
      { where: { bloodGroupId } },
    );

    await Donor.update(
      {
        firstName,
        lastName,
        middleName,
        email,
        address,
        gender,
        contactNumber,
        dateOfBirth,
        bloodGroupId,
      },
      { where: { donorId } },
    );
    return new NextResponse(JSON.stringify({ message: "donor updated" }), {
      status: 202,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "server error", error: error.message }),
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("donorId");

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "missing Parameters" }),
        {
          status: 404,
        },
      );
    }
    const donor = await Donor.findOne({ where: { donorId: id } });
    const { bloodGroupId } = donor?.dataValues;

    const bloodGroup = await BloodGroup.findOne({ where: { bloodGroupId } });

    await bloodGroup?.destroy();
    await donor?.destroy();
    return new NextResponse(JSON.stringify({ message: "donor deleted" }), {
      status: 203,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "server error", error: error.message }),
      { status: 400 },
    );
  }
}
