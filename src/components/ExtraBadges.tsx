import React from 'react'

export default function ExtraBadges() {
  return (
    <div>
         {/* Credibility Badges */}
         <div className='flex flex-row items-center justify-center gap-6 mt-24 max-w-7xl mx-auto  z-100'>
                
                <div className='flex flex-row items-start justify-center gap-4 bg-white/15 rounded-lg px-2 py-2 pr-2 max-w-lg'>
                    <div className='w-40 h-32 flex items-center justify-center bg-white rounded-lg'>
                        <img className='w-26 h-26' src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-badge-for-certified-solidworks-associate.jpeg" alt="" />
                    </div>
                    <div className='flex justify-center pt-4'>
                        <h3 className='text-lg font-bold text-white/50'>Certified SolidWorks Associate</h3>
                    </div>
                </div>
                <div className='flex flex-row items-start justify-center gap-4 bg-white/15 rounded-lg px-2 py-2 pr-2 max-w-lg'>
                    <div className='w-40 h-32 flex items-center justify-center bg-white rounded-lg'>
                        <img className='w-26 h-26' src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-badge-for-NX-design-associate.jpeg" alt="" />
                    </div>
                    <div className='flex justify-center pt-4'>
                        <h3 className='text-lg font-bold text-white/50'>CofA from Professional Engineers Ontario</h3>
                    </div>
                </div>
                <div className='flex flex-row items-start justify-center gap-4 bg-white/15 rounded-lg px-2 py-2 pr-2 max-w-lg'>
                    <div className='w-40 h-32 flex items-center justify-center bg-white rounded-lg'>
                        <img className='w-26 h-26' src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/credibility-logo-for-certificate-of-authorization-designation-from-peo.jpeg" alt="" />
                    </div>
                    <div className='flex justify-center pt-4'>
                        <h3 className='text-lg font-bold text-white/50'>NX Design Associate from Siemens</h3>
                    </div>
                </div>




            </div>
    </div>
  )
}