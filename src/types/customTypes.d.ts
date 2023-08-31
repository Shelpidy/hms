
declare interface User {
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  profileImage?: string;
  contactNumber: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  address?: string;
  password: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface Admin{
     adminId: string;
     username: string;
     userId: string;
     createdAt: Date;
     updatedAt: Date;
}

declare interface Doctor{
  doctorId: string;
  specilizationId: string;
  userId:string;
  createdAt: Date;
  updatedAt: Date;
}

declare interface Appointment {
  appointmentId:string;
  appointmentStatus: 'completed' | 'pending' | 'cancel';
  doctorId:string;
  reason?: string;
  note?: string;
  patientId:string;
  appointmentDate:Date;
  createdAt: Date;
  updatedAt: Date;
}

declare interface BloodGroup {
  bloodGroupId: string;
  groupName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface BloodTransfusion {
  transfusionId: string;
  donorId:string;
  recipientId:string;
  transfusionDate: Date;
  bloodGroupId: string;
  createdAt: Date;
  updatedAt: Date;
}


declare interface Donor {
  donorId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  address: string;
  contactNumber: string;
  email: string;
  bloodGroupId?: string;
  createdAt: Date;
  updatedAt: Date;
}

declare interface Notification {
notificationId: string;
senderId: string;
receiverId: string;
title: string;
message: string;
timestamp: Date;
createdAt: Date;
updatedAt: Date;
}


declare interface Patient {
  patientId: string;
  userId: string;
  diagnosis: string;
  bloodGroupId: string;
  groupName: string;
  createdAt: Date;
  updatedAt: Date;
}

declare interface Requirer {
   requirerId: string;
   userId: string;
   createdAt: Date;
   updatedAt: Date;
}

declare interface ContactFormObject {
  fullname?: string;
  email?: string;
  subject?: string;
  message?: string;
}

declare interface Specialization{
  specializationId: string;
  specializationName: string;
  createdAt?: Date;
  updatedAt?: Date;

}

declare interface Action {
  type: string;
  payload:any;
}




