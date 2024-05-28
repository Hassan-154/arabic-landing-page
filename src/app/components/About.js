'use client'
import React, { useEffect, useContext, useState } from 'react';
import Image from "next/image";
import backGround from '@/app/assets/images/Ellipse 1.png'
import aboutData from '@/app/data/about.json'
import UserContext from '@/app/context/UserContext';

function About() {

  const { language, setLanguage } = useContext(UserContext);
  const [data, setData] = useState([])

  useEffect(() => {
    if (language === 'ar') {
      setData(aboutData.arabic)
    }
    else {
      setData(aboutData.english)
    }
  }, [language])

  return (
    <main className="relative">
      <Image className={` ${language === 'en' ? 'h-[115vh]' : 'h-[100vh]'}`}  width='full' height='full' src={backGround} alt="Background image of كال القيمة company" />
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-8">
      <article className={`flex flex-col gap-4 max-w-[900px] mx-auto text-[23px] sm:text-[30px] font-medium px-3 ${language === 'en' ? 'text-left' : 'text-right'}`}>
          <h1 className="text-brown text-[28px] sm:text-[38px] py-2">{data.title}</h1>
          {data.services && (
            <ul className={`flex flex-col gap-6 ${language === 'en' ? 'gap-3' : 'gap-6'}`}>
              {data.services.map((item, id) => (
                <li key={id}>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </main>
  )
}

export default About;