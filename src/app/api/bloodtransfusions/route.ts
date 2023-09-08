import Donor from "@/models/Donors";
import Requirer from "@/models/Requirers";
import User from "@/models/Users";
import BloodGroup from "@/models/BloodGroups";
import BloodTransfusion from "@/models/BloodTransfusions";


export async function GET(req: Request){
    try {
        const bloodTransfusions = await BloodTransfusion.findAll()
        const bloodTransfusionsDetails = await Promise.all(
            bloodTransfusions.map(async(transfusion) => {
                const donor = await Donor.findOne({
                    where: {donorId: transfusion.donorId},
                    attributes: ["firstName", "lastName", "middleName", "gender", "dateOfBirth", "address", "contactNumber", "email",]
                })

                const recipientAll = await Requirer.findOne({where: {requirerId: transfusion.recipientId}})
                const { userId } = recipientAll?.dataValues
                const user = await User.findOne({
                    where: {userId: userId},
                })

                const bloodGroup = await BloodGroup.findOne({
                    where: {bloodGroupId: transfusion.bloodGroupId}
                })

                return {
                    transfusion,
                    donor,
                    requirer: {user, recipientAll},
                    bloodGroup,
                    
                }
            })
        )
        return new Response(JSON.stringify({transfusions: bloodTransfusionsDetails}), { status: 200 })
    } catch (error: any) {
        console.log(error)
        return new Response(JSON.stringify({message: "server error", error: error.message}), { status:500})
    }
}

export async function POST(req: Request){
    try {
        const data = await req.json();
        const donorEmail = data.donorEmail as string;
        const transfusionDateStr = data.transfusionDate as string
        const requirerId = data.requirerId as string

        const donor = await Donor.findOne({where: {email: donorEmail}})
        if(!donor) {
            return new Response(JSON.stringify({message: "Donor is not found, put a valid email"}), {status: 404})
        }
         
        
        const { donorId, bloodGroupId } = donor?.dataValues
        const transfusionDate = new Date(transfusionDateStr);

        const bldtransfusion = await BloodTransfusion.create({
            donorId,
            transfusionDate,
            bloodGroupId,
            recipientId: requirerId,
        })

        return new Response(JSON.stringify({message: "blood transfusion created", bldtransfusion}), {status:201});
    } catch (error:any) {
        console.log(error);
        return new Response(JSON.stringify({message: "server error", error: error.message}), {status:400});
    }
}

export async function PUT(req: Request){
    try {
        const data = await req.json();
        const requirerId = data.requirerId as string;
        const transfusionId = data.transfusionId as string;
        const donorEmail = data.donorEmail as string;
        const transfusionDateStr = data.transfusionDate as string

        const donor = await Donor.findOne({where: {email: donorEmail}})
        if(!donor) {
            return new Response(JSON.stringify({message: "Donor is not found, put a valid email"}), {status: 404})
        }
         
        
        const { donorId, bloodGroupId } = donor?.dataValues
        const transfusionDate = new Date(transfusionDateStr);


        const bldtransfusion = await BloodTransfusion.update({
            donorId,
            transfusionDate,
            bloodGroupId,
            recipientId: requirerId,
        }, {where: {transfusionId}})

        return new Response(JSON.stringify({message: "updated successfully", bldtransfusion}), {status: 202})
    } catch (error: any) {
        console.log(error)
        return new Response(JSON.stringify({message: "server error", error: error.message}), {status:500})
    }
}

export async function DELETE(req: Request){
    try {
        const url = new URL(req.url)
        const id = url.searchParams.get("transfusionId")

        if(!id){
            return new Response(JSON.stringify({message: "missing Parameters"}), {status: 404})
        }

        const tranfusion = await BloodTransfusion.findOne({where: {transfusionId: id}})

        await tranfusion?.destroy()
        return new Response(JSON.stringify({message: "deleted successfully"}), {status: 203})
    } catch (error:any) {
       console.log(error);
       return new Response(JSON.stringify({message: "server error", error: error.message}), {status: 500});
    }
}