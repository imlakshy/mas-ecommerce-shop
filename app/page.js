"use client"
import { Button } from "@/components/ui/button";
import Newsletter from "@/components/Newsletter";
import FollowInstagram from "@/components/FollowInstagram";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (<div className="flex flex-col items-center gap-10 px-5">

    <HeroSection />

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

        <div className="INDICATORSforLargeDevice w-[100px] hidden md:flex gap-2 absolute bottom-2 right-2 ">
          <div className="cursor-pointer w-[10px] h-[10px] bg-[#b6b6b6] rounded-full active"></div>
          <div className="cursor-pointer w-[10px] h-[10px] bg-[#b6b6b6] rounded-full"></div>
          <div className="cursor-pointer w-[10px] h-[10px] bg-[#b6b6b6] rounded-full"></div>
          <div className="cursor-pointer w-[10px] h-[10px] bg-[#b6b6b6] rounded-full"></div>
        </div>

        <div className="INDICATORforSmallDevice bg-white rounded-full flex md:hidden items-center justify-center gap-2 absolute bottom-2 right-2 w-10 h-10 drop-shadow-lg">
          <img src="assets/SVG/next.svg" alt="next" className="w-[60%] h-[60%]" />
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

          <div className="inline-flex w-[90vw] lg:w-[1250px] justify-between items-center gap-10 mb-10 overflow-x-auto whitespace-nowrap">
            <div className="text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer  text-gray-500">Men&apos;s Fashion</div>
            <div className="text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer text-white bg-primary">Women&apos;s Fashion</div>
            <div className="text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer text-gray-500">Women Accessories</div>
            <div className="text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer text-gray-500">Men Accessories</div>
            <div className="text-sm md:text-lg text-center rounded-lg p-2 md:px-4 cursor-pointer text-gray-500">Discount Deals</div>
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

    <Features/>

    <FollowInstagram/>

    <Newsletter/>

  </div>
  );
}
