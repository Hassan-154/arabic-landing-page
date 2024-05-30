import React from 'react';

function Choice({ name, className, select, onClick }) {
  return (
    <div className={`rounded-[13px] py-[6px] cursor-pointer text-lightGray px-6 font-medium border-[2px] ${select ? 'border-[#BCA37E]' : 'border-[#c6c6c6]'}`}  onClick={onClick}>
      <p>{name}</p>
    </div>
  );
}

export default Choice;
