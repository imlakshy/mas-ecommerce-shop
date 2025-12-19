"use client"
import { Button } from "@/components/ui/button";
import Newsletter from "@/components/Newsletter";
import FollowInstagram from "@/components/FollowInstagram";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import NewArrivals from "@/components/NewArrivals";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (<div className="flex flex-col items-center gap-10 px-5">
    <Navbar />
    <HeroSection />

    <div id="deals" className="flex pt-[20px] md:pt-[50px] flex-col lg:flex-row items-center max-w-[1300px] gap-10">
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


    <NewArrivals />

    <Features />

    <FollowInstagram />

    <Newsletter />

    <Footer />

  </div>
  );
}
