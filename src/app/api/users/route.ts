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
    
    const data = await req.json();
    const firstName = data.firstName as string;
    const lastName = data.lastName as string;
    const middleName = data.middleName as string;
    const email = data.email as string;
    const address = data.address as string;
    const gender = data.gender ;
    const profileImage = data.profileImage as string;
    const contactNumber = data.contactNumber as string;
    const role = data.role;
    const password = data.password as string;
    const dateOfBirth = data.dateOfBirth as string;

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
    const data = await request.json();
    const userId = data.userId as string;
    const updatedData = {
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      middleName: data.middleName as string,
      email: data.email as string,
      address: data.address as string,
      gender: data.gender,
      profileImage: data.profileImage as string,
      contactNumber: data.contactNumber as string,
      role: data.role,
      password: data.password as string,
      dateOfBirth: data.dateOfBirth as string,
    };

    // Find the user by id
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    // Update user data
     await User.update(updatedData, { where: { userId } });

     const updatedUser = await User.findOne({ where: { userId } });

    return new Response(JSON.stringify({ message: 'User updated successfully', updatedUser }), {
      status: 202,
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