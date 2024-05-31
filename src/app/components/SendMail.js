'use client'
import { useState } from 'react';

function SendMail() {
  const [email, setEmail] = useState('contacthdobi@gmail.com');
  const [fullName, setFullName] = useState('');
  const [user, setUser] = useState({});

  const sendEmail = async (userEmail, subject, htmlTemplate) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, subject, htmlTemplate }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      console.log('Email sent successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const htmlTemplate = `
    <html>
      <head>
        <title>تقييم عقاري ${email}</title>
      </head>
      <body>
        <p>Hello ${fullName},</p>
        <p>put here the information user choosed</p>
        <p>Thank you!</p>
      </body>
    </html>
  `;

  const handleSendMail = async () => {
    await sendEmail("hassanbajwa154@gmail.com", `تقييم عقاري ${email}`, htmlTemplate);
  };

  return (
    <div onClick={handleSendMail}>Send Mail</div>
  );
}

export default SendMail;