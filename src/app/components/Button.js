'use client';
import React from 'react';
import Image from 'next/image';

const Button = ({ name, onClick, image }) => {
    return (
        <div className='flex items-center justify-center py-3 w-full cursor-pointer bg-darkBrown rounded-lg' onClick={onClick}>
            <p className='mr-1 text-white text-center text-[25px]'>{name}</p>
            {image && <Image src={image} alt='button image' height='28' width='28' className='ml-2' />}
        </div>
    );
};

export default Button;
