import React from 'react'
import Image from "next/image";
import rightCircle from '@/app/assets/images/Ellipse 3.png'
import leftCircle from '@/app/assets/images/Ellipse 4.png'
import formImage from '@/app/assets/images/Bitmap 1.png'

function Form() {
    return (
        <div className='bg-[#f9f7f4] mt-[20vh] sm:mt-0'>
            <div className='relative overflow-x-hidden max-w-[1000px] mx-auto '>
                <div className='h-[50vh] md:h-[70vh] lg:h-[100vh]'></div>
                <Image className='absolute right-3 top-[200px]' src={rightCircle} alt='Right circle' width='270' height='270' />
                <Image className='absolute left-0 top-0' src={leftCircle} alt='Left circle' width='370' height='270' />
                <Image className='absolute inset-0 top-[140px] flex items-center justify-center px-3' src={formImage} alt='Form image' width='full' height='full' />
            </div>
        </div>
    )
}

export default Form