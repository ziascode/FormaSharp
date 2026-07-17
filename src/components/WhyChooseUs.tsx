import React from 'react'
import FeaturesSectionDemo2 from './features-section-demo-2'
import { section } from '@/lib/sectionSpacing'

function WhyChooseUs() {
  return (
    <section className={`w-full bg-[linear-gradient(to_bottom_right,#121926,#01628a)] ${section.padding}`}>
        <div className={section.container}>
            <div className="mb-10 w-full text-left md:mx-auto md:mb-16 md:max-w-4xl md:text-center">
            <span className="pill-badge">Why choose us</span>
            <h2 className='!mb-0 !max-w-none !text-3xl font-bold !leading-[1.2] text-white md:!text-5xl'>Choosing the right engineering partner can determine whether a product succeeds or struggles during development and production</h2>
            </div>
        <FeaturesSectionDemo2 />
        </div>
    </section>
  )
}

export default WhyChooseUs