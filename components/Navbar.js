"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "./ui/button"

const Navbar = () => {
  return (<div className="mx-auto px-5 lg:px-8 lg:pb-16 flex justify-between lg:justify-around py-4 md:py-8 items-center">
    <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]" />

    <div className="hidden lg:flex gap-12">
      <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">Home</Link>
      <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">Deals</Link>
      <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">New Arrivals</Link>
      <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">Help</Link>
    </div>

    <div className="hidden lg:flex gap-5 items-center">
      <Link href={""} className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none  transition duration-100 hover:text-primary focus-visible:ring active:text-primary md:text-base">Sign In</Link>

      <Button className="rounded-lg bg-primary px-8 py-6 text-center text-sm font-semibold text-primary-foreground outline-none  transition duration-100 hover:text-gray-700 focus-visible:ring active:bg-primary md:text-base">Sign Up</Button>
    </div>

    <button type="button" className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold focus-visible:ring active:text-primary md:text-base lg:hidden">

      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fille="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
  )
}

export default Navbar
