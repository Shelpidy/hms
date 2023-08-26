import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const bannerImageVariant = {
   initial: {
      y: 20,
   },
   final: {
      y: 0,
   },
};

const bannerTextContentVariant = {
   initial: {
      opacity: 0,
   },
   final: {
      opacity: 1,
      transition: {
         duration: 1,
         ease: "easeInOut",
         staggerChildren: 1,
      },
   },
};
const bannerTitleVariant = {
   initial: {
      opacity: 0,
   },
   final: {
      opacity: 1,
      transition: {
         duration: 1,
         ease: "easeInOut",
         delay: 0.5,
      },
   },
};

const bannerTextVariant = {
   initial: {
      opacity: 0,
   },
   final: {
      opacity: 1,
      transition: {
         duration: 1,
         ease: "easeInOut",
      },
   },
};

<<<<<<< HEAD
  const setPrevSlide = () => {
    if(index <= 0){
      setIndex(items.length - 1)
    }else{
      setIndex(index - 1);
    } 
  };

  return (
    <Box sx={{ width: "100vw", height: "95vh" }} className="relative">
      <Image src={items[index].imageUrl} priority fill alt="Carousel Item" />
      <Box className="absolute left-10 bottom-20 p-3">
        <Typography className="text-stroke" variant="h2">
          {items[index]?.title1}
        </Typography>
        <Box className='flex flex-row items-center gap-2 my-2'>
           <CustomButton size='medium' color={theme.palette.primary.main} variant='contained'>Get Started Today</CustomButton>
           <CustomButton size='medium' color={theme.palette.primary.main} variant="outlined" >Download Brochure</CustomButton>
        </Box>
    
      </Box>
      <Box className="absolute inset-0 flex flex-row items-center justify-between px-5">
        <Button onClick={setPrevSlide}>
          <ChevronLeft className="w-6 h-6 md:w-10 md:h-10 text-white cursor-pointer" />
        </Button>
        <Button onClick={setNextSlide}>
          <ChevronRight className="w-6 h-6 md:w-10 md:h-10 text-white cursor-pointer" />
        </Button>
      </Box>
      <Box className="absolute w-full flex items-center justify-center bottom-5 p-3">
        <PositionIndicator position={index} numberOfPosition={items.length} />
      </Box>
    </Box>
)
=======
function Banner() {
   const mytheme = useTheme();
   const lessThanTab = useMediaQuery(mytheme.breakpoints.down("md"));

   let aboutImgWidth = lessThanTab ? "100vw" : "40vw";
   return (
      <div className="banner h-50 pt-10 bg-blue flex flex-col-reverse items-center justify-between md:flex-row md:h-100">
         <motion.div
            variants={bannerTextContentVariant}
            initial="initial"
            animate="final"
            className="bg-transparent mx-5 p-2 md:px-10"
         >
            <motion.h1
               variants={bannerTitleVariant}
               className="text-2xl text-white font-bold font-poppinsMedium md:text-5xl"
               color="white"
            >
               AL IMRAN CLINIC AND NURSING TRAINING INSTITUTON
            </motion.h1>
            <motion.p
               variants={bannerTextVariant}
               className="my-2 text-gray-400 text-xl font-poppinsLight"
            >
               Explore your time in health and contribute to making or
               establishing an healthy human environment.
            </motion.p>
         </motion.div>
         <img
            className="m-6 w-30"
            style={{ width: aboutImgWidth }}
            src="/hospital/banner.png"
            alt="Banner Image"
         />
      </div>
   );
>>>>>>> 1147ee3b0296db526aaa24dbb0dc4c0096f95e1a
}

export default Banner;