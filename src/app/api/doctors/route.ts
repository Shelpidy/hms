import Doctor from "@/models/Doctors";
import Specialization from "@/models/Specializations";
import User from "@/models/Users";

export async function GET(req: Request){
  try {
    const doctors = await Doctor.findAll();

    const doctorsWithDetails = await Promise.all(
      doctors.map(async (doctor) => {
        const specialization = await Specialization.findOne({
          where: { specializationId: doctor.specializationId },
          attributes: ['specializationId', 'specializationName'],
        });

        const user = await User.findOne({
          where: { userId: doctor.userId },
          attributes: ['userId', 'firstName', 'lastName', 'profileImage', 'contactNumber', 'gender', 'dateOfBirth', 'address', 'email', 'role'],
        });

        return {
          doctorId: doctor.doctorId,
          specialization,
          user,
        };
      })
    );

    return new Response(JSON.stringify({ doctors: doctorsWithDetails }));
  } catch (error:any) {
    console.log(error);
    return new Response(JSON.stringify({ message: "server error", error: error.message }), { status: 500 });
  }
}


  export async function POST(req: Request){
    try {
        const data = await req.formData();
        const email =  data.get('email') as string;
        const specialization = data.get('specialization') as string;

        const spec = await Specialization.create({
            specializationName: specialization
        })
        const { specializationId } = spec.dataValues;
        
        const user = await User.findOne({where: {email: email}})
        if(!user){
            return new Response(JSON.stringify({message: "user not found"}), {status:404})
        }
        const { userId } = user.dataValues;
        const doctor = await Doctor.create({
            specializationId,
            userId,
        }) 
        return new Response(JSON.stringify({message:"new doctor added", doctor}), {status:201})
        
    } catch (error:any) {
        console.log(error);
        return new Response(JSON.stringify({message: "Something went wrong in POSTing", error: error.message}), {status: 500});
    }
  }
  
  // need to check the put request
  export async function PUT(req: Request) {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');

        if (!id) {
          return new Response(JSON.stringify({ message: 'Missing id parameter' }), {
           status: 400,
          });
        }
      const data = await req.formData();
      const doctorId = id
      const newSpecialization = data.get('Specialization') as string;
  
      // Find the doctor by doctorId
      const doctor = await Doctor.findByPk(doctorId);
  
      if (!doctor) {
        return new Response(
          JSON.stringify({ message: 'Doctor not found' }),
          {
            status: 404, // Not Found status code
          }
        );
      }
  
      // Update the specialization
      const updatedSpecialization = await Specialization.update(
        { specializationName: newSpecialization },
        { where: { specializationId: doctor.specializationId } }
      );
  
      return new Response(
        JSON.stringify({ message: 'Doctor specialization updated' ,updatedSpecialization}),
        {
          status: 200, // OK status code
        }
      );
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: 'Server error' }), {
        status: 500,
      });
    }
  }

  export async function DELETE(req: Request){
      try {
        const url = new URL(req.url)
        const id = url.searchParams.get('id');
        
        if(!id){
            return new Response(JSON.stringify({message: "missing Parameters"}), {status: 404})
        }
        const doctor = await Doctor.findOne({where:{doctorId: id}})
        if(!doctor){
             return new Response(JSON.stringify({ message: 'Doctor not found' }), {status: 404})
         }
         const { specializationId } = doctor.dataValues
         const spec = await Specialization.findOne({where:{specializationId: specializationId}})
         if(!spec){
            return new Response(JSON.stringify({ message: "specialization not found" }), { status: 404})
         }
         await spec.destroy()
         await doctor.destroy();
         return new Response(JSON.stringify({ message: 'Doctor  deleted succesfully, also its specialization'}), {status:204})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message:"Server error"}), {status:500})
    }
  }
