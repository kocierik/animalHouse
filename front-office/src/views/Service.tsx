import React from 'react'
import CardService from './common/serviceComponents/CardService'
import FeatureCard from './common/serviceComponents/FeatureCard'

const Service = () => {
  return (
    <div data-aos="zoom-in" data-aos-duration="500">
      <div className='p-10'>
        <FeatureCard/>
      </div>
      <div>
        <CardService /> 
      </div>
    </div>
  )
}

export default Service
