"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const LoadingFlashcardsPage = () => {
  return (
    <div className=" flex items-center justify-center">
      <Carousel className="w-full flex align-center justify-center max-w-md">
        <CarouselContent>
          <CarouselItem key="1">
            <div className="p-1">
              <Card>
                <CardContent className="w-full flex aspect-video items-center justify-center w-1 p-10">
                  <span>Loading</span>
                </CardContent>
              </Card>
              <div className="flex flex-col items-center justify-center">
                <Button>Show Answer</Button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default LoadingFlashcardsPage;
