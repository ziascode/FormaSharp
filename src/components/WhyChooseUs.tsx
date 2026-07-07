import React from 'react'
import FeaturesSectionDemo2 from './features-section-demo-2'
import { section } from '@/lib/sectionSpacing'

function WhyChooseUs() {
  return (
    <section className={`w-full bg-[linear-gradient(to_bottom_right,#121926,#01628a)] ${section.padding}`}>
        <div className={section.container}>
            <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
            <span className="pill-badge">Why choose us</span>
            <h2 className='!mb-0 !text-4xl font-bold !leading-[1.2] text-white md:!text-5xl'>Choosing the right engineering partner can determine whether a product succeeds or struggles during development and production</h2>
            </div>
        <FeaturesSectionDemo2 />
        </div>
    </section>
  )
}

export default WhyChooseUs