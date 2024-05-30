'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from "next/image";
import UserContext from '@/app/context/UserContext';
import evaluationData from '@/app/data/evaluation.json'
import circle from '@/app/assets/images/Ellipse 6.png'
import Choice from '@/app/components/Choice';
import Input from '@/app/components/Input';
function page() {

  const { language, setLanguage } = useContext(UserContext);
  const [data, setData] = useState([])

  useEffect(() => {
    if (language === 'ar') {
      setData(evaluationData.arabic)
    } else {
      setData(evaluationData.english)
    }
  }, [language])

  function handlePurposeOfEvaluationChoice(id) {
    setData(prevData => {
      const turnedOffData = {
        ...prevData,
        purposeOfEvaluation: {
          ...prevData.purposeOfEvaluation,
          multiChoice: prevData.purposeOfEvaluation.multiChoice.map(item => ({
            ...item,
            choice: false
          }))
        }
      };
      const newMultiChoice = turnedOffData.purposeOfEvaluation.multiChoice.map(item => {
        if (item.id === id) {
          return { ...item, choice: !item.choice };
        }
        return item;
      });

      return {
        ...turnedOffData,
        purposeOfEvaluation: {
          ...turnedOffData.purposeOfEvaluation,
          multiChoice: newMultiChoice,
        },
      };
    });
  }

  function handleTypeOfProperty(id) {
    setData(prevData => {
      const turnedOffData = {
        ...prevData,
        TypeOfProperty: {
          ...prevData.TypeOfProperty,
          types: prevData.TypeOfProperty.types.map(item => ({
            ...item,
            choice: false
          }))
        }
      };
      const newTypes = turnedOffData.TypeOfProperty.types.map(item => {
        if (item.id === id) {
          return { ...item, choice: !item.choice };
        }
        return item;
      });

      return {
        ...turnedOffData,
        TypeOfProperty: {
          ...turnedOffData.TypeOfProperty,
          types: newTypes,
        },
      };
    });
  }

  return (
    <div className='pt-[200px] pb-20'>
      <h1 className='font-semibold text-[25px] text-center'>{data.title}</h1>
      <div className='flex flex-col gap-7 max-w-[900px] mx-auto text-center font-medium mt-[70px] px-3'>
        <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
          <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.subheading}</p></div>
        </div>
        <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
          <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-[20px]'>{data.allRightReserved}</p><Image src={circle} alt="" width='14' height='14' className="" /></div>
        </div>
        <div className='h-[2px] bg-lightGrayLine w-full'></div>
        <div className='flex flex-col gap-7'>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.purposeOfEvaluation?.title}</p></div>
          </div>
          <div className={`flex gap-9 ${language === 'en' ? '' : 'justify-end'}`}>
            {data.purposeOfEvaluation?.multiChoice && (
              data.purposeOfEvaluation.multiChoice.map((item, id) => (
                <div key={id}><Choice name={item.name} select={item.choice} onClick={() => handlePurposeOfEvaluationChoice(item.id)} /></div>
              ))
            )}
          </div>
          <div className='h-[2px] bg-lightGrayLine w-full'></div>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.EmailMandatory?.title}</p></div>
          </div>
          <div className={`flex min-w-full w-full mx-auto ${language === 'en' ? '' : 'justify-end'}`}>
            <Input placeholder='Example@example.com' outerClassName="max-w-[500px]" />
          </div>
          <div className='h-[2px] bg-lightGrayLine w-full'></div>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.TypeOfProperty?.title}</p></div>
          </div>
          <div className={`flex gap-9 ${language === 'en' ? '' : 'justify-end'}`}>
            {data.TypeOfProperty?.types && (
              data.TypeOfProperty.types.map((item, id) => (
                <div key={id}><Choice name={item.name} select={item.choice} onClick={() => handleTypeOfProperty(item.id)} /></div>
              ))
            )}
          </div>
          <div className='h-[2px] bg-lightGrayLine w-full'></div>
          <div><h1 className='font-semibold text-lightGray text-[25px] text-center'>{data.EstateInformation}</h1></div>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.PropertyArea?.title}</p></div>
          </div>
          <div className={`flex min-w-full w-full mx-auto ${language === 'en' ? '' : 'justify-end'}`}>
            <Input placeholder='' outerClassName="max-w-[500px]" />
          </div>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.PropertyLocation?.title}</p></div>
          </div>
          <div className={`flex min-w-full w-full mx-auto ${language === 'en' ? '' : 'justify-end'}`}>
            <Input placeholder='' outerClassName="max-w-[500px]" />
          </div>
          <div className='h-[2px] bg-lightGrayLine w-full'></div>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.GeneralDescription?.title}</p></div>
          </div>
          <div className={`flex min-w-full w-full mx-auto ${language === 'en' ? '' : 'justify-end'}`}>
            <Input placeholder='' outerClassName="max-w-[700px]" className='pb-[100px]' />
          </div>
          <div className='h-[2px] bg-lightGrayLine w-full'></div>
          <div>
            <p className={`text-[23px] sm:text-[30px] font-medium ${language === 'en' ? 'text-left' : 'text-right'}`}>{data.DataAccuracy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;