import Patient from "@/models/Patients"
import BloodGroup from "@/models/BloodGroups";
import User from "@/models/Users";

export async function GET(req:Request){
 try {
    const patients = await Patient.findAll();
    return new Response(JSON.stringify(patients))
 } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({message: "Something went wrong in the get all patients"}),{
        status: 500
    })
 }
}

export async function POST(req: Request) {
    try {
      const data = await req.formData();
  
      const bldGroup = data.get('bloodGroup') as string;
      const email = data.get('email') as string;
      const diagnosis = data.get('diagnosis') as string;
  
      // Check if a user with the given email exists
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), {
          status: 404,
        });
      }
  
      // Check if a patient with the same email already exists
      const existingPatient = await Patient.findOne({
        where: { userId: user.userId },
      });
  
      if (existingPatient) {
        return new Response(JSON.stringify({ message: 'Patient already exists' }), {
          status: 409, // Conflict status code
        });
      }
  
      // Adding a new blood group to the database
      const bldGrp = await BloodGroup.create({
        groupName: bldGroup,
      });
      const { bloodGroupId } = bldGrp.dataValues;
  
      // Create a new patient
      const newPatient = await Patient.create({
        userId: user.userId,
        diagnosis,
        bloodGroupId,
      });
  
      return new Response(
        JSON.stringify({ message: 'New patient added successfully', newPatient }),
        {
          status: 201,
        }
      );
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ message: 'Something went wrong' }), {
        status: 500,
      });
    }
  }
  
export async function PUT(req: Request){
    try {
         const url = new URL(req.url);
         const id = url.searchParams.get('id');

         if (!id) {
           return new Response(JSON.stringify({ message: 'Missing id parameter' }), {
           status: 400,
         });
        }
        const data = await req.formData();
        
           const email = data.get('email') as string
           const diagnosis = data.get('diagnosis') as string
           const bloodGrp = data.get('bloodGroup') as string
        
        const patient = await Patient.findOne({ where: { patientId: id } });
       if (!patient) {
            return new Response(JSON.stringify({ message: 'Patient not found' }), {
           status: 404,
           });
        }
        const { bloodGroupId, userId } = patient.dataValues
        const bloodGrpTable = await BloodGroup.findOne({where: {bloodGroupId: bloodGroupId}})
        if(!bloodGrpTable) {
            return new Response(JSON.stringify({message: "BloodGroup not found"}))
        }
        await BloodGroup.update({
            groupName:bloodGrp,
            bloodGroupId,
        }, {where: {bloodGroupId: bloodGroupId}})
        
        await patient.update({
           patientId: id,
           userId,
           diagnosis,
        }, { where: { patientId: id } });

        const updatedPatient = await Patient.findOne({ where: { userId: id } });
   
        return new Response(JSON.stringify({ message: 'User updated successfully', updatedPatient }), {
         status: 200,
       });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message:"Something went wrong in PUT"}),{
            status:500
        })
    }
}

export async function DELETE(req: Request){
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        if (!id) {
          return new Response(JSON.stringify({ message: 'Missing id parameter' }), {
          status: 400,
        });
       }
       const patient = await Patient.findOne({ where: { patientId: id } });
       if (!patient) {
            return new Response(JSON.stringify({ message: 'Patient not found' }), {
           status: 404,
           });
       }
       const { bloodGroupId } = patient.dataValues;
       const singleBloodGroup = await BloodGroup.findOne({where: {bloodGroupId: bloodGroupId}})
       if(!singleBloodGroup) {
           return new Response(JSON.stringify({message: "BloodGroup not found"}))
       }
       await singleBloodGroup.destroy()
       await patient.destroy();
       return new Response(null, {
        status: 204,
      });
    } catch (error){
        console.log(error)
        return new Response(JSON.stringify({message:"Something went wrong in DELETE"}),{
            status:500
        })
    }
}