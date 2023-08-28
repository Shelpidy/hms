    import Donor from "@/models/Donors";
    import BloodGroup from "@/models/BloodGroups";

    export async function GET(request:Request) {
        try {
            const users = await Donor.findAll()
            return new Response(JSON.stringify({users}),{
                status: 200
            })
        } catch (error :any) {
            console.log(error)
            return new Response(JSON.stringify({message: "error occurred", error:error.message}),{status: 500})
            
        }
        
    }

    export async function POST(req: Request){
        try {
            const data = await req.formData()
            const firstName = data.get('firstName') as string;
            const lastName = data.get('lastName') as string;
            const middleName = data.get('middleName') as string;
            const email = data.get('email') as string;
            const dateOfBirth = data.get('dataOfBirth') as string
            const address = data.get('address') as string;
            const gender = data.get('gender') as 'male';
            const contactNumber = data.get('contactNumber') as string;
            const bloodGroup = data.get('bloodGroup') as string

            const bloodGroupOfDonor = await BloodGroup.create({
                groupName:bloodGroup
            })
            const { bloodGroupId } = bloodGroupOfDonor.dataValues

            const donor = await Donor.create({
                firstName,
                middleName,
                lastName,
                email,
                dateOfBirth,
                address,
                gender,
                contactNumber,
                bloodGroupId
            });

            return new Response(
                JSON.stringify({ message: 'Donor added successfully', donor }),
                {
                status: 201,
                }
            );

            
        } catch (error: any) {
            console.log(error)
            return new Response(JSON.stringify({message: "Server Error", error: error.message}),{status: 500})
        }
    }

    export async function PUT(req:Request){
        try {
            const url = new URL(req.url);
            const id = url.searchParams.get('id');
        
            if (!id) {
            return new Response(JSON.stringify({ message: 'Missing id parameter' }), {
                status: 400,
            });
            }
            
            const data = await req.formData();
            const updatedData = {
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            middleName: data.get('middleName') as string,
            email: data.get('email') as string,
            address: data.get('address') as string,
            gender: data.get('gender') as "male",
            contactNumber: data.get('contactNumber') as string,
            dateOfBirth: data.get('dateOfBirth') as string,
            bloodGroup: data.get('groupName') as string,
            };

            const donor = await Donor.findOne({ where: { donorId: id } });
            if (!donor) {
                return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
                });
            }

            const updatedDonorBloodGroup = await BloodGroup.update(
                { groupName: updatedData.bloodGroup, bloodGroupId:  donor.bloodGroupId},
                { where: { bloodGroupId: donor.bloodGroupId } }
            );
            
            const updatedBloodGroup = await BloodGroup.findOne({ where: { bloodGroupId: donor.bloodGroupId}})

            
            await Donor.update({updatedData, bloodGroupId: updatedBloodGroup?.bloodGroupId}, { where: { donorId: id } });

            const updatedUser = await Donor.findOne({ where: { donorId: id } });
    
        return new Response(JSON.stringify({ message: 'User updated successfully', updatedUser }), {
            status: 200,
        });
        } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
        status: 500,
        });
        }
    }

    export async function DELETE(req: Request){
        try {
            const url = new URL(req.url);
            const id = url.searchParams.get('id');
            if(!id){
                return new Response(JSON.stringify({ message: 'Missing id parameter' }), {
                    status: 400,
                });
            }

            const donor = await Donor.findOne({ where: { donorId: id } });
            if (!donor) {
                return new Response(JSON.stringify({ message: 'Donor not found' }), {
                    status: 404,
                });
            }
            const { bloodGroupId } = donor.dataValues
            const bloodGroupOfDonor = await BloodGroup.findOne({ where: {bloodGroupId: bloodGroupId}})
            if(!bloodGroupOfDonor){
                return new Response(JSON.stringify({ message: "BloodGroup not found" }), { status: 404})
            }

            await bloodGroupOfDonor.destroy()
            await donor.destroy();
        } catch (error) {
            console.log(error);
            return new Response(JSON.stringify({message:"Something went wrong in the deleteRoute"}),{
                status: 500
            })
        }
    }