"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

const WishlistPage = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (<div className={`transition-all duration-500 ease-out
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

        <div className='px-4 sm:px-6 md:px-10 lg:px-20 pb-8 flex flex-col min-h-screen'>
            {/* Navbar */}
            <div className='py-4'>
                <div className="flex justify-center cursor-pointer" onClick={() => router.push('/')}>
                    <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]" />
                </div>

                <div className='text-center text-4xl pt-2 font-extralight'>
                    Your Wishlist
                </div>
            </div>

            <div className='flex flex-col flex-1'>
                {/* Wishlist Items */}
                <div className='w-full py-1 md:py-2 lg:py-4 md:overflow-auto'>
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

                            <div className='pt-2 md:pt-3 lg:pt-6 flex gap-2 text-xs font-semibold text-gray-500 items-center'>
                                <span className='cursor-pointer hover:text-black'>Remove</span>
                                |
                                <span className='cursor-pointer hover:text-black'>Move to cart <ArrowRight className="inline-block w-4 h-4" /></span>
                            </div>

                            <div className='flex flex-col absolute right-2 items-end'>
                                <span className='text-gray-400 line-through text-xs text-extralight'>₹5,499</span>
                                <span className=''>₹3,999</span>
                            </div>

                        </div>
                    </div>

                    <div className='pt-8'>
                        <span className='text-3xl font-bold'>Nothing saved yet</span><br />
                        <span className='text-gray-500'>Add pieces you’d love to own someday.</span>
                        <span className='pt-6 block text-3xl font-bold hover:underline'>Discover pieces <ArrowRight className="inline-block w-6 h-6" /></span>
                    </div>
                </div>

                {/* You may also like these section */}
                <div className='pt-8 pb-8 border-t mt-8'>
                    <h2 className='text-2xl md:text-3xl font-light mb-6 md:mb-8'>You may also like these</h2>

                    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6'>
                        {/* Item 1 */}
                        <div className='cursor-pointer group'>
                            <div className='relative aspect-square w-full mb-2 overflow-hidden bg-gray-100'>
                                <Image
                                    src="/hoodie.avif"
                                    alt="Product Image"
                                    fill
                                    className='object-cover transition duration-200 group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-700 mb-1'>H&M</span>
                                <span className='text-xs line-clamp-1 mb-1'>Classic fit cotton t-shirt</span>
                                <div className='flex flex-col'>
                                    <span className='text-gray-400 line-through text-xs'>₹1,999</span>
                                    <span className='text-xs font-semibold'>₹1,299</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className='cursor-pointer group'>
                            <div className='relative aspect-square w-full mb-2 overflow-hidden bg-gray-100'>
                                <Image
                                    src="/hoodie.avif"
                                    alt="Product Image"
                                    fill
                                    className='object-cover transition duration-200 group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-700 mb-1'>Uniqlo</span>
                                <span className='text-xs line-clamp-1 mb-1'>Slim fit denim jacket</span>
                                <div className='flex flex-col'>
                                    <span className='text-gray-400 line-through text-xs'>₹4,999</span>
                                    <span className='text-xs font-semibold'>₹3,499</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className='cursor-pointer group'>
                            <div className='relative aspect-square w-full mb-2 overflow-hidden bg-gray-100'>
                                <Image
                                    src="/hoodie.avif"
                                    alt="Product Image"
                                    fill
                                    className='object-cover transition duration-200 group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-700 mb-1'>Levi's</span>
                                <span className='text-xs line-clamp-1 mb-1'>Regular fit cargo pants</span>
                                <div className='flex flex-col'>
                                    <span className='text-gray-400 line-through text-xs'>₹3,499</span>
                                    <span className='text-xs font-semibold'>₹2,799</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className='cursor-pointer group'>
                            <div className='relative aspect-square w-full mb-2 overflow-hidden bg-gray-100'>
                                <Image
                                    src="/hoodie.avif"
                                    alt="Product Image"
                                    fill
                                    className='object-cover transition duration-200 group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-700 mb-1'>Nike</span>
                                <span className='text-xs line-clamp-1 mb-1'>Sportswear tech fleece hoodie</span>
                                <div className='flex flex-col'>
                                    <span className='text-gray-400 line-through text-xs'>₹6,999</span>
                                    <span className='text-xs font-semibold'>₹5,499</span>
                                </div>
                            </div>
                        </div>
                        {/* Item 1 */}
                        <div className='cursor-pointer group'>
                            <div className='relative aspect-square w-full mb-2 overflow-hidden bg-gray-100'>
                                <Image
                                    src="/hoodie.avif"
                                    alt="Product Image"
                                    fill
                                    className='object-cover transition duration-200 group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-700 mb-1'>H&M</span>
                                <span className='text-xs line-clamp-1 mb-1'>Classic fit cotton t-shirt</span>
                                <div className='flex flex-col'>
                                    <span className='text-gray-400 line-through text-xs'>₹1,999</span>
                                    <span className='text-xs font-semibold'>₹1,299</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className='cursor-pointer group'>
                            <div className='relative aspect-square w-full mb-2 overflow-hidden bg-gray-100'>
                                <Image
                                    src="/hoodie.avif"
                                    alt="Product Image"
                                    fill
                                    className='object-cover transition duration-200 group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-700 mb-1'>Uniqlo</span>
                                <span className='text-xs line-clamp-1 mb-1'>Slim fit denim jacket</span>
                                <div className='flex flex-col'>
                                    <span className='text-gray-400 line-through text-xs'>₹4,999</span>
                                    <span className='text-xs font-semibold'>₹3,499</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className='cursor-pointer group'>
                            <div className='relative aspect-square w-full mb-2 overflow-hidden bg-gray-100'>
                                <Image
                                    src="/hoodie.avif"
                                    alt="Product Image"
                                    fill
                                    className='object-cover transition duration-200 group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-700 mb-1'>Levi's</span>
                                <span className='text-xs line-clamp-1 mb-1'>Regular fit cargo pants</span>
                                <div className='flex flex-col'>
                                    <span className='text-gray-400 line-through text-xs'>₹3,499</span>
                                    <span className='text-xs font-semibold'>₹2,799</span>
                                </div>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className='cursor-pointer group'>
                            <div className='relative aspect-square w-full mb-2 overflow-hidden bg-gray-100'>
                                <Image
                                    src="/hoodie.avif"
                                    alt="Product Image"
                                    fill
                                    className='object-cover transition duration-200 group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-700 mb-1'>Nike</span>
                                <span className='text-xs line-clamp-1 mb-1'>Sportswear tech fleece hoodie</span>
                                <div className='flex flex-col'>
                                    <span className='text-gray-400 line-through text-xs'>₹6,999</span>
                                    <span className='text-xs font-semibold'>₹5,499</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </div>)
}

export default WishlistPage

