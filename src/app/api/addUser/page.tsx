import { NextApiRequest, NextApiResponse } from "next"
import User from "../../../models/Users"


const  handler = async (req: NextApiRequest,res: NextApiResponse): Promise<void> => {
    
    try {
        if(req.method === "POST") {
            if(!req.body) return res.status(401).json({message: "nothing to add to the database"});
             
            const { 
                email, 
                password,
                firstName,
                lastName,
                middleName,
                contactNumber,
                profileImage,
                address,
                 } = req.body as formDataType;

            const fileData = req.body.file
            let image = profileImage;
                  image = Buffer.from(fileData.buffer).toString('base64');
            const user = await User.create({
                email, 
                password,
                dateOfBirth: req.body.dateOfBirth,
                firstName,
                lastName,
                middleName,
                gender: req.body.gender,
                contactNumber,
                profileImage,
                role: req.body.role,
                address,

            })

            console.log("user creates successfully");
            res.status(201).json(user)
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
                    error: error
                })
    }
}

export default handler