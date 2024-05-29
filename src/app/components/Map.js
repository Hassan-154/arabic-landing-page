'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from "next/image";
import UserContext from '@/app/context/UserContext';
import mapData from '@/app/data/map.json'
import map from '@/app/assets/images/saudi-arabia 1.png'
import Button from './Button';
import buttonImage from '@/app/assets/images/Vector.png'

function Map() {
  const { language, setLanguage } = useContext(UserContext);
  const [data, setData] = useState([])

  useEffect(() => {
    if (language === 'ar') {
      setData(mapData.arabic)
    } else {
      setData(mapData.english)
    }
  }, [language])

  return (
    <div className='max-w-[900px] mx-auto py-16 px-3'>
      <div className='flex gap-[10px] sm:gap-[40px] items-center'>
        <h3 className={`text-[20px] leading-[40px] md:text-[30px] font-semibold md:leading-[65px] ${language === 'en' ? 'text-left' : 'text-right'}`} itemProp="headline">{data.title}</h3>
        <div className='min-w-[260px] h-auto'>
          <Image src={map} alt="Map of Saudi Arabia" width={260} height={180} className="object-contain" />
        </div>
      </div>
      <div className='mt-3 max-w-[500px] mx-auto'>
        <Button name={data.buttonName} image={buttonImage} />
      </div>
    </div>
  )
}

export default Map