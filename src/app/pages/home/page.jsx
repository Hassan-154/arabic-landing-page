import React from 'react'
import HeroSection from '@/app/components/HeroSection'
import About from '@/app/components/About'
import Service from '@/app/components/Service'
import Form from '@/app/components/Form'

function page() {
  return (
    <div className='overflow-x-hidden'>
      <HeroSection />
      <About />
      <Service />
      <Form/>
    </div>
  )
}

export default page