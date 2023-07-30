"use client"
import React from "react"
import Typography from "@mui/material/Typography"
import { IconButton,Box} from "@mui/material"
import { FacebookOutlined, Twitter, Instagram, LinkedIn, GitHub } from "@mui/icons-material"
import Link from "next/link"


function Footer() {
  return (
    <Box sx={{backgroundColor:"primary.main",width:"100vw"}} className="p-6 shadow-lg w-100 bottom-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <Box className="my-3 flex flex-col mx-5 items-start justify-start">
        <Typography sx={{ fontFamily: "Inter", fontWeight: "bold", color: "white" }} variant="h5">
          Hospital Name
        </Typography>
        {/* <Typography variant='h4' className='text-gray-400 font-semibold font-poppinsMedium'>SchoolAll</Typography> */}
        <p className="text-gray-500">
          <span>&#169; Copywrite 2023</span>
        </p>
        <Link href="/p-policy">
          <Typography className="text-gray-500 my-4">Privacy And Policies</Typography>
        </Link>
        <Link href="/copywrite">
          <Typography className="text-gray-500">Copywrite</Typography>
        </Link>
        <Link href="/terms">
          <Typography className="text-gray-500">Term of services</Typography>
        </Link>
      </Box>
      <Box className="flex flex-col items-start justify-start m-4 text-gray-300">
        <Typography className="text-white" variant='h5'>SECTIONS</Typography>
        <Link
          style={{ textDecoration: "none" }}
          className="hover:bg-customPrimary10 px-10 mx-2 py-2 rounded hover:text-gray-300"
          href="/"
        >
          Home
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="hover:bg-customPrimary10 px-10 mx-2 py-2 rounded hover:text-gray-300"
          href="/#about-us"
        >
          About Us
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="hover:bg-customPrimary10 px-10 mx-2 py-2 rounded hover:text-gray-300"
          href="/#services"
        >
          Our Services
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="hover:bg-customPrimary10 px-10 mx-2 py-2 rounded hover:text-gray-300"
          href="/#team"
        >
          Team
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          className="hover:bg-customPrimary10 px-10 mx-2 py-2 rounded hover:text-gray-300"
          href="/#contact-us"
        >
          Contact Us
        </Link>
      </Box>
      <Box className="m-4">
        <Typography variant = 'h5' className="text-white">SERVICES</Typography>
        <li className="text-gray-200 hover:bg-customPrimary10 px-10 py-2 rounded hover:text-gray-300">
          Online Payment Services
        </li>
        <li className="text-gray-200 hover:bg-customPrimary10 px-10 py-2 rounded hover:text-gray-300">
          Software Development
        </li>
        <li className="text-gray-200 hover:bg-customPrimary10 px-10 py-2 rounded hover:text-gray-300">
          School Management Services
        </li>
      </Box>
      <Box className="flex m-4 text-gray-400">
        <Box className="flex flex-row justify-start text-gray-400 items-start py-3">
          <IconButton aria-label="delete">
            <FacebookOutlined className="text-gray-400" />
          </IconButton>
          <IconButton aria-label="delete">
            <Twitter className="text-gray-400" />
          </IconButton>
          <IconButton aria-label="delete">
            <Instagram className="text-gray-400" />
          </IconButton>
          <IconButton size="medium" aria-label="delete">
            <GitHub className="text-gray-400" />
          </IconButton>
          <IconButton aria-label="delete">
            <LinkedIn className="text-gray-400" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
