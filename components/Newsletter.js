import React from 'react'
import { Button } from "@/components/ui/button";

const Newsletter = () => {
    return (
        <div className="newletter flex justify-around items-center mt-[24px]">
            <img src="assets\Newsletter\2.png" alt="" className="hidden lg:block" />

            <div className="flex flex-col items-center justify-center">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">Subscribe To Our Newsletter</h2>

                    <p className="mx-auto max-w-screen-md text-center md:text-lg text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin </p>
                </div>

                <input type="email" placeholder="Enter Your Email Here" className="w-[calc(100%-100px)] h-10 p-5 drop-shadow-xl" />

                <Button className="mt-10 text-lg px-5 mx-10">Subscribe Now</Button>
            </div>

            <img src="assets\Newsletter\1.png" alt="" className="hidden lg:block" />
        </div>
    )
}

export default Newsletter
