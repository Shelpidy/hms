"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  useMediaQuery,
  useTheme,
  Box,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import NavMenuBar from "./NavMenuBar";
import Image from "next/image";
import Link from "next/link";
import "../../app/globals.css";
import { useCurrentUser } from "@/hooks/customHooks";
import { DarkModeSharp, LightModeSharp, NotificationsActiveOutlined, NotificationsNoneOutlined, Search, ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CustomButton from "../CustomButton";


type HeaderProps = {
  setThemeMode:()=>void
}

function Header({setThemeMode}:HeaderProps) {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const theme = useTheme();
  const router = useRouter()
  const phoneView = useMediaQuery(theme.breakpoints.down("md"));
  const tabView = useMediaQuery(theme.breakpoints.down("lg"));
  const currentUser = useCurrentUser()
 
  return (
    <AppBar position="fixed" sx={{ background:theme.palette.primary.main}}>
      <Toolbar className="flex flex-row justify-between bg-transparent">
        <div className="w-20 h-5 relative">
          <Image priority fill src="../../vercel.svg" alt="Logo" />
        </div>
        {
          !tabView && 
          <ul className="flex flex-row items-center justify-evenly gap-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/dashboard/user">Dashboard</Link>
          </li>
          <li>
            <Link href="/">Doctors</Link>
          </li>
          <li>
            <Link href="/">Donors</Link>
          </li>
          <li>
            <Link href="/signup">SignUp</Link>
          </li>
          <li>
            <Link href="/signin">SignIn</Link>
          </li>
        </ul>
        }
        <Box className='flex flex-row gap-3 items-center'>
          {/* <Link  href="/search">
             <Search/>
          </Link> */}
          <Link href="/notification">
             <Badge badgeContent={10}>
              {/* <ShoppingCartCheckoutOutlined htmlColor='white'/> */}
              <NotificationsNoneOutlined htmlColor='white'/>
            </Badge> 
          </Link>
          
          <IconButton  onClick = {setThemeMode} sx={{color:"white"}}>
            {theme.palette.mode === "light"?<DarkModeSharp/>:<LightModeSharp/>}
          </IconButton>
            {/* <Button  onClick = {setThemeMode} variant='text' size='small'>Toggle Theme Mode</Button> */}
            {
              currentUser && 
              <Link href='/dashboard'>
                  <Avatar src={currentUser.profilePicture} sx={{width:25,height:25}} />
              </Link>
            }
        </Box>
    
    
        {
          tabView && <NavMenuBar />
        }
      
      </Toolbar>
    </AppBar>
  );
}

export default Header;
