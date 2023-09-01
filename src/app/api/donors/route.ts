import Donor from "@/models/Donors";
import BloodGroup from "@/models/BloodGroups";

export async function GET(request:Request) {
    try {
        const donors = await Donor.findAll()
        return new Response(JSON.stringify({donors}),{
            status: 200
        })
    } catch (error :any) {
        console.log(error)
        return new Response(JSON.stringify({message: "error occurred", error:error.message}),{status: 500})
        
    }
    
}

export async function POST(req: Request){
try {
    const data = await req.json();
    const bloodGroup = data.bloodGroup;
    const firstName = data.firstName as string;
    const lastName = data.lastName as string;
    const middleName = data.middleName as string;
    const email = data.email as string;
    const address = data.address as string;
    const gender = data.gender ;
    const contactNumber = data.contactNumber as string;
    const dateOfBirth = data.dateOfBirth as string;

    const bloodGroupData = await BloodGroup.create({
        groupName: bloodGroup
    })
    const { bloodGroupId } = bloodGroupData.dataValues
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

    return new Response(JSON.stringify({message: "donor added successfully", donor}), {status: 201})
} catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify({message: "server error", error: error.message}), {status:400})
}

}

export async function PUT(req:Request){

}