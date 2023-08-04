"use server"
import User from "../models/Users";
import Patient from "../models/Patients";
import Specialization from "@/models/Specializations";
import BloodGroup from "@/models/BloodGroups";
import Doctor from "@/models/Doctors";

export async function AddPatient(patient:any) : Promise<void> {
    try {
        const bldGrp = await BloodGroup.create({
            groupName: patient.bloodGroup
        })
        console.log("blood group created", bldGrp.toJSON())
        const { bloodGroupId } = bldGrp.dataValues;
        const user = await User.findOne({ where: {email: patient?.email}});
        if (user) {
          const { userId } = user.dataValues;
          const newPatient = await Patient.create({
            userId,
            diagnosis: patient.diagnosis,
            bloodGroupId
          })

          console.log("new patient created",  newPatient.toJSON());
        }
        else{
            console.log("user not found", patient.email);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function AddSpec(specialization: string): Promise<void> {
   try {
       
    } catch (error) {
       console.log(error);
   }
}

export async function AddDoctors({ email, specialization}: {
    email: string,
    specialization: string
}): Promise<void> {
    try {
        const spec = await Specialization.create({
            specializationName: specialization
           })
           console.log("Specialization added",spec.toJSON());
        const { specializationId } = spec.dataValues
        const user = await User.findOne({ where: {email: email }});
        if(user){
            const { userId } = user.dataValues
            const doctor = await Doctor.create({
            userId,
            specializationId,
        })

        console.log("new Doctor created", doctor.toJSON());
        }
        else{
            console.log("user not found", email)
        }
    } catch (error) {
        console.log(error);
    }
}