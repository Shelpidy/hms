import User from "@/models/Users";
import Requirer from "@/models/Requirers";

export async function GET(req: Request){
   try {
     const requirers = await Requirer.findAll()
     const requirerDetails = await Promise.all(
        requirers.map(async(requirer) => {
           const user = await User.findOne({where: {userId: requirer.userId}})

           return {
            requirer,
            user,
           }
        })
     )
     return new Response(JSON.stringify({requirers: requirerDetails}), { status:200})
   } catch (error:any) {
    console.log(error)
    return new Response(JSON.stringify({message: "server error", error: error.message}), { status:500})
   }
}

export async function POST(req: Request){
   try {
      const data = await req.json();
      const email = data.email;

      const user = await User.findOne({ where: {email: email }});
      if(!user){
        return new Response(JSON.stringify({message: "User not found"}), {status: 404})
      }
      const  userId  = user?.userId
      const requirer = await Requirer.create({
        userId
      })

      return new Response(JSON.stringify({message: "Requirer created successfully", requirer}), { status:201})

   } catch (error:any) {
    console.log(error);
    return new Response(JSON.stringify({message: "server error", error: error.message}), {status:500});
   }
}

export async function PUT(req: Request){

}

export async function DELETE(req: Request){
    try {
        const url = new URL(req.url)
        const id =  url.searchParams.get("requirerId");

        const requirer = await Requirer.findOne({where: {requirerId:id}});
        await requirer?.destroy()
        return new Response(JSON.stringify({message: "successfully deleted"}), {status:203})
    } catch (error:any) {
        console.log(error)
        return new Response(JSON.stringify({message: "server error", error: error.message}), {status:500})
    }
}