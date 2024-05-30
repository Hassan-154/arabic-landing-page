// components/Input.js

import React from 'react';

const Input = ({ type, placeholder, value, onChange, className, outerClassName }) => {
    return (
        <div className={`flex justify-end w-full ${outerClassName}`}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`bg-transparent w-full focus:outline-none border border-[#BCA37E] rounded-lg py-[8px] px-2 ${className}`}
            />
        </div>
    );
};

export default Input;
