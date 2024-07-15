import React from 'react'
import { Button } from './ui/button'
import { useState } from 'react'

const NewArrivals = () => {

    const [activeButton, setactiveButton] = useState("mens");
    const [womensFashion, setwomensFashion] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const fetchWomen = async () => {

        if (!isFetched) {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            setwomensFashion(data);
            setIsFetched(true);
            console.log("fetched");
        }
    }

    return (
        <div id='newArrivals' className="newArrival">
            <div className="py-6 sm:py-8 lg:py-12">
                <div className="mx-auto xl:w-[1300px] flex flex-col items-center">
                    <div id='headings' className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">New Arrivals</h2>

                        <p className="mx-auto max-w-screen-md text-center md:text-lg text-gray-600">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
                    </div>

                    <div id='buttons' className="inline-flex w-[90vw] lg:w-[1250px] justify-between items-center gap-10 mb-10 overflow-x-auto whitespace-nowrap">
                        <div className={`text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer   transition duration-300 ${activeButton === "mens" ? "text-white bg-primary" : "text-gray-500"}`} onClick={() => setactiveButton("mens")}>Men&apos;s Fashion</div>

                        <div className={`text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer   transition duration-300 ${activeButton === "womens" ? "text-white bg-primary" : "text-gray-500"}`} onClick={() => { setactiveButton("womens"); fetchWomen() }}>Women&apos;s Fashion</div>

                        <div className={`text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer   transition duration-300 ${activeButton === "womensAccess" ? "text-white bg-primary" : "text-gray-500"}`} onClick={() => setactiveButton("womensAccess")}>Women Accessories</div>

                        <div className={`text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer   transition duration-300 ${activeButton === "mensAccess" ? "text-white bg-primary" : "text-gray-500"}`} onClick={() => setactiveButton("mensAccess")}>Men Accessories</div>

                        <div className={`text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer   transition duration-300 ${activeButton === "discount" ? "text-white bg-primary" : "text-gray-500"}`} onClick={() => setactiveButton("discount")}>Discount Deals</div>
                    </div>

                    {activeButton === "mens" && (<div id='productsSection' className="products grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div>
                            <a href="#" className="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
                            </a>

                            <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                <div className="flex flex-col">
                                    <a href="#" className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                                    <span className="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-600 lg:text-lg">$19.99</span>
                                    <span className="text-sm text-red-500 line-through">$39.99</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <a href="#" className="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
                            </a>

                            <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                <div className="flex flex-col">
                                    <a href="#" className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                                    <span className="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-600 lg:text-lg">$19.99</span>
                                    <span className="text-sm text-red-500 line-through">$39.99</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <a href="#" className="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
                            </a>

                            <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                <div className="flex flex-col">
                                    <a href="#" className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                                    <span className="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-600 lg:text-lg">$19.99</span>
                                    <span className="text-sm text-red-500 line-through">$39.99</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <a href="#" className="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
                            </a>

                            <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                <div className="flex flex-col">
                                    <a href="#" className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                                    <span className="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-600 lg:text-lg">$19.99</span>
                                    <span className="text-sm text-red-500 line-through">$39.99</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <a href="#" className="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
                            </a>

                            <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                <div className="flex flex-col">
                                    <a href="#" className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                                    <span className="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-600 lg:text-lg">$19.99</span>
                                    <span className="text-sm text-red-500 line-through">$39.99</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <a href="#" className="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
                            </a>

                            <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                <div className="flex flex-col">
                                    <a href="#" className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                                    <span className="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-600 lg:text-lg">$19.99</span>
                                    <span className="text-sm text-red-500 line-through">$39.99</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <a href="#" className="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
                            </a>

                            <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                <div className="flex flex-col">
                                    <a href="#" className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                                    <span className="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-600 lg:text-lg">$19.99</span>
                                    <span className="text-sm text-red-500 line-through">$39.99</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <a href="#" className="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                                <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
                            </a>

                            <div className="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                                <div className="flex flex-col">
                                    <a href="#" className="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                                    <span className="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-600 lg:text-lg">$19.99</span>
                                    <span className="text-sm text-red-500 line-through">$39.99</span>
                                </div>
                            </div>
                        </div>

                        <Button className="text-center w-[207px] mt-4 text-lg">View More</Button>
                    </div>)}

                    {activeButton === "womens" && (

                        womensFashion.map((item, index) => (
                            <div key={index}>
                                {item.title}
                            </div>
                        ))

                    )}

                    {activeButton === "womensAccess" && (
                        <div className='transition duration-300'>Womens Access</div>
                    )}
                    {activeButton === "mensAccess" && (
                        <div className='transition duration-300'>Mens Acess</div>
                    )}
                    {activeButton === "discount" && (
                        <div className='transition duration-300'>Bumper Discount</div>
                    )}


                </div>
            </div>
        </div>
    )
}

export default NewArrivals
