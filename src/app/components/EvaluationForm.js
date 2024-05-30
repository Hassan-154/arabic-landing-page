'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from "next/image";
import UserContext from '@/app/context/UserContext';
import evaluationData from '@/app/data/evaluation.json'
import circle from '@/app/assets/images/Ellipse 6.png'
import Choice from '@/app/components/Choice';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
function EvaluationForm() {

  const { language, setLanguage } = useContext(UserContext);
  const [data, setData] = useState([])
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('')
  const [propertyArea, setPropertyArea] = useState(0)
  const [locationArea, setLocationArea] = useState(0)
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

    const isPropertySizeValid = propertyArea > 0;
    setvalidationForm(prevForm => prevForm.map(item => {
      if (item.name === 'propertySize') {
        return { ...item, verify: isPropertySizeValid };
      }
      return item;
    }));

    const isLocationValid = locationArea > 0;
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


  const sendEmail = async (userEmail, subject, htmlTemplate) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "kalevaluation@gmail.com",
          pass: "nffx ozog uhmt nnlv",
        }
      });
      const mailOptions = {
        from: "kalevaluation@gmail.com",
        to: userEmail,
        subject: subject,
        html: htmlTemplate,
      }
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);

    } catch (error) {
      console.log(error);
      throw new Error("Internal server Error (nodemailer)");
    }
  };

  const htmlTemplate = `
<html>
<head>
    <title>تقييم عقاري </title>
</head>
<body>
    <p>Hello</p>
    <p>put here the information user choosed</p>
    <p>Thank you!</p>
</body>
</html>
`;

  async function nowFinallySendMail(params) {
  await sendEmail("contacthdobi@gmail.com", `تقييم عقاري`, htmlTemplate);
}


  useEffect(() => {
    const isAllValid = validationForm.every(item => item.verify);
    if (isAllValid) {
      if (!isChecked) {
        console.log('make sure to agree on terms and condition.')
      }
      else {
        console.log('form can be submit now.')
        nowFinallySendMail()
      }
    } else {
      console.log('please fill the complete form.');
    }
  }, [validationForm]);

  console.log(isChecked)


  return (
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
            <Input placeholder='Example@example.com' outerClassName="max-w-[500px]" onChange={handleEmailInput} />
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
            <Input type='number' placeholder='' outerClassName="max-w-[500px]" onChange={handlePropertySize} />
          </div>
          <div className={`flex ${language === 'en' ? '' : 'justify-end'}`}>
            <div className={`flex items-center gap-1 ${language === 'en' ? 'flex-row-reverse' : ''}`}><p className='text-lightGray font-semibold pt-[7px]'>{data.mandatoryHeading}</p><p className='text-[23px]'>{data.PropertyLocation?.title}</p></div>
          </div>
          <div className={`flex min-w-full w-full mx-auto ${language === 'en' ? '' : 'justify-end'}`}>
            <Input type='number' placeholder='' outerClassName="max-w-[500px]" onChange={handleLocationArea} />
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
  )
}

export default EvaluationForm;