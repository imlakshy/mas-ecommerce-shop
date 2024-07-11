import React from 'react'

const Features = () => {
    return (
        <div className="features flex w-screen md:w-[1300px] justify-around items-center flex-wrap gap-5">
            <div className="featuresCard flex gap-5 max-w-[140px] md:max-w-[15vw] items-center justify-center">
                <img src="https://i.postimg.cc/25bLxfL9/icon.png" alt="High Quality" className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                <div>
                    <h1 className="text-sm md:text-xl ">High Quality</h1>
                    <p className="text-gray-500 text-xs md:text-base">Crafted from top quality material</p>
                </div>
            </div>
            <div className="featuresCard flex gap-5  max-w-[140px] md:max-w-[15vw] items-center justify-center">
                <img src="https://i.postimg.cc/DzhySJ3g/icon-1.png" alt="High Quality" className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                <div>
                    <h1 className="text-sm md:text-xl ">Warranty Protection</h1>
                    <p className="text-gray-500 text-xs md:text-base">Over 2 years</p>
                </div>
            </div>
            <div className="featuresCard flex gap-5  max-w-[140px] md:max-w-[15vw] items-center justify-center">
                <img src="https://i.postimg.cc/bwtWK3MC/Vector.png" alt="High Quality" className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                <div>
                    <h1 className="text-sm md:text-xl ">Free Shipping</h1>
                    <p className="text-gray-500 text-xs md:text-base">Order above ₹999</p>
                </div>
            </div>
            <div className="featuresCard flex gap-5  max-w-[140px] md:max-w-[15vw] items-center justify-center">
                <img src="https://i.postimg.cc/Fs9jtRB2/2891214031638194523-1.png" alt="High Quality" className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]" />
                <div>
                    <h1 className="text-sm md:text-xl ">24/7 Support</h1>
                    <p className="text-gray-500 text-xs md:text-base">Dedicated Support</p>
                </div>
            </div>
        </div>
    )
}

export default Features
