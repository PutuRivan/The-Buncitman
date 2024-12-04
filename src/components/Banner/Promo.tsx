"use client";

import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Coffee } from 'lucide-react';


const Promo = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClosePromo = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-neutral-0 py-1">
      <div className="container mx-auto">
        <Alert className="border-black border-2">
          <Coffee className="h-5 w-5 text-blue-500"/>
          <div className="flex items-center justify-between">
            <div>
              <AlertTitle className="text-blue-500 font-bold">
                Selamatkan Hari Anda dengan Secangkir Kopi Spesial
              </AlertTitle>
              <AlertDescription className="text-red-800">
                Diskon Hingga 50%! Segelas Kebaikan untuk Hari yang Lebih Baik
              </AlertDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClosePromo}
              className="hover:bg-red-100"
            >
              <X className="h-6 w-6 text-red-500" />
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default Promo;