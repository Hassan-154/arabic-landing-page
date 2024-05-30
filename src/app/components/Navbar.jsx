'use client';
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '@/app/context/UserContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";
import navData from '@/app/data/navbar.json'
import Logo from '@/app/assets/images/logoNav.png'

export default function Navbar() {

    const { language, setLanguage } = useContext(UserContext);
    const [nav, setNav] = useState(false);

    const handleClick = () => setNav(!nav);
    const [data, setData] = useState([])

    useEffect(() => {
        if (language === 'ar') {
            setData(navData.arabic)
        }
        else {
            setData(navData.english)
        }
    }, [language])

    return (
        <div className='fixed bg-white w-full h-[120px] navbar z-10 shadow-bottom'>
            <div className="fixed w-full max-w-6xl mx-auto left-0 right-0 h-16 mt-[50px] flex justify-between items-center px-3 text-black">
                <div className='text-darkGray cursor-pointer'>
                    {
                        language === 'ar' ? (
                            <p onClick={() => setLanguage('en')}>Change to <br /> English</p>
                        ) : (
                            <p onClick={() => setLanguage('ar')}>التغيير إلى <br /> اللغة العربية</p>
                        )
                    }
                </div>
                <ul className={`md:flex ${nav ? 'translate-x-0 text-center' : '-translate-x-full'} transform md:transform-none text-[16px] font-medium transition-transform duration-300 ease-in-out flex-col md:flex-row items-center w-full md:w-auto space-y-6 md:space-y-0 md:space-x-10 absolute md:relative bg-white md:bg-transparent top-16 md:top-0 left-0 md:left-auto md:py-0 py-4`}>
                    {
                        data?.map((item, id) => (
                            <li key={id}>
                                <Link className='cursor-pointer text-darkGray' onClick={() => setNav(false)} href={item.link}>
                                    {item.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="max-w-[40px] h-auto">
                    <Image src={Logo} alt='' />
                </div>
                <div onClick={handleClick} className="md:hidden cursor-pointer z-10">
                    {!nav ? <FaBars size={25} className='text-darkGray' /> : <FaTimes size={25} className='text-darkGray' />}
                </div>
            </div>
        </div>
    );
}
