"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const CartPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (<div className={`transition-all duration-500 ease-out
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

    <div className='px-4 sm:px-6 md:px-10 lg:px-20 pb-2 flex flex-col h-screen'>
      {/* Navbar */}
      <div className='py-4'>
        <div className="flex justify-center cursor-pointer" onClick={() => router.push('/')}>
          <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]" />
        </div>

        <div className='text-center text-4xl pt-2 font-extralight'>
          Your Shopping Cart
        </div>
      </div>

      <div className='flex flex-col max-h-full md:flex-row gap-6 overflow-auto lg:gap-20 flex-1'>
        {/* Cart Items */}
        <div className='w-full md:w-3/4 py-1 md:py-2 lg:py-4 md:overflow-auto'>
          {/* Item 1 */}
          <div className='border-b py-6 flex items-center min-w-[350px]'>
            <div className='h-24 md:h-36 lg:h-48 w-24 md:w-36 lg:w-48 mr-4 relative'>
              <Image
                src="/hoodie.avif"
                alt="Product Image"
                fill
                className='object-cover'
              />
            </div>
            <div className='flex flex-col justify-center flex-1 relative'>
              <span className='text-sm text-gray-700'>Zara</span>
              <span className='line-clamp-1 pb-2 lg:pb-4'>Loose fit zip through hoodie</span>

              <span className='text-gray-600 font-light text-xs'>Color: Black</span>
              <span className='text-gray-600 font-light text-xs'>Size: L</span>

              <div className='flex items-center pt-1 md:pt-2 lg:pt-4'>
                <label htmlFor="quantity" className='text-gray-600 font-light text-xs'>Qty:</label>
                <select name="quantity" id="quantity" className='bg-transparent w-7 text-xs scale-70'>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className='pt-2 md:pt-3 lg:pt-6 flex gap-2 text-xs font-semibold text-gray-500'>
                <span className='cursor-pointer hover:text-black'>Edit</span>
                |
                <span className='cursor-pointer hover:text-black'>Remove</span>
                |
                <span className='cursor-pointer hover:text-black'>Move to wishlist</span>
              </div>

              <div className='flex flex-col absolute right-2 items-end'>
                <span className='text-gray-400 line-through text-xs text-extralight'>₹5,499</span>
                <span className=''>₹3,999</span>
              </div>

            </div>
          </div>
          {/* Item 1 */}
          <div className='border-b py-6 flex items-center min-w-[350px]'>
            <div className='h-24 md:h-36 lg:h-48 w-24 md:w-36 lg:w-48 mr-4 relative'>
              <Image
                src="/hoodie.avif"
                alt="Product Image"
                fill
                className='object-cover'
              />
            </div>
            <div className='flex flex-col justify-center flex-1 relative'>
              <span className='text-sm text-gray-700'>Zara</span>
              <span className='line-clamp-1'>Loose fit zip through hoodie</span>
              <span className='font-light text-gray-500 pb-1 mb:pb-2 lg:pb-4 text-sm'>Sold by: Zara India</span>
              <span className='text-gray-600 font-light text-xs'>Color: Black</span>
              <span className='text-gray-600 font-light text-xs'>Size: L</span>

              <div className='flex items-center pt-1 md:pt-2 lg:pt-4'>
                <label htmlFor="quantity" className='text-gray-600 font-light text-xs'>Qty:</label>
                <select name="quantity" id="quantity" className='w-7 text-xs scale-70'>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className='pt-2 md:pt-3 lg:pt-6 flex gap-2 text-xs font-semibold text-gray-500'>
                <span className='cursor-pointer hover:text-black'>Edit</span>
                |
                <span className='cursor-pointer hover:text-black'>Remove</span>
                |
                <span className='cursor-pointer hover:text-black'>Move to wishlist</span>
              </div>

              <div className='flex flex-col absolute right-2 items-end'>
                <span className='text-gray-400 line-through text-xs text-extralight'>₹5,499</span>
                <span className=''>₹3,999</span>
              </div>

            </div>
          </div>


          <div className='pt-8 pb-4'>
            <span className='text-3xl font-bold'>Nothing else here</span><br />
            <span className='text-gray-500'>Find something special to add...</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className='w-full md:w-1/4 min-w-[330px] md:min-w-[270px]'>

          <div className='flex flex-col  border-black h-max'>
            <span className='text-lg sm:text-2xl font-light pb-2 md:pb-4 lg:pb-8'>Order Summary</span>

            <div className='flex flex-col gap-2'>
              <span className='font-semibold pb-1 md:pb-2 lg:pb-4 underline underline-offset-4 text-xs md:text-sm lg:text-base'>2 Item(s)</span>

              <div className='flex justify-between text-sm'><span>Total MRP</span> <span>₹14,499</span></div>
              <div className='flex justify-between text-sm'><span>Discount on MRP</span> <span className='text-primary'>-₹4,350</span></div>

              <input type="text" id='discountCoupon' placeholder='Add a coupon' className='border border-black text-primary p-2 text-sm' />

              <div className='flex justify-between text-sm'><span>Coupon Discount</span> <span className='text-primary'>-₹2,030</span></div>


              <div className='flex justify-between text-sm'>
                <span>Shipping fee</span>
                <div>
                  <span className='text-gray-400 line-through'>₹99</span>
                  <span className='font-semibold text-primary'> FREE</span>
                </div>
              </div>

              <div className='flex justify-between font-semibold border-t-2 py-2 my-2'>
                <span>Total Amount</span>
                <span>₹8,119</span></div>
            </div>
          </div>

          <div className='w-full mt-2 bg-black text-white hover:bg-gray-800 p-2 text-center text-sm cursor-pointer font-light'>Checkout</div>
          <div className='w-full mt-2 border-2 border-black p-2 text-center text-sm cursor-pointer font-light hover:bg-gray-100'>Add from wishlist</div>

        </div>
      </div>
    </div >
  </div>)
}

export default CartPage
