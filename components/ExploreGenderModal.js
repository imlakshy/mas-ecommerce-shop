import React from 'react'

const ExploreGenderModal = ({setshowModal}) => {
  return (
    <div className='backdrop-blur-sm w-full h-full z-10 flex justify-center items-center absolute max-w-[1300px]'>
      <div className="bg-[#f9fafb] flex gap-10 p-10 rounded-lg shadow-xl">
        
        <div className="bg-white w-[140px] md:w-[300px] rounded-lg shadow-xl cursor-pointer" onClick={()=>{setshowModal(false)}}>
          <img src="https://t.ly/tCiLV" alt="" className="w-full aspect-square object-cover object-top rounded-tr-lg rounded-tl-lg" />
          <h1 className="text-center text-3xl font-semibold text-gray-700 py-5">For Him</h1>
        </div>

        <div className="bg-white w-[140px] md:w-[300px] rounded-lg shadow-xl cursor-pointer">
          <img src="https://t.ly/HakNj" alt="" className="w-full aspect-square object-cover object-top rounded-tr-lg rounded-tl-lg" />
          <h1 className="text-center text-3xl font-semibold text-gray-700 py-5">For Him</h1>
        </div>

      </div>
    </div>
  )
}

export default ExploreGenderModal
