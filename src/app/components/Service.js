'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from "next/image";
import backGround from '@/app/assets/images/Ellipse 5.png'
import serviceData from '@/app/data/service.json'
import logoData from '@/app/data/logos.json'
import UserContext from '@/app/context/UserContext';

function Service() {

    const { language, setLanguage } = useContext(UserContext);
    const [data, setData] = useState([])

    useEffect(() => {
        if (language === 'ar') {
            setData(serviceData.arabic)
        } else {
            setData(serviceData.english)
        }
    }, [language])

    console.log(data)
    console.log(logoData)

    return (
        <main className="relative pb-10">
            <Image className="ml-[250px] h-[265vh] sm:h-[195vh] w-auto" width='' height='' src={backGround} alt="Background image of كال القيمة company" />
            <div className="absolute top-0 left-0 right-0 flex flex-col justify-center pt-8 px-3">
                <article className={`flex flex-col gap-4 max-w-[900px] mx-auto text-[20px] sm:text-[24px] font-medium ${language === 'en' ? 'text-left' : 'text-right'}`}>
                    <h1 className="text-brown text-[28px] sm:text-[38px]">{data.title}</h1>
                    {data.subheadings && (
                        data.subheadings.map((item, id) => (
                            <p key={id}>{item.heading}</p>
                        ))
                    )}
                    {data.services && (
                        <ul className={`flex flex-col gap-3 mt-6 ${language === 'en' ? 'gap-3' : 'gap-3'}`}>
                            {data.services.map((item, id) => (
                                <li key={id} className='flex gap-1 text-lightBrown'>
                                    <p className={`${language === 'en' ? '' : 'hidden'}`}>{id + 1}. </p> <p>{item.service}</p> <p className={`${language === 'en' ? 'hidden' : ''}`}> .{id + 1}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </article>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[900px] mx-auto w-full mt-8">
                    {
                        logoData && logoData.map((item, id) => (
                            <div key={id}><Image src={item.url} alt='' width='150' height='150' /></div>
                        ))
                    }
                </div>

            </div>
        </main>
    )
}

export default Service;
