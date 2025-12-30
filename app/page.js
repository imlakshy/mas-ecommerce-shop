"use client"
import { Button } from "@/components/ui/button";
import Newsletter from "@/components/Newsletter";
import FollowInstagram from "@/components/FollowInstagram";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import NewArrivals from "@/components/NewArrivals";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Home() {

  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Deals data
  const deals = [
    {
      image: "https://i.postimg.cc/63DJnXdf/1.png",
      title: "01- Spring Sale",
      discount: "30% Off"
    },
    {
      image: "https://i.postimg.cc/FKwNg3vS/2.png",
      title: "02- Summer Collection",
      discount: "25% Off"
    },
    {
      image: "https://i.postimg.cc/qvN4JdhL/image-2.png",
      title: "03- Flash Sale",
      discount: "40% Off"
    },
    {
      image: "https://i.postimg.cc/FKwNg3vS/2.png",
      title: "04- Weekend Deal",
      discount: "35% Off"
    },
    {
      image: "https://i.postimg.cc/qvN4JdhL/image-2.png",
      title: "05- Clearance Sale",
      discount: "50% Off"
    }
  ];

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % deals.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [deals.length]);

  return (
    <div className={`flex flex-col items-center gap-10 px-5 transition-all duration-1000 ease-out
    ${mounted ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      <HeroSection />

      <div id="deals" className="flex pt-[20px] md:pt-[50px] flex-col lg:flex-row items-center max-w-[1300px] gap-10">

        <div className="w-screen lg:w-[40%] h-[450px] px-5 lg:px-0">
          <h1 className="text-4xl font-bold">Deals Of The Month</h1>
          <p className="my-10 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum magni saepe dolores ipsam mollitia tempore ducimus molestiae corrupti error veniam?</p>
          <Button className="mb-10">Buy Now</Button>
          <h2 className="text-3xl">Hurry, Before It&apos;s Too Late!</h2>
        </div>

        <div className="flex gap-5 w-[calc(100vw-20px)] lg:w-[60%] overflow-x-hidden hide-scrollbar relative">
          {deals.map((deal, index) => {
            // Rotate the array so activeIndex item comes first
            const rotatedIndex = (index + activeIndex) % deals.length;
            const dealToShow = deals[rotatedIndex];
            const isActive = index === 0;

            return (
              <div
                key={rotatedIndex}
                className={`${isActive ? 'h-[450px]' : 'h-[350px]'} w-auto aspect-[2/3] relative transition-all duration-500 ease-in-out`}
              >
                <img className="w-full h-full object-cover object-top" src={dealToShow.image} alt={`Deal ${rotatedIndex + 1}`} />
                {isActive && (
                  <div className="dealinfo bg-white inline-block px-7 py-3 bottom-5 left-5 absolute">
                    <h3 className="font-light text-sm">{dealToShow.title}</h3>
                    <h1 className="text-2xl">{dealToShow.discount}</h1>
                  </div>
                )}
              </div>
            );
          })}

          <div className="INDICATORSforLargeDevice w-[100px] hidden md:flex gap-2 absolute bottom-2 right-2 z-10">
            {deals.map((_, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer transition-all duration-300 rounded-full ${index === activeIndex
                  ? "w-[35px] bg-black"
                  : "w-[10px] h-[10px] bg-[#b6b6b6]"
                  }`}
                style={{
                  height: index === activeIndex ? "10px" : "10px"
                }}
              />
            ))}
          </div>

          <div className="INDICATORforSmallDevice bg-white rounded-full flex md:hidden items-center justify-center gap-2 absolute bottom-2 right-2 w-10 h-10 drop-shadow-lg z-10">
            <span className="text-xs font-semibold">{activeIndex + 1}/{deals.length}</span>
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
