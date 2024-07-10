import Image from "next/image";
import { Button, Input } from "@/components/ui/button";

export default function Home() {
  return (<div className="flex flex-col items-center gap-10 px-5">
    <div className="Hero flex max-w-[1300px] justify-center gap-10">
      <div className="hidden lg:flex w-[392px] h-[756px] bg-[#e0e0e0] rounded-[10px] flex-col justify-end"><Image src={"/assets/Heros/h1.png"} width={426} height={150} alt="Image" /></div>

      <div className="flex flex-col lg:h-[756px] mt-5 lg:mt-0 lg:justify-between items-center">
        <Image src={"/assets/Heros/v1.png"} width={426} height={150} alt="Image" />

        <div className="flex flex-col justify-between items-center">
          <Image src={"/assets/Heros/sale.png"} width={426} height={150} alt="Image" />
          <Button className="w-[207px] mt-3 lg:mt-6 mb-4">SHOP NOW</Button>
        </div>

        <Image src={"/assets/Heros/v2.png"} width={426} height={150} alt="Image" />
      </div>

      <div className="hidden lg:flex w-[392px] h-[756px] bg-[#e0e0e0] rounded-[10px] flex-col justify-end items-center"><Image src={"/assets/Heros/h2.png"} width={300} height={250} alt="Image" /></div>
    </div>

    <div className="logo xl:w-[1300px] flex justify-between items-center gap-10 lg:my-[100px] my-[50px] overflow-x-auto opacity-50">
      <img src="/assets/Logos/1.png" alt="Logo 1" className="flex-shrink-0" />
      <img src="/assets/Logos/2.png" alt="Logo 2" className="flex-shrink-0" />
      <img src="/assets/Logos/3.png" alt="Logo 3" className="flex-shrink-0" />
      <img src="/assets/Logos/4.png" alt="Logo 4" className="flex-shrink-0" />
      <img src="/assets/Logos/5.png" alt="Logo 5" className="flex-shrink-0" />
    </div>

    <div className="deals flex flex-col lg:flex-row items-center max-w-[1300px] gap-10">
      <div className="w-screen lg:w-[40%] px-5 lg:px-0">
        <h1 className="text-4xl font-bold">Deals Of The Month</h1>
        <p className="my-10 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum magni saepe dolores ipsam mollitia tempore ducimus molestiae corrupti error veniam?</p>
        <Button className="mb-10">Buy Now</Button>
        <h2 className="text-3xl">Hurry, Before It&apos;s Too Late!</h2>
      </div>

      <div className="flex gap-5 w-[calc(100vw-20px)] lg:w-[60%] overflow-x-hidden hide-scrollbar relative">
        <div className="h-[450px] w-auto aspect-[2/3] relative">
          <img className="w-full h-full object-cover object-top" src="https://i.postimg.cc/63DJnXdf/1.png" alt="Deal 1" />

          <div className="dealinfo bg-white inline-block px-7 py-3 bottom-5 left-5 absolute">
            <h3 className="font-light text-sm">01- Spring Sale</h3>
            <h1 className="text-2xl">30% Off</h1>
          </div>
        </div>
        <div className="h-[350px] w-auto aspect-[2/3]"><img className="w-full h-full object-cover object-top" src="https://i.postimg.cc/FKwNg3vS/2.png" alt="Deal 2" /></div>

        <div className="h-[350px] w-auto aspect-[2/3]"><img className="w-full h-full object-cover object-top" src="https://i.postimg.cc/qvN4JdhL/image-2.png" alt="Deal 3" /></div>

        <div className="h-[350px] w-auto aspect-[2/3]"><img className="w-full h-full object-cover object-top" src="https://i.postimg.cc/FKwNg3vS/2.png" alt="Deal 2" /></div>

        <div className="h-[350px] w-auto aspect-[2/3]"><img className="w-full h-full object-cover object-top" src="https://i.postimg.cc/qvN4JdhL/image-2.png" alt="Deal 3" /></div>

        <div className="inicators w-[100px] flex gap-2 absolute bottom-0 right-0">
          <div className="cursor-pointer w-[10px] h-[10px] bg-[#b6b6b6] rounded-full active"></div>
          <div className="cursor-pointer w-[10px] h-[10px] bg-[#b6b6b6] rounded-full"></div>
          <div className="cursor-pointer w-[10px] h-[10px] bg-[#b6b6b6] rounded-full"></div>
          <div className="cursor-pointer w-[10px] h-[10px] bg-[#b6b6b6] rounded-full"></div>
        </div>
      </div>
    </div>

    <div className="newArrival">
      <div class="py-6 sm:py-8 lg:py-12">
        <div class="mx-auto xl:w-[1300px] flex flex-col items-center">
          <div class="mb-10 md:mb-16">
            <h2 class="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">New Arrivals</h2>

            <p class="mx-auto max-w-screen-md text-center md:text-lg text-gray-600">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
          </div>

          <div className="flex w-[90vw] lg:w-[1250px] justify-between items-center gap-10 mb-10 overflow-x-auto">
            <div className="w-[207px] text-lg text-center rounded-lg p-2 cursor-pointer  text-gray-500">Men&apos;s Fashion</div>
            <div className="w-[207px] text-lg text-center rounded-lg p-2 cursor-pointer text-white bg-primary">Women&apos;s Fashion</div>
            <div className="w-[207px] text-lg text-center rounded-lg p-2 cursor-pointer text-gray-500">Women Accessories</div>
            <div className="w-[207px] text-lg text-center rounded-lg p-2 cursor-pointer text-gray-500">Men Accessories</div>
            <div className="w-[207px] text-lg text-center rounded-lg p-2 cursor-pointer text-gray-500">Discount Deals</div>
          </div>

          <div class="products grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div>
              <a href="#" class="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <span class="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              </a>

              <div class="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div class="flex flex-col">
                  <a href="#" class="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                  <span class="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="font-bold text-gray-600 lg:text-lg">$19.99</span>
                  <span class="text-sm text-red-500 line-through">$39.99</span>
                </div>
              </div>
            </div>

            <div>
              <a href="#" class="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <span class="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              </a>

              <div class="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div class="flex flex-col">
                  <a href="#" class="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                  <span class="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="font-bold text-gray-600 lg:text-lg">$19.99</span>
                  <span class="text-sm text-red-500 line-through">$39.99</span>
                </div>
              </div>
            </div>
            <div>
              <a href="#" class="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <span class="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              </a>

              <div class="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div class="flex flex-col">
                  <a href="#" class="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                  <span class="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="font-bold text-gray-600 lg:text-lg">$19.99</span>
                  <span class="text-sm text-red-500 line-through">$39.99</span>
                </div>
              </div>
            </div>

            <div>
              <a href="#" class="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <span class="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              </a>

              <div class="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div class="flex flex-col">
                  <a href="#" class="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                  <span class="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="font-bold text-gray-600 lg:text-lg">$19.99</span>
                  <span class="text-sm text-red-500 line-through">$39.99</span>
                </div>
              </div>
            </div>
            <div>
              <a href="#" class="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <span class="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              </a>

              <div class="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div class="flex flex-col">
                  <a href="#" class="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                  <span class="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="font-bold text-gray-600 lg:text-lg">$19.99</span>
                  <span class="text-sm text-red-500 line-through">$39.99</span>
                </div>
              </div>
            </div>

            <div>
              <a href="#" class="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <span class="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              </a>

              <div class="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div class="flex flex-col">
                  <a href="#" class="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                  <span class="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="font-bold text-gray-600 lg:text-lg">$19.99</span>
                  <span class="text-sm text-red-500 line-through">$39.99</span>
                </div>
              </div>
            </div>
            <div>
              <a href="#" class="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <span class="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              </a>

              <div class="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div class="flex flex-col">
                  <a href="#" class="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                  <span class="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="font-bold text-gray-600 lg:text-lg">$19.99</span>
                  <span class="text-sm text-red-500 line-through">$39.99</span>
                </div>
              </div>
            </div>

            <div>
              <a href="#" class="group relative block h-70 w-auto overflow-hidden rounded-t-lg bg-gray-100">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <span class="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
              </a>

              <div class="flex w-auto items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
                <div class="flex flex-col">
                  <a href="#" class="font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-lg">Fancy Outfit</a>
                  <span class="text-sm text-gray-500 lg:text-base">by Fancy Brand</span>
                </div>

                <div class="flex flex-col items-end">
                  <span class="font-bold text-gray-600 lg:text-lg">$19.99</span>
                  <span class="text-sm text-red-500 line-through">$39.99</span>
                </div>
              </div>
            </div>


          </div>

          <Button className="w-[207px] mt-4 text-lg">View More</Button>
        </div>
      </div>
    </div>

    <div className="features flex w-screen md:w-[1300px] justify-around items-center flex-wrap gap-5 lg:mb-[100px] mb-[50px] overflow-x-auto">
      <div className="featuresCard flex gap-5 w-[175px] md:w-[15vw] items-center justify-center">
        <img src="https://i.postimg.cc/25bLxfL9/icon.png" alt="High Quality" className="w-[50px] h-[50px]" />
        <div>
          <h1 className="text-lg md:text-xl ">High Quality</h1>
          <p className="text-gray-500 text-sm md:text-base">Crafted from top quality material</p>
        </div>
      </div>
      <div className="featuresCard flex gap-5  w-[175px] md:w-[15vw] items-center justify-center">
        <img src="https://i.postimg.cc/DzhySJ3g/icon-1.png" alt="High Quality" className="w-[50px] h-[50px]" />
        <div>
          <h1 className="text-lg md:text-xl ">Warranty Protection</h1>
          <p className="text-gray-500 text-sm md:text-base">Over 2 years</p>
        </div>
      </div>
      <div className="featuresCard flex gap-5  w-[175px] md:w-[15vw] items-center justify-center">
        <img src="https://i.postimg.cc/bwtWK3MC/Vector.png" alt="High Quality" className="w-[50px] h-[50px]" />
        <div>
          <h1 className="text-lg md:text-xl ">Free Shipping</h1>
          <p className="text-gray-500 text-sm md:text-base">Order above ₹999</p>
        </div>
      </div>
      <div className="featuresCard flex gap-5  w-[175px] md:w-[15vw] items-center justify-center">
        <img src="https://i.postimg.cc/Fs9jtRB2/2891214031638194523-1.png" alt="High Quality" className="w-[50px] h-[50px]" />
        <div>
          <h1 className="text-lg md:text-xl ">24/7 Support</h1>
          <p className="text-gray-500 text-sm md:text-base">Dedicated Support</p>
        </div>
      </div>
    </div>

    <div className="followInstagram flex flex-col items-center text-center overflow-x-auto">
      <div class="mb-10 md:mb-16">
        <h2 class="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">Follow Us On Instagram</h2>

        <p class="mx-auto max-w-screen-md text-center md:text-lg text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos explicabo velit blanditiis a fuga debitis molestiae quia, nam facere hic.</p>
      </div>

      <div className="instagramModels flex items-center mt-10 w-[calc(100vw-40px)] overflow-x-auto xl:overflow-x-hidden">
        <img src="assets/models/3.png" alt="" />
        <img src="assets/models/4.png" alt="" />
        <img src="assets/models/5.png" alt="" />
        <img src="assets/models/6.png" alt="" />
        <img src="assets/models/7.png" alt="" />
        <img src="assets/models/8.png" alt="" />
        <img src="assets/models/9.png" alt="" />
      </div>


    </div>

    <div className="newletter flex justify-around items-center">
      <img src="assets\Newsletter\2.png" alt="" className="hidden lg:block" />

      <div className="flex flex-col items-center justify-center">
        <div class="mb-10 md:mb-16">
          <h2 class="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">Subscribe To Our Newsletter</h2>

          <p class="mx-auto max-w-screen-md text-center md:text-lg text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin </p>
        </div>

        <input type="email" placeholder="Enter Your Email Here" className="w-[calc(100%-100px)] h-10 p-5 drop-shadow-xl" />

        <Button className="mt-10 text-lg px-5 mx-10">Subscribe Now</Button>
      </div>

      <img src="assets\Newsletter\1.png" alt="" className="hidden lg:block" />
    </div>

    <div className="footer">
      <div class="bg-white pt-4 sm:pt-10 lg:pt-12">
        <footer class="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div class="flex flex-col items-center border-t pt-6">

            <nav class="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
              <a href="#" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">About</a>
              <a href="#" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Investor Relations</a>
              <a href="#" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Jobs</a>
              <a href="#" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Press</a>
              <a href="#" class="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Blog</a>
            </nav>



            <div class="flex gap-4">
              <a href="#" target="_blank" class="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a href="#" target="_blank" class="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              <a href="#" target="_blank" class="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a href="#" target="_blank" class="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                <svg class="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

          </div>

          <div class="py-8 text-center text-sm text-gray-400">© 09.07.2024 - Present Más. All rights reserved.</div>
        </footer>
      </div>
    </div>
  </div>
  );
}
