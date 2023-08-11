"use client";
import React, { useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import Image from "next/image";
import "../app/globals.css";
import PositionIndicator from "./PositionIndicator";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import CustomButton from "./CustomButton";


type CarouselProps = {
  items: CarouselItem[];
};

export default function Banner({ items }: CarouselProps) {
  const [index, setIndex] = useState<number>(0);
  const theme = useTheme();

  const setNextSlide = () => {
    if(index >= items.length - 1){
      setIndex(0)
    }else{
      setIndex(index + 1);
    }
  };

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
}


