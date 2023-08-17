"use server"
import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"
import User from "@/models/Users"
 
export async function GET(request:Request) {
    try {
        const users = await User.findAll()
        return new Response(JSON.stringify({users}),{
            status: 200
        })
    } catch (error) {
        console.log(error)
    }
    
}

export async function POST(req: Request) {
  try {
    
    const data = await req.formData();
    const firstName = data.get('firstName') as string;
    const lastName = data.get('lastName') as string;
    const middleName = data.get('middleName') as string;
    const email = data.get('email') as string;
    const address = data.get('address') as string;
    const gender = data.get('gender') as 'male';
    const profileImage = data.get('profileImage') as string;
    const contactNumber = data.get('contactNumber') as string;
    const role = data.get('role') as 'patient';
    const password = data.get('password') as string;
    const dateOfBirth = data.get('dateOfBirth') as string;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 409, // Conflict status code
      });
    }
  
    // Create a new user
    const singleUser = await User.create({
      firstName,
      lastName,
      middleName,
      email,
      address,
      gender,
      profileImage,
      contactNumber,
      role,
      password,
      dateOfBirth,
    });

    return new Response(
      JSON.stringify({ message: 'User added successfully', singleUser }),
      {
        status: 201,
      }
    );
  } catch (error:any) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'Something went wrong', error: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: 'Missing id parameter' }), {
        status: 400,
      });
    }

    // Parse the incoming form data
    const data = await request.formData();
    const updatedData = {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      middleName: data.get('middleName') as string,
      email: data.get('email') as string,
      address: data.get('address') as string,
      gender: data.get('gender') as "male",
      profileImage: data.get('profileImage') as string,
      contactNumber: data.get('contactNumber') as string,
      role: data.get('role') as "patient",
      password: data.get('password') as string,
      dateOfBirth: data.get('dateOfBirth') as string,
    };

    // Find the user by id
    const user = await User.findOne({ where: { userId: id } });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    // Update user data
     await User.update(updatedData, { where: { userId: id } });

     const updatedUser = await User.findOne({ where: { userId: id } });

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


export async function DELETE(request:Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if(!id){
            return new Response(JSON.stringify({ message: 'Missing id parameter' }), {
                status: 400,
            });
        }
        // Find the user by id
        const user = await User.findOne({ where: { userId: id } });
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
            });
        }
        // Delete user
       await user.destroy();
       console.log("User deleted successfully")
       return new Response(null, {
            status: 204,
        });
        
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:"Something went wrong in the deleteRoute"}),{
            status: 500
        })
    }

}