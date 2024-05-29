'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from "next/image";
import UserContext from '@/app/context/UserContext';
import footerData from '@/app/data/footer.json'
import phone from '@/app/assets/images/phone.png'
import at from '@/app/assets/images/at.png'
import locatio from '@/app/assets/images/lo.png'
import copyRight from '@/app/assets/images/c.png'

function Footer() {

  const { language, setLanguage } = useContext(UserContext);
  const [data, setData] = useState([])

  useEffect(() => {
    if (language === 'ar') {
      setData(footerData.arabic)
    } else {
      setData(footerData.english)
    }
  }, [language])

  console.log(data)

  return (
    <div className='py-10 bg-[#BCA37E80] text-black fpnt-medium text-[23px] sm:text-[30px]'>
      <div className='max-w-[900px] mx-auto px-3'>
        <div className='flex flex-col gap-8'>
          <div className={`flex flex-row items-center ${language === 'en' ? 'flex-row-reverse' : 'justify-end'}`}>
            <p>{data.title}</p>
            <div className='max-w-[36px] min-w-[36px] h-auto'><Image src={phone} alt='' width='' height='' /></div>
          </div>
          <div>
            {data.contactNumbers && (
              <ul className='flex items-center justify-between'>
                {data.contactNumbers.map((item, id) => (
                  <li key={id} className='font-semibold'>{item.number}</li>
                ))}
              </ul>
            )}
          </div>
          <div className='flex gap-1.5 justify-end items-center'>
            <p className='font-semibold'>{data.email} : <span className='font-normal'>{data.emailTitle}</span></p>
            <div className='max-w-[36px] min-w-[36px] h-auto'><Image src={at} alt='' width='' height='' /></div>
          </div>
          <div className='flex gap-1.5 justify-end items-center'>
            <p>{data.location}</p>
            <div className='max-w-[40px] min-w-[40px] h-auto'><Image src={locatio} alt='' width='' height='' /></div>
          </div>
        </div>
        <div className='flex gap-1.5 justify-center items-center mt-[70px]'>
          <div className='max-w-[36px] min-w-[36px] h-auto'><Image src={copyRight} alt='' width='' height='' /></div>
          <p>{data.copyRight}</p>
        </div>
      </div>
    </div>
  )
}

export default Footer