import React,{ useEffect, useState } from "react";

type CurrentUser = {
    userId:string|number,
    displayName:string,
    profilePicture:string
}
 
export function useCurrentUser():(CurrentUser | null){

    const [user,setUser] = useState<CurrentUser | null>(null)
    useEffect(()=>{
        setUser({
            userId: "ad9cf610-1703-4000-874c-dfb7be0e67dc",
            profilePicture: "https://picsum.photos/200/300",
            displayName: "Michael Johnson",
          })
    },[])
    return user
}
 
