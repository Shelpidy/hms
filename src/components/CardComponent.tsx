"use client";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box  from '@mui/material/Box';
import Image from 'next/image';
export default function ImgMediaCard() {
    const imageUrl = "https://picsum.photos/381/281"
    return (
        // width354
    <Card sx={{ maxWidth: 450 }}>
      <Box
          className="relative overflow-hidden rounded-sm pt-1"
          sx={{ height: "65vh" }}
        >
          <Image fill priority alt="About Image" src={imageUrl} />
        </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
