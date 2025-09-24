import React from 'react'

const HomePage = () => {
  return (
    <>
      <>
        <div className=''>
          <div className='flex bg-gray-2  gap-10 h-120  rounded-md p-5 shadow-lg shadow-gray-300'>
            <div className='bg-transparent'>
              <img className='h-[27rem] w-[62rem] bg-transparent' src="./Homeimg/banner4.jpg" alt="" />
            </div>
            <div className='w-auto flex flex-col mt-5'>
              <p className='text-red-500 text-3xl font-bold'>Festival Collection</p>
              <h1 className='text-[60px] font-serif '>Bring Home the Best in Fashion & Lifestyle</h1>
              <p className='text-[18px]/8 text-gray-700 mt-5'>From everyday essentials to trendsetting outfits, explore curated collections for men, women, and kids—delivered conveniently to your home.</p>
              <div className='mt-10 bg-green-400 w-30 text-center p-2 rounded-sm cursor-pointer transform duration-300 hover:-translate-y-2'>
                <button className='text-center text-white cursor-pointer'>Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default HomePage