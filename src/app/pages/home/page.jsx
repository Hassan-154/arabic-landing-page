import React from 'react'
import HeroSection from '@/app/components/HeroSection'
import About from '@/app/components/About'
import Service from '@/app/components/Service'
import Form from '@/app/components/Form'
import Map from '@/app/components/Map'

function page() {
  return (
    <div className='overflow-x-hidden'>
      <HeroSection />
      <About />
      <Service />
      <Form/>
      <Map/>
    </div>
  )
}

export default page