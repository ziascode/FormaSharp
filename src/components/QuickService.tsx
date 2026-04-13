import React from 'react'

function QuickService() {
  return (
            <div className='bg-primary'>

                <div className='mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 pt-16 sm:px-6 md:flex-row md:items-start md:justify-between md:gap-10'>

                <h2 className='shrink-0  text-2xl font-bold'>Our <br/>Services</h2>
                <div className='flex min-w-0 flex-1 flex-wrap items-start gap-3'>
                    <button className='button-secondary'>Product Design</button>
                    <button className='button-secondary'>Industrial Design</button>
                    <button className='button-secondary'>Mechanical Engineering & Simulation</button>
                    <button className='button-secondary'>Prototyping & 3D Printing</button>
                    <button className='button-secondary'>CAD Services</button>
                    <button className='button-secondary'>Reverse Engineering</button>
                    <button className='button-secondary'>Design for Manufacturing</button>
                </div>
                </div>
            </div>
  )
}

export default QuickService