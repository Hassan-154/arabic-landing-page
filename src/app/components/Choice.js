import React from 'react';

function Choice({ name, className, select, onClick }) {
  return (
    <div className={`rounded-[13px] py-[8px] min-w-[145px] cursor-pointer w-full text-lightGray px-4 font-medium border-[2px] ${select ? 'border-[#BCA37E]' : 'border-[#c6c6c6]'}`} onClick={onClick}>
      <p >{name}</p>
    </div>
  );
}

export default Choice;
