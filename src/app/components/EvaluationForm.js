'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from "next/image";
import UserContext from '@/app/context/UserContext';
import evaluationData from '@/app/data/evaluation.json'
import circle from '@/app/assets/images/Ellipse 6.png'
import Choice from '@/app/components/Choice';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import topLeftCirlce from "@/app/assets/images/homeLeft.png";
import topRightCirlce from "@/app/assets/images/homeRight.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EvaluationForm() {

  const { language, setLanguage } = useContext(UserContext);
  const [data, setData] = useState([])
  const [isChecked, setIsChecked] = useState(false);
  const [pruposeOfEva, setpruposeOfEva] = useState('')
  const [typeOfProperty, settypeOfProperty] = useState('')
  const [email, setEmail] = useState('')
  const [propertyArea, setPropertyArea] = useState('')
  const [locationArea, setLocationArea] = useState('')
  const [description, setDescription] = useState('')
  const [validationForm, setvalidationForm] = useState([
    { name: 'purposeOfTheEvaluation', verify: false },
    { name: 'email', verify: false },
    { name: 'typeOfProperty', verify: false },
    { name: 'propertySize', verify: false },
    { name: 'location', verify: false },
    { name: 'description', verify: false },
  ])

  useEffect(() => {
    if (language === 'ar') {
      setData(evaluationData.arabic)
    } else {
      setData(evaluationData.english)
    }
  }, [language])

  const fillTheCompleteForm = () => toast("please fill the complete form.");
  const agreeOnTermAndCondition = () => toast("make sure to agree on terms and condition.");
  const formSubmittedSuccessfully = () => toast("form submitted successfully.");

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
          setpruposeOfEva(item.name);
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
          if (!item.choice) {
            settypeOfProperty(item.name);
          }
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleEmailInput(e) {
    const inputValue = e.target.value;
    setEmail(inputValue);
  }

  function handlePropertySize(e) {
    const inputValue = e.target.value;
    setPropertyArea(inputValue);
  }

  function handleLocationArea(e) {
    const inputValue = e.target.value;
    setLocationArea(inputValue);
  }

  function handleDescription(e) {
    const inputValue = e.target.value;
    setDescription(inputValue);
  }

  function submitTheData() {
    const isPurposeSelected = data.purposeOfEvaluation.multiChoice.some(choice => choice.choice);
    setvalidationForm(prevForm => prevForm.map(item => {
      if (item.name === 'purposeOfTheEvaluation') {
        return { ...item, verify: isPurposeSelected };
      }
      return item;
    }));

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email.trim());
    setvalidationForm(prevForm => prevForm.map(item => {
      if (item.name === 'email') {
        return { ...item, verify: isEmailValid };
      }
      return item;
    }));

    const isTypeSelected = data.TypeOfProperty.types.some(type => type.choice);
    setvalidationForm(prevForm => prevForm.map(item => {
      if (item.name === 'typeOfProperty') {
        return { ...item, verify: isTypeSelected };
      }
      return item;
    }));

    const isPropertySizeValid = propertyArea.trim() !== '';
    setvalidationForm(prevForm => prevForm.map(item => {
      if (item.name === 'propertySize') {
        return { ...item, verify: isPropertySizeValid };
      }
      return item;
    }));
    
    const isLocationValid = locationArea.trim() !== '';
    setvalidationForm(prevForm => prevForm.map(item => {
      if (item.name === 'location') {
        return { ...item, verify: isLocationValid };
      }
      return item;
    }));
    
    const isDescriptionNotEmpty = description.trim() !== '';
    setvalidationForm(prevForm => prevForm.map(item => {
      if (item.name === 'description') {
        return { ...item, verify: isDescriptionNotEmpty };
      }
      return item;
    }));
  }

  const handleToFinallySendMail = async () => {
    const data = {
      password: "2)9^Us+wCG*xe*Ik",
      purpose: pruposeOfEva,
      type: typeOfProperty,
      space: propertyArea,
      location: locationArea,
      description: description,
      email: email
    };

    try {
      const response = await fetch('https://kal-backend.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      formSubmittedSuccessfully()
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const isAllValid = validationForm.every(item => item.verify);
    if (isAllValid) {
      if (!isChecked) {
        agreeOnTermAndCondition()
      }
      else {
        handleToFinallySendMail()
      }
    } else {
      fillTheCompleteForm()
    }
  }, [validationForm]);



  return (
    <div className='relative overflow-x-hidden'>
      <div className='pt-[200px] pb-20 overflow-x-hidden'>
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
            <div className={`flex flex-wrap gap-6 ${language === 'en' ? '' : 'justify-end'}`}>
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
              <Input placeholder='Example@example.com' outerClassName="max-w-[500px]" onChange={handleEmailInput} />
            </div>
            <div className='h-[2px] bg-lightGrayLine w-full'></div>
            <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
              <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.TypeOfProperty?.title}</p></div>
            </div>
            <div className={`flex flex-wrap gap-6 ${language === 'en' ? '' : 'justify-end'}`}>
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
              <Input placeholder='' outerClassName="max-w-[500px]" value={propertyArea} onChange={handlePropertySize} />
            </div>
            <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
              <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.PropertyLocation?.title}</p></div>
            </div>
            <div className={`flex min-w-full w-full mx-auto ${language === 'en' ? '' : 'justify-end'}`}>
              <Input placeholder='' outerClassName="max-w-[500px]" value={locationArea} onChange={handleLocationArea} />
            </div>
            <div className='h-[2px] bg-lightGrayLine w-full'></div>
            <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
              <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.GeneralDescription?.title}</p></div>
            </div>
            <div className={`flex min-w-full w-full mx-auto ${language === 'en' ? '' : 'justify-end'}`}>
              <Input placeholder='' outerClassName="max-w-[700px]" className='pb-[100px]' onChange={handleDescription} />
            </div>
            <div className='h-[2px] bg-lightGrayLine w-full'></div>
            <div>
              <p className={`text-[23px] sm:text-[30px] font-medium ${language === 'en' ? 'text-left' : 'text-right'}`}>{data.DataAccuracy}</p>
            </div>
            <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
              <div className={`flex items-center gap-2.5 ${language === 'en' ? '' : ''}`}><div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px] text-lightGray'>{data.Commitment}</p></div><input className='h-[20px] w-[20px] mt-1.5 cursor-pointer !rounded-lg' type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /></div>
            </div>
            <div className='max-w-[430px] mx-auto w-full'>
              <Button name={data.EvaluationButton} onClick={submitTheData} />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[500px] absolute -top-[90px] sm:-top-[470px] -left-[0px] sm:left-0">
        <Image
          className="max-w-[300px] sm:min-w-[1000px] sm:max-w-[1000px]"
          src={topLeftCirlce}
          alt=""
        />
      </div>
      <div className="max-w-[800px] absolute -top-[240px] -right-[430px] sm:right-[100px]">
        <Image
          className="min-w-[1200px] max-w-[1200px]"
          src={topRightCirlce}
          alt=""
          width="full"
          height="full"
        />
      </div>
      <ToastContainer position="top-left" className='mt-20' />
    </div>
  )
}

export default EvaluationForm;