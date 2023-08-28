import Appointment from "@/models/Appointments";
import Doctor from "@/models/Doctors";
import Patient from "@/models/Patients";
import User from "@/models/Users";

export async function GET(req: Request) {
  try {
    const appointments = await Appointment.findAll();

    const appointmentsWithDetails = await Promise.all(
      appointments.map(async (appointment:any) => {
        const doctor = await Doctor.findOne({
          where: { doctorId: appointment.doctorId },
        });

        const patient = await Patient.findOne({
          where: { patientId: appointment.patientId },
        });

        const doctorUser = await User.findOne({
          where: { userId: doctor?.userId },
          attributes: ['userId', 'firstName', 'lastName', 'profileImage', 'contactNumber', 'gender', 'dateOfBirth', 'address', 'email', 'role'],
        });

        const patientUser = await User.findOne({
          where: { userId: patient?.userId },
          attributes: ['userId', 'firstName', 'lastName', 'profileImage', 'contactNumber', 'gender', 'dateOfBirth', 'address', 'email', 'role'],
        });

        return {
          appointmentId: appointment.appointmentId,
          appointmentStatus: appointment.appointmentStatus,
          doctor: {
            doctorId: doctor?.doctorId,
            user: doctorUser,
          },
          patient: {
            patientId: patient?.patientId,
            user: patientUser,
          },
          reason: appointment.reason,
          note: appointment.note,
          appointmentDate: appointment.appointmentDate,
        };
      })
    );

    return new Response(JSON.stringify({ appointments: appointmentsWithDetails }));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Server error", error: error }));
  }
}

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const doctoremail = data.get('doctoremail') as string;
        const patientemail = data.get('patientemail') as string;
        const reason = data.get('reasons') as string;
        const note = data.get('note') as string
        const appointmentDate = data.get('date') as string;
        const doctorfromUser = await User.findOne({ where: { email: doctoremail } });
        const patientfromUser = await User.findOne({ where: { email: patientemail } });

        if (doctorfromUser && patientfromUser) {
                const doctorUserId = doctorfromUser.userId;
                const patientUserId = patientfromUser.userId;
            
                const doctor = await Doctor.findOne({ where: { userId: doctorUserId } });
                const patient = await Patient.findOne({ where: { userId: patientUserId } });
            
                if (doctor && patient) {
                    const { doctorId } = doctor.dataValues;
                    const { patientId } = patient.dataValues;
            
                   const appointmentOne = await Appointment.create({
                        appointmentStatus: "pending",
                        doctorId,
                        reason,
                        note,
                        patientId,
                        appointmentDate
                    });
            
                    return new Response(JSON.stringify({message: "New appointment has been created", appointmentOne}), {
                        status:200
                    })
                } else {
                    console.log("Doctor or patient not found.");
                    return new Response(JSON.stringify({message: "missing fields"}), {status:404})
                }
            }

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({message: "server error"}),{
            status:400
        })
    }
}


export async function PUT(req:Request){
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if(!id){
            return new Response(JSON.stringify({message: "missing Parameter id"}), {status:404})
        }
        const data = await req.formData();
        const reason = data.get('reason') as string;
        const note = data.get('note') as string
        const appointmentDate = data.get('appointmentdate') as string;
        const appointment = await Appointment.update({
        note: note,
        reason: reason,
        appointmentDate: appointmentDate
        },{where: {appointmentId: id}})

        return new Response(JSON.stringify({message: "appointment updated successfully",appointment}), {status: 200})
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: "Server Error", error}),{status:500})
    }
}

export async function DELETE(req:Request){
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id")
        if(!id){
            return new Response(JSON.stringify({message: "missing parameter"}),{status: 404})
        }
        const appointment = await Appointment.findOne({where: {appointmentId: id}})
        if(!appointment){
            return new Response(JSON.stringify({message: "appointment not found"}),{status: 404})
        }
        await appointment.destroy()
        return new Response(JSON.stringify({message:"appointment deleted"}) ,{status:204})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: "Server Error", error}),{status:500})
    }
}
