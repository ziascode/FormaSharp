import React from 'react'
import { div } from 'three/src/nodes/math/OperatorNode.js'

function Video() {
  return (
   <div>
    <div className='w-full h-[90vh]  bg-[url("https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/3d-design.mp4")] bg-cover bg-center'>
     <div className="h-[30vh] w-full bg-gradient-to-b from-slate-300 to-transparent"></div>
          {/* <video src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/3d-design.mp4" autoPlay loop muted playsInline className='w-full h-full object-cover' /> */}
      </div>
    </div>
  )
}

export default Video