"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "../../app/globals.css";
import Link from "next/link";
import { useTheme } from "@mui/material";


const optionVariant = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const wrapperVariant = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

type OptionProps = {
  children: JSX.Element;
};

function Option({ children }: OptionProps) {

  const theme = useTheme()

  let classLight = "w-full bg-white flex items-center flex-row justify-center font-medium text-xl text-primary gap-2 p-1 cursor-pointer transition-colors hover:bg-indigo-100 hover:text-indigo-500 hover:rounded-md hover:p-1 hover:w-full"
  let classDark = "w-full bg-black flex items-center flex-row justify-center font-medium text-xl text-white gap-2 p-1 cursor-pointer transition-colors hover:bg-indigo-100 hover:text-indigo-500 hover:rounded-md hover:p-1 hover:w-full"
  return (
    <motion.li
      variants={optionVariant}
      className={theme.palette.mode === 'dark'?classDark:classLight}
    >
      {children}
    </motion.li>
  );
}

function NavMenuBar() {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme()
  const ulLightClass = 'p-3 absolute left-10 right-10 top-18 gap-3 rounded-md shadow-md bg-white  z-20'
  const ulDarkClass = 'p-3 border border-gray-400 border-1 absolute left-10 right-10 top-18 gap-3 rounded-md shadow-md bg-black  z-20'
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div
        className={open ? "bars-wrapper open" : "bars-wrapper"}
        onClick={handleOpen}
      >
        <span className="bar1"></span>
        <span className="bar2"></span>
        <span className="bar3"></span>
      </div>
      <motion.div initial="closed" animate={open ? "open" : "closed"} className={theme.palette.mode === 'dark'?"bg-black":"bg-white"}>
        <motion.ul
          style={{ originY: "top", zIndex: 20 }}
          className= {theme.palette.mode === 'dark'?ulDarkClass:ulLightClass}
          variants={wrapperVariant}
        >
          <Option>
            <Link href="/">Home</Link>
          </Option>
          <Option>
            <Link href="/dashboard/user">Dashboard</Link>
          </Option>
          <Option>
            <Link href="/">Doctors</Link>
          </Option>
          <Option>
            <Link href="/blogs">Blog</Link>
          </Option>
          <Option>
            <Link href="/signup">SignUp</Link>
          </Option>
          <Option>
            <Link href="/signin">SignIn</Link>
          </Option>
        </motion.ul>
      </motion.div>
    </div>
  );
}

export default NavMenuBar;
