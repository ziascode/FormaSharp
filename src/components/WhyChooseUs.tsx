import React from 'react'
import FeaturesSectionDemo from './features-section-demo-3'
import FeaturesSectionDemo2 from './features-section-demo-2'

function WhyChooseUs() {
  return (
    <div className='w-full h-full bg-[linear-gradient(to_bottom_right,#121926,#01628a)] py-12 md:py-16 lg:py-24 -mt-[10vh] -mb-[10vh]'>
        <div className='mx-auto max-w-6xl flex flex-col items-center justify-center text-center'>
            <span className="pill-badge">Why choose us</span>
            <h2 className='!text-4xl font-bold !leading-[1.2] text-white md:!text-5xl'>Choosing the right engineering partner can determine whether a product succeeds or struggles during development and production</h2>
        </div>
        <FeaturesSectionDemo2 />
    </div>
  )
}

export default WhyChooseUs