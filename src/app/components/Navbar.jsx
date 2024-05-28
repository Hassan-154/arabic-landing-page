'use client';
import React, { useContext, useState } from 'react';
import UserContext from '@/app/context/UserContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import navData from '@/app/data/navbar.json'

export default function Navbar() {
    const { language, setLanguage } = useContext(UserContext);

    const [nav, setNav] = useState(false);

    const handleClick = () => setNav(!nav);

    console.log(navData)

    return (
        <div className='fixed bg-white w-full h-16 navbar z-10'>
            <div className="fixed w-full max-w-6xl mx-auto left-0 right-0 h-16 flex justify-between items-center px-3 text-black">
                <div className="text-2xl font-bold">
                    {/* <h1>SpreeOps</h1> */}
                </div>
                <ul className={`md:flex ${nav ? 'translate-x-0 text-center' : '-translate-x-full'} transform md:transform-none text-[16.5px] font-semibold transition-transform duration-300 ease-in-out flex-col md:flex-row items-center w-full md:w-auto space-y-6 md:space-y-0 md:space-x-10 absolute md:relative bg-white md:bg-transparent top-16 md:top-0 left-0 md:left-auto md:py-0 py-4`}>
                    {/* {
                        navMenu.map((item, id) => (
                            <li key={id}>
                                <Link className='cursor-pointer' onClick={() => setNav(false)} href={item.link}>
                                    {item.title}
                                </Link>
                            </li>
                        ))
                    } */}
                </ul>
                <div onClick={handleClick} className="md:hidden cursor-pointer z-10">
                    {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
                </div>
            </div>
        </div>
    );
}
