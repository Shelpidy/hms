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
import {
  DarkModeSharp,
  LightModeSharp,
  NotificationsActiveOutlined,
  NotificationsNoneOutlined,
  Search,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import CustomButton from "../CustomButton";

type HeaderProps = {
  setThemeMode: () => void;
};

function Header({ setThemeMode }: HeaderProps) {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const theme = useTheme();
  const router = useRouter();
  const phoneView = useMediaQuery(theme.breakpoints.down("md"));
  const tabView = useMediaQuery(theme.breakpoints.down("lg"));
  const currentUser = useCurrentUser();

  return (
    <AppBar
      variant="outlined"
      position="fixed"
      sx={{ background: theme.palette.primary.main }}
    >
      <Toolbar className="flex flex-row justify-between bg-transparent">
        <div className="w-20 h-5 relative">
          <Image priority fill src="../../vercel.svg" alt="Logo" />
        </div>
        {!tabView && (
          <>
            <ul className="flex flex-row items-center justify-evenly gap-10">
              <li
                className="hover:border-b transition duration-300 ease-in-out"
                style={{
                  color: theme.palette.primary.light,
                  borderColor: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                <Link
                  href="/"
                  style={{
                    color: theme.palette.primary.light,
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Link>
              </li>
              <li
                className="hover:border-b transition duration-300 ease-in-out"
                style={{
                  color: theme.palette.primary.light,
                  borderColor: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                <Link
                  href="/doctors"
                  style={{
                    color: theme.palette.primary.light,
                    fontWeight: "bold",
                  }}
                >
                  Doctors
                </Link>
              </li>
              <li
                className="hover:border-b transition duration-300 ease-in-out"
                style={{
                  color: theme.palette.primary.light,
                  borderColor: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                <Link
                  href="/donors"
                  style={{
                    color: theme.palette.primary.light,
                    fontWeight: "bold",
                  }}
                >
                  Donors
                </Link>
              </li>
              <li
                className="hover:border-b transition duration-300 ease-in-out"
                style={{
                  color: theme.palette.primary.light,
                  borderColor: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                <Link
                  href="/signup"
                  style={{
                    color: theme.palette.primary.light,
                    fontWeight: "bold",
                  }}
                >
                  SignUp
                </Link>
              </li>
              {currentUser && (
                <li
                  className="hover:border-b transition duration-300 ease-in-out"
                  style={{
                    color: theme.palette.primary.light,
                    borderColor: theme.palette.primary.light,
                    fontWeight: "bold",
                  }}
                >
                  <Link
                    href="/"
                    style={{
                      color: theme.palette.primary.light,
                      fontWeight: "bold",
                    }}
                  >
                    SignOut
                  </Link>
                </li>
              )}
              {!currentUser && (
                <li
                  className="hover:border-b transition duration-300 ease-in-out"
                  style={{
                    color: theme.palette.primary.light,
                    borderColor: theme.palette.primary.light,
                    fontWeight: "bold",
                  }}
                >
                  <Link
                    href="/signin"
                    style={{
                      color: theme.palette.primary.light,
                      fontWeight: "bold",
                    }}
                  >
                    SignIn
                  </Link>
                </li>
              )}
            </ul>
            <Box className="flex flex-row gap-3 items-center">
              <Link href="/notification">
                <Badge badgeContent={10}>
                  {/* <ShoppingCartCheckoutOutlined htmlColor='white'/> */}
                  <NotificationsNoneOutlined htmlColor="white" />
                </Badge>
              </Link>

              <IconButton
                onClick={setThemeMode}
                sx={{ color: theme.palette.primary.light }}
              >
                {theme.palette.mode === "light" ? (
                  <DarkModeSharp />
                ) : (
                  <LightModeSharp />
                )}
              </IconButton>
              {currentUser && currentUser.role && (
                <Link href={`/dashboard/${currentUser.role}/`}>
                  <Avatar
                    src={currentUser.profilePicture}
                    sx={{ width: 25, height: 25 }}
                  />
                </Link>
              )}

              {currentUser && !currentUser.role && (
                <Link
                  href={`/dashboard/${currentUser.role}/${currentUser.userId}`}
                >
                  <Avatar
                    src={currentUser.profilePicture}
                    sx={{ width: 25, height: 25 }}
                  />
                </Link>
              )}
            </Box>
          </>
        )}
        {tabView && <NavMenuBar setThemeMode={setThemeMode} />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
