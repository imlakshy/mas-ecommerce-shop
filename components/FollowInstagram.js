import React from 'react'
import Marquee from 'react-fast-marquee'

const FollowInstagram = () => {
    return (
        <div className="flex flex-col items-center text-center overflow-x-auto mt-[24px]">
            <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">Follow Us On Instagram</h2>

                <p className="mx-auto max-w-screen-md text-center md:text-lg text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos explicabo velit blanditiis a fuga debitis molestiae quia, nam facere hic.</p>
            </div>

            <div className='flex lg:hidden'>
                <Marquee pauseOnHover speed={50}>
                    <img src="assets/models/3.png" alt="Model" />
                    <img src="assets/models/4.png" alt="Model" />
                    <img src="assets/models/5.png" alt="Model" />
                    <img src="assets/models/6.png" alt="Model" />
                    <img src="assets/models/7.png" alt="Model" />
                    <img src="assets/models/8.png" alt="Model" />
                    <img src="assets/models/9.png" alt="Model" />
                    <img src="assets/models/6.png" alt="Model" />
                </Marquee>
            </div>
            <div className='lg:flex hidden'>
                <div className="instagramModels flex items-center mt-10 w-[calc(100vw-40px)] overflow-x-auto xl:overflow-x-hidden">

                    <img src="assets/models/3.png" alt="Model" />
                    <img src="assets/models/4.png" alt="Model" />
                    <img src="assets/models/5.png" alt="Model" />
                    <img src="assets/models/6.png" alt="Model" />
                    <img src="assets/models/7.png" alt="Model" />
                    <img src="assets/models/8.png" alt="Model" />
                    <img src="assets/models/9.png" alt="Model" />
                </div>
            </div>


        </div>
    )
}

export default FollowInstagram
