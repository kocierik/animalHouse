import React from 'react'
import ApproceCard from './common/serviceComponents/ApproceCard'
import FeatureCard from './common/serviceComponents/FeatureCard'
import ServiceCard from './common/serviceComponents/ServiceCard'

const Service = () => {
  return (
    <div data-aos="zoom-in" data-aos-duration="500">
      <div className="p-10">
        <FeatureCard />
      </div>
      <div>
        <ServiceCard />
      </div>
      <div>
        <ApproceCard />
      </div>
    </div>
  )
}

export default Service
