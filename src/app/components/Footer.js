'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from "next/image";
import UserContext from '@/app/context/UserContext';
import footerData from '@/app/data/footer.json'
import phone from '@/app/assets/images/phone.png'
import at from '@/app/assets/images/at.png'
import locatio from '@/app/assets/images/lo.png'
import copyRight from '@/app/assets/images/c.png'
import logo from '@/app/assets/images/homeLogo.png'

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
    <div className='py-10 bg-[#BCA37E80] text-black fpnt-medium text-[14px] sm:text-[30px]'>
      <div className='max-w-[900px] mx-auto px-3'>
      <div className=''>
      <div className='flex bg-white justify-center items-center p-4 rounded-[18px] max-w-[200px] mx-auto h-auto'>
      <Image src={logo} alt='' width='' height='' />
      </div>
      </div> 
        <div className='flex flex-col justify-end gap-3 sm:gap-8 mt-10'>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex gap-1.5 items-center ${language === 'en' ? 'flex-row-reverse' : ''}`}>
              <p>{data.title}</p>
              <div className='max-w-[36px] min-w-[36px] h-auto'><Image src={phone} alt='' width='' height='' /></div>
            </div>
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
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex gap-1.5 items-center ${language === 'en' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='font-semibold'>{data.email}</p> <p>:</p> <p className='font-normal'>{data.emailTitle}</p></div>
              <div className='max-w-[36px] min-w-[36px] h-auto'><Image src={at} alt='' width='' height='' /></div>
            </div>
          </div>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex gap-1.5 items-center ${language === 'en' ? 'flex-row-reverse' : ''}`}>
              <p>{data.location}</p>
              <div className='max-w-[40px] min-w-[40px] h-auto'><Image src={locatio} alt='' width='' height='' /></div>
            </div>
          </div>
        </div>
        <div className={`flex gap-1.5 items-center mt-[40px] sm:mt-[70px] ${language === 'en' ? 'flex-row-reverse' : ''}`}>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className='max-w-[36px] min-w-[36px] h-auto'><Image src={copyRight} alt='' width='' height='' /></div>
          </div>
          <p>{data.copyRight}</p>
        </div>
      </div>
    </div>
  )
}

export default Footer