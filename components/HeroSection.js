import React from 'react'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import ExploreGenderModal from './ExploreGenderModal';
import { useState } from 'react';

const HeroSection = () => {

    const [showModal, setshowModal] = useState(false)

    return (
        <div>
            <div className="Hero flex max-w-[1300px] justify-center gap-10 relative" >
                {showModal ? (<ExploreGenderModal setshowModal={setshowModal} />) : ("")}
                <div className="hidden lg:flex w-[392px] h-[756px] bg-[#e0e0e0] rounded-[10px] flex-col justify-end"><Image src={"/assets/Heros/h1.png"} width={426} height={150} alt="Image" /></div>

                <div className="flex flex-col lg:h-[756px] mt-5 lg:mt-0 lg:justify-between items-center">
                    <Image src={"/assets/Heros/v1.png"} width={426} height={150} alt="Image" />

                    <div className="flex flex-col justify-between items-center">
                        <Image src={"/assets/Heros/sale.png"} width={426} height={150} alt="Image" />

                        <Button className="w-[207px] mt-3 lg:mt-6 mb-4" onClick={() => setshowModal(!showModal)}>SHOP NOW</Button>
                    </div>

                    <Image src={"/assets/Heros/v2.png"} width={426} height={150} alt="Image" />
                </div>

                <div className="hidden lg:flex w-[392px] h-[756px] bg-[#e0e0e0] rounded-[10px] flex-col justify-end items-center"><Image src={"/assets/Heros/h2.png"} width={300} height={250} alt="Image" /></div>
            </div>


            <div className="logo w-[calc(100vw-40px)] xl:w-[1300px] flex justify-between items-center gap-10 lg:my-[100px] my-[50px] overflow-x-auto opacity-50">
                <Marquee pauseOnHover speed={100}>
                    <img src="/assets/Logos/1.png" alt="Logo 1" className="flex-shrink-0 mr-16" />
                    <img src="/assets/Logos/2.png" alt="Logo 2" className="flex-shrink-0 mr-16" />
                    <img src="/assets/Logos/3.png" alt="Logo 3" className="flex-shrink-0 mr-16" />
                    <img src="/assets/Logos/4.png" alt="Logo 4" className="flex-shrink-0 mr-16" />
                    <img src="/assets/Logos/5.png" alt="Logo 5" className="flex-shrink-0 mr-16" />
                </Marquee>
            </div>
        </div>
    )
}

export default HeroSection
