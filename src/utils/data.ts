import { AppointmentDetail } from "@/components/Dashboard/admin/AdminAppointmentsDisplay";

type gender = 'male'
export const appointmentDetails:AppointmentDetail[] = [
  {
    doctor: {
      doctor: {
        doctorId: "doctor1",
        specilizationId: "spec1",
        userId: "user3",
        createdAt: new Date("1013-01-01"),
        updatedAt: new Date("1013-01-01"),
      },
      user: {
        userId: "user3",
        firstName: "Alice",
        lastName: "Johnson",
        profileImage: "profile3.jpg",
        contactNumber: "555-113-4567",
        gender: "male",
        dateOfBirth: new Date("1988-07-11"),
        address: "789 Oak Ave, Village",
        password: "hashedpassword",
        email: "alicejohnson@example.com",
        role: "doctor",
        createdAt: new Date("1013-01-01"),
        updatedAt: new Date("1013-01-01"),
      },
      specilization: {
        specializationId: "spec1",
        specializationName: "Dermatology",
        createdAt: new Date("1013-01-01"),
        updatedAt: new Date("1013-01-01"),
      },
    },
    patient: {
      patient: {
        patientId: "patient1",
        userId: "user4",
        diagnosis: "Allergies",
        bloodGroupId: "group1",
        createdAt: new Date("1013-01-03"),
        updatedAt: new Date("1013-01-04"),
      },
      user: {
        userId: "user4",
        firstName: "Robert",
        lastName: "Williams",
        profileImage: "profile4.jpg",
        contactNumber: "789-555-1134",
        gender: "male",
        dateOfBirth: new Date("1991-03-18"),
        address: "567 Pine Rd, Hamlet",
        password: "hashedpassword",
        email: "robertwilliams@example.com",
        role: "patient",
        createdAt: new Date("1013-01-03"),
        updatedAt: new Date("1013-01-04"),
      },
    },
    appointment: {
      appointmentId: "appointment1",
      appointmentStatus: "pending",
      doctorId: "doctor1",
      reason: "Skin check",
      patientId: "patient1",
      appointmentDate: new Date("1013-09-10T15:30:00"),
      createdAt: new Date("1013-01-05"),
      updatedAt: new Date("1013-01-06"),
    },
  },

  {
    doctor: {
      doctor: {
        doctorId: "doctor1",
        specilizationId: "spec2",
        userId: "user3",
        createdAt: new Date("2023-02-01"),
        updatedAt: new Date("2023-02-02"),
      },
      user: {
        userId: "user3",
        firstName: "Alice",
        lastName: "Johnson",
        profileImage: "profile3.jpg",
        contactNumber: "555-123-4567",
        gender: "female",
        dateOfBirth: new Date("1988-07-12"),
        address: "789 Oak Ave, Village",
        password: "hashedpassword",
        email: "alicejohnson@example.com",
        role: "doctor",
        createdAt: new Date("2023-02-01"),
        updatedAt: new Date("2023-02-02"),
      },
      specilization: {
        specializationId: "spec2",
        specializationName: "Dermatology",
        createdAt: new Date("2023-02-01"),
        updatedAt: new Date("2023-02-02"),
      },
    },
    patient: {
      patient: {
        patientId: "patient2",
        userId: "user4",
        diagnosis: "Allergies",
        bloodGroupId: "group2",
        createdAt: new Date("2023-02-03"),
        updatedAt: new Date("2023-02-04"),
      },
      user: {
        userId: "user4",
        firstName: "Robert",
        lastName: "Williams",
        profileImage: "profile4.jpg",
        contactNumber: "789-555-1234",
        gender: "male",
        dateOfBirth: new Date("1992-03-28"),
        address: "567 Pine Rd, Hamlet",
        password: "hashedpassword",
        email: "robertwilliams@example.com",
        role: "patient",
        createdAt: new Date("2023-02-03"),
        updatedAt: new Date("2023-02-04"),
      },
    },
    appointment: {
      appointmentId: "appointment2",
      appointmentStatus: "pending",
      doctorId: "doctor2",
      reason: "Skin check",
      patientId: "patient2",
      appointmentDate: new Date("2023-09-10T15:30:00"),
      createdAt: new Date("2023-02-05"),
      updatedAt: new Date("2023-02-06"),
    },
  },
  {
    doctor: {
      doctor: {
        doctorId: "doctor1",
        specilizationId: "spec1",
        userId: "user1",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      user: {
        userId: "user1",
        firstName: "John",
        lastName: "Doe",
        profileImage: "profile1.jpg",
        contactNumber: "123-456-7890",
        gender: "male",
        dateOfBirth: new Date("1980-05-15"),
        address: "123 Main St, City",
        password: "hashedpassword",
        email: "johndoe@example.com",
        role: "doctor",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      specilization: {
        specializationId: "spec1",
        specializationName: "Cardiology",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
    },
    patient: {
      patient: {
        patientId: "patient3",
        userId: "user5",
        diagnosis: "High Blood Pressure",
        bloodGroupId: "group3",
        createdAt: new Date("2023-03-03"),
        updatedAt: new Date("2023-03-04"),
      },
      user: {
        userId: "user5",
        firstName: "Emily",
        lastName: "Clark",
        profileImage: "profile5.jpg",
        contactNumber: "987-654-7890",
        gender: "female",
        dateOfBirth: new Date("1985-09-08"),
        address: "789 Elm St, Suburb",
        password: "hashedpassword",
        email: "emilyclark@example.com",
        role: "patient",
        createdAt: new Date("2023-03-03"),
        updatedAt: new Date("2023-03-04"),
      },
    },
    appointment: {
      appointmentId: "appointment3",
      appointmentStatus: "completed",
      doctorId: "doctor1",
      reason: "Regular checkup",
      note: "Patient's condition is stable.",
      patientId: "patient3",
      appointmentDate: new Date("2023-08-15T09:30:00"),
      createdAt: new Date("2023-03-05"),
      updatedAt: new Date("2023-03-06"),
    },
  },
  // Add more appointment details here
];

  export const encodeFormData = (data: any): string =>{
    return Object.keys(data).map(key=> `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
  }

  export async function handleFormSubmitGeneral(formData: any, url: string): Promise<void>{
    try {
      const newformData = encodeFormData(formData);
      const request = await fetch(url, {
      method: "POST",
      body: newformData,
      headers: { "Content-Type": "application/x-www-form-urlencoded",},
      
      })
       const data = await request.json();
        console.log(JSON.stringify(data));
        } catch (error) {
       console.log(error);
      }
}