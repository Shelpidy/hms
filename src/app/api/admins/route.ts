import Admin from "@/models/Admins";
import User from "@/models/Users";

export async function GET(req: Request){
  try {
    const admins = await Admin.findAll();

    const adminsWithDetails = await Promise.all(
      admins.map(async (admin:any) => {
        const user = await User.findOne({
        where: {userId: admin.userId},
        attributes: ['userId', 'firstName', 'lastName', 'profileImage', 'contactNumber', 'gender', 'dateOfBirth', 'address', 'email', 'role'],
        });

        return {
          adminId: admin.adminId,
          username: admin.username,
          user,
        };
      })
    );

    return new Response(JSON.stringify({ admins: adminsWithDetails }));
  } catch (error:any) {
    console.log(error);
    return new Response(JSON.stringify({ message: "server error", error: error.message }), { status: 500 });
  }
}


export async function POST(req:Request){
    try {
        const data = await req.formData();
        const username = data.get('username') as string;
        const email = data.get('email') as string;

        const user = await User.findOne({where: {email: email}})
        if(!user){
            return new Response(JSON.stringify({message: "User not found"}))
        }
        const { userId } = user?.dataValues;
        const singleAdmin = await Admin.create({
            username,
            userId
        })
        return new Response(JSON.stringify({message:"new Admin created", singleAdmin}))
    } catch (error:any) {
        console.log(error);
        return new Response(JSON.stringify({message: "something went wrong in the POST request", errror: error.message}), {status:500})
    }
}

//// need to create the logic for the put
export async function PUT(req:Request){
    try {
        const url = new URL(req.url)
        const id = url.searchParams.get('id')
        if(!id){
            return new Response(JSON.stringify({message:"missing parameters"}), {status:404})
        }
        const data = await req.formData()
        const username = data.get('username') as string
        const updatedAdmin = await Admin.update({
         username
        }, {where: {adminId:id}})

        return new Response(JSON.stringify({message: "admin updated successfully", updatedAdmin}), {status:201})
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "something went wrong in the POST request"}), {status:500})
    }
}

export async function DELETE(req:Request) {
    try {
        const url = new URL(req.url)
        const id = url.searchParams.get('id')
        if(!id){
            return new Response(JSON.stringify({message: "Missing parameter id"}), {status:404})
        }
        const admin = await Admin.findOne({where: {adminId: id}})
        if(!admin){
           return new Response(JSON.stringify({message: "missing admin"}), {status:404})
        }
        await admin.destroy();
        return new Response(JSON.stringify({message: "admin deleted"}), {status:200})
    } catch (error:any) {
        console.log(error);
        return new Response(JSON.stringify({message: "something went wrong in the DELETE request", error: error.message}), {status:500})
    }
}