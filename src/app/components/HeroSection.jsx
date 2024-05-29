'use client'
import Image from "next/image";
import React, { useContext, useEffect, useState } from 'react';
import HomeLogo from "@/app/assets/images/homeLogo.png";
import topLeftCirlce from "@/app/assets/images/homeLeft.png";
import topRightCirlce from "@/app/assets/images/homeRight.png";
import UserContext from '@/app/context/UserContext';
import homeData from '../data/home.json'

export default function HeroSection() {

  const { language, setLanguage } = useContext(UserContext);
  const [data, setData] = useState('')

  useEffect(() => {
    if (language === 'ar') {
      setData(homeData.arabic)
    }
    else {
      setData(homeData.english)
    }
  }, [language])

  return (
    <div className="relative overflow-x-hidden">
      <div className="h-[97vh] max-w-[1200px] mx-auto flex justify-center items-center px-3">
        <div className="max-w-[850px] mt-[25vh]">
          <div className="max-w-[300px] mx-auto">
            <Image src={HomeLogo} alt="" />
          </div>
          <h5 className="text-[23px] sm:text-[30px] text-center font-medium mt-6">
            {data.heading}
          </h5>
        </div>
      </div>
      <div className="px-3">
        <div className="max-w-[900px] mx-auto h-[2px] bg-[#BCA37E80] w-full"></div>
      </div>
      <div className="max-w-[500px] absolute -top-[30px] sm:-top-[460px] -left-[0px] sm:left-0">
        <Image
          className="max-w-[300px] sm:min-w-[1000px] sm:max-w-[1000px]"
          src={topLeftCirlce}
          alt=""
        />
      </div>
      <div className="max-w-[800px] absolute -top-[190px] -right-[430px] sm:right-[100px]">
        <Image
          className="min-w-[1200px] max-w-[1200px]"
          src={topRightCirlce}
          alt=""
          width="full"
          height="full"
        />
      </div>
    </div>
  );
}