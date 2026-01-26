import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useState } from 'react'
import { supabase } from '@/lib/createSupabaseClient'
import { useRouter } from 'next/navigation'

const NewArrivals = () => {
    const router = useRouter()

    const [activeButton, setactiveButton] = useState("mens");
    const [womensFashion, setWomensFashion] = useState([]);
    const [mensFashion, setMensFashion] = useState([]);
    const [discountDeals, setDiscountDeals] = useState([]);

    const formatPrice = (price) => {
        if (price == null) return "₹—";
        return `₹${Number(price).toLocaleString("en-IN")}`;
    };


    useEffect(() => {
        const fetchWomens = async () => {
            const { data, error } = await supabase.from('products').select("*").eq("gender", "Women")
            if (!error) setWomensFashion(data);
        }

        const fetchMens = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq("gender", "Men")
                .limit(8);

            if (!error) setMensFashion(data);
        };

        const fetchDiscounts = async () => {
            const { data, error } = await supabase.from("on_discount").select("*").limit(8);
            if (!error) setDiscountDeals(data);
        }

        fetchWomens();
        fetchMens();
        fetchDiscounts();
    }, [])

    return (
        <div id='newArrivals' className="newArrival">
            <div className="py-6 sm:py-8 lg:py-12">
                <div className="mx-auto xl:w-[1300px] flex flex-col items-center">
                    <div id='headings' className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">New Arrivals</h2>

                        <p className="mx-auto max-w-screen-md text-center md:text-lg text-gray-600">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
                    </div>

                    <div id='buttons' className="inline-flex w-[90vw] lg:w-[1250px] justify-around items-center gap-10 mb-10 overflow-x-auto whitespace-nowrap">
                        <div className={`text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer   transition duration-300 ${activeButton === "mens" ? "text-white bg-primary" : "text-gray-500"}`} onClick={() => setactiveButton("mens")}>Men&apos;s Fashion</div>

                        <div className={`text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer   transition duration-300 ${activeButton === "womens" ? "text-white bg-primary" : "text-gray-500"}`} onClick={() => { setactiveButton("womens") }}>Women&apos;s Fashion</div>

                        <div className={`text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer   transition duration-300 ${activeButton === "discount" ? "text-white bg-primary" : "text-gray-500"}`} onClick={() => setactiveButton("discount")}>Discount Deals</div>
                    </div>

                    {activeButton === "mens" && (<>
                        <div id='productsSection' className="products grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {mensFashion.map((item) => (
                                <div onClick={() => router.push(`/product/${item.id}`)} className='cursor-pointer'>
                                    <div className="group relative block h-50 aspect-[2/3] overflow-hidden rounded-t-lg bg-gray-100">
                                        <img src={item.images[0]} loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                        <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">{item.price < item.cost ? `-${((item.cost - item.price) / item.cost * 100).toFixed(0)}%` : 'New'}</span>
                                    </div>

                                    <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                        <div className="flex flex-col">
                                            <a href="#" className="font-bold text-gray-800 transition duration-100 line-clamp-1 hover:text-gray-500 ">{item.name}</a>
                                            <span className="text-sm text-gray-500 lg:text-base">by {item.brand}</span>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span className="font-bold ">{formatPrice(item.price)}</span>

                                            {item.cost > item.price && <span className="text-sm text-red-500 line-through">{formatPrice(item.cost)}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="text-center w-[207px] mt-4 text-lg">View More</Button>
                    </>)}

                    {activeButton === "womens" && (<>
                        <div id='productsSection' className="products grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {womensFashion.map((item) => (
                                <div>
                                    <div className="group relative block h-50 aspect-[2/3] overflow-hidden rounded-t-lg bg-gray-100">
                                        <img src={item.images[0]} loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                        <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">{item.price < item.cost ? `-${((item.cost - item.price) / item.cost * 100).toFixed(0)}%` : 'New'}</span>
                                    </div>

                                    <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                        <div className="flex flex-col">
                                            <a href="#" className="font-bold text-gray-800 transition duration-100 line-clamp-1 hover:text-gray-500 ">{item.name}</a>
                                            <span className="text-sm text-gray-500 lg:text-base">by {item.brand}</span>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span className="font-bold ">{formatPrice(item.price)}</span>

                                            {item.cost > item.price && <span className="text-sm text-red-500 line-through">{formatPrice(item.cost)}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <Button className="text-center w-[207px] mt-4 text-lg">View More</Button>
                    </>)}

                    {activeButton === "discount" && (<>
                        <div id='productsSection' className="products grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {discountDeals.map((item) => (
                                <div>
                                    <div className="group relative block h-50 aspect-[2/3] overflow-hidden rounded-t-lg bg-gray-100">
                                        <img src={item.images[0]} loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                        <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">{item.price < item.cost ? `-${((item.cost - item.price) / item.cost * 100).toFixed(0)}%` : 'New'}</span>
                                    </div>

                                    <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                        <div className="flex flex-col">
                                            <a href="#" className="font-bold text-gray-800 transition duration-100 line-clamp-1 hover:text-gray-500 ">{item.name}</a>
                                            <span className="text-sm text-gray-500 lg:text-base">by {item.brand}</span>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span className="font-bold ">{formatPrice(item.price)}</span>

                                            {item.cost > item.price && <span className="text-sm text-red-500 line-through">{formatPrice(item.cost)}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="text-center w-[207px] mt-4 text-lg">View More</Button>
                    </>)}


                </div>
            </div>
        </div>
    )
}

export default NewArrivals
