import React from 'react'
import HeroSection from '@/app/components/HeroSection'
import About from '@/app/components/About'
import Service from '@/app/components/Service'
import Form from '@/app/components/Form'
import Map from '@/app/components/Map'
import Footer from '@/app/components/Footer'

function page() {
  return (
    <div className='overflow-x-hidden'>
      <HeroSection />
      <About />
      <Service />
      <Form/>
      <Map/>
      <Footer/>
    </div>
  )
}

export default page