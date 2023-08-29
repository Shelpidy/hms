import User from "@/models/Users";
import Doctor from "@/models/Doctors";
import Patient from "@/models/Patients";
import Appointment from "@/models/Appointments";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest){
    try {
        const appointments = await Appointment.findAll();
        const appointmentDetails = await Promise.all(appointments.map(async(appointment)=>{
            let patientId = appointment.getDataValue("patientId")
            let doctorId = appointment.getDataValue("doctorId")
            let patient = await Patient.findOne({where:{patientId}})
            let doctor = await Doctor.findOne({where:{doctorId}})

            return {
                appointment : appointment.dataValues,
                doctor: doctor?.dataValues,
                patient:patient?.dataValues
            }

        }))
        
        return new Response(JSON.stringify({appointments:appointmentDetails})) 
    } catch (error) {
        console.log(error);           
        return new Response(JSON.stringify({message: "Server error", error: error}))
    }
}
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const doctoremail = data.get('doctoremail') as string;
        const patientemail = data.get('patientemail') as string;
        const reason = data.get('reasons') as string;
        const note = data.get('note') as string
        const appointmentDate = data.get('date') as string;

        return new Response(data,{status:201})
        // const doctorfromUser = await User.findOne({ where: { email: doctoremail } });
        // const patientfromUser = await User.findOne({ where: { email: patientemail } });

        // if (doctorfromUser && patientfromUser) {
        //         const doctorUserId = doctorfromUser.userId;
        //         const patientUserId = patientfromUser.userId;
            
        //         const doctor = await Doctor.findOne({ where: { userId: doctorUserId } });
        //         const patient = await Patient.findOne({ where: { userId: patientUserId } });
            
        //         if (doctor && patient) {
        //             const { doctorId } = doctor.dataValues;
        //             const { patientId } = patient.dataValues;
            
        //            const appointmentOne = await Appointment.create({
        //                 appointmentStatus: "pending",
        //                 doctorId,
        //                 reason,
        //                 note,
        //                 patientId,
        //                 appointmentDate
        //             });
            
        //             return new Response(JSON.stringify({message: "New appointment has been created", appointmentOne}), {
        //                 status:200
        //             })
        //         } else {
        //             console.log("Doctor or patient not found.");
        //             return new Response(JSON.stringify({message: "missing fields"}), {status:404})
        //         }
        //     }

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({message: "server error"}),{
            status:400
        })
    }
}


export async function PUT(req:NextRequest){
    try {
        const url = new URL(req.url);
        const appointmentId = url.searchParams.get("appointmentId");
        if(!appointmentId){
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
        },{where: {appointmentId}})

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
