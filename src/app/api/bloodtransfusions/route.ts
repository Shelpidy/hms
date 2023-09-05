import Donor from "@/models/Donors";
import Requirer from "@/models/Requirers";
import User from "@/models/Users";
import BloodGroup from "@/models/BloodGroups";
import BloodTransfusion from "@/models/BloodTransfusions";


export async function GET(req: Request){
    try {
        const bloodTransfusions = await BloodTransfusion.findAll()
        const bloodTransfusionsDetails = await Promise.all(
            bloodTransfusions.map(async(bldTransfusion) => {
                const donor = await Donor.findOne({
                    where: {donorId: bldTransfusion.donorId},
                    attributes: ["firstName", "lastName", "middleName", "gender", "dateOfBirth", "address", "contactNumber", "email",]
                })

                const requirer = await Requirer.findOne({where: {requirerId: bldTransfusion.recipientId}})
                const { userId } = requirer?.dataValues
                const recipient = await User.findOne({
                    where: {userId: userId},
                    attributes: ["firstName", "lastName", "middleName", "profileImage", "gender", "dateOfBirth", "address", "contactNumber", "email",]
                })

                const bloodGroup = await BloodGroup.findOne({
                    where: {bloodGroupId: bldTransfusion.bloodGroupId}
                })

                return {
                    bldTransfusion,
                    donor,
                    recipient,
                    bloodGroup,
                    
                }
            })
        )
        return new Response(JSON.stringify({tranfusions: bloodTransfusionsDetails}), { status: 200 })
    } catch (error: any) {
        console.log(error)
        return new Response(JSON.stringify({message: "server error", error: error.message}), { status:500})
    }
}

export async function POST(req: Request){
    try {
        const data = await req.json();
        const donorEmail = data.donorEmail as string;
        const requiresEmail = data.requirerEmail as string;
        const transfusionDate = data.transfusionDate as string

        const donor = await Donor.findOne({where: {email: donorEmail}})
        const requirer = await User.findOne({where: {email: requiresEmail}})
        if(!donor && !requirer) {
            return new Response(JSON.stringify({message: "Donor and User is not found, put a valid email"}), {status: 404})
        }
         
        const userId = requirer?.userId
        const recipient = await Requirer.create({ userId })
        const { donorId, bloodGroupId } = donor?.dataValues
        const { requirerId } = recipient?.dataValues

        const bldtransfusion = await BloodTransfusion.create({
            donorId,
            recipientId: requirerId,
            transfusionDate,
            bloodGroupId
        })

        return new Response(JSON.stringify({message: "blood transfusion created", bldtransfusion}), {status:201});
    } catch (error:any) {
        console.log(error);
        return new Response(JSON.stringify({message: "server error"}), {status:400});
    }
}

export async function PUT(req: Request){
    try {
        
    } catch (error) {
        
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
        const { recipientId } = tranfusion?.dataValues
        const requirer = await Requirer.findOne({where: {requirerId: recipientId}})

        await requirer?.destroy()
        await tranfusion?.destroy()
        return new Response(JSON.stringify({message: "transfusion deleted successfully"}), {status: 203})
    } catch (error:any) {
       console.log(error);
       return new Response(JSON.stringify({message: "server error", error: error.message}), {status: 500});
    }
}