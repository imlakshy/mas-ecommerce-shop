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
import { supabase } from "@/lib/createSupabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch deals from Supabase
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(5);

        if (error) throw error;

        // Transform products to deals format
        if (data && data.length > 0) {
          const transformedDeals = data.map((product, index) => ({
            id: product.id,
            image: product.images[0] || "https://i.postimg.cc/63DJnXdf/1.png",
            title: `${String(index + 1).padStart(2, '0')}- ${product.name}`,
            discount: `${Math.floor(Math.random() * 30 + 20)}% Off`,
            price: product.price,
            cost: product.cost
          }));
          setDeals(transformedDeals);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className={`flex flex-col items-center gap-10 px-5 transition-all duration-1000 ease-out
    ${mounted ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      <HeroSection />

      <div id="deals" className="flex pt-[20px] md:pt-[50px] flex-col lg:flex-row items-center max-w-[1300px] gap-10 w-full">

        <div className="w-full lg:w-[40%] h-[450px] px-5 lg:px-0">
          <h1 className="text-4xl font-bold">Deals Of The Month</h1>
          <p className="my-10 text-gray-600">Discover amazing products with incredible discounts. Shop the best deals from our curated collection of premium items.</p>
          <Button className="mb-10" onClick={() => router.push('/products')}>Buy Now</Button>
          <h2 className="text-3xl">Hurry, Before It&apos;s Too Late!</h2>
        </div>

        {loading ? (
          <div className="w-full lg:w-[60%] h-[450px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : deals.length > 0 ? (
          <div className="flex gap-5 w-full lg:w-[60%] overflow-x-auto hide-scrollbar relative">
            {deals.map((deal, index) => {
              const rotatedIndex = (index + activeIndex) % deals.length;
              const dealToShow = deals[rotatedIndex];
              const isActive = index === 0;

              return (
                <div
                  key={rotatedIndex}
                  className={`${isActive ? 'h-[450px]' : 'h-[350px]'} w-auto aspect-[2/3] relative transition-all duration-500 ease-in-out flex-shrink-0 cursor-pointer hover:scale-105 transform`}
                  onClick={() => router.push(`/product/${dealToShow.id}`)}
                >
                  <Image
                    className="w-full h-full object-cover object-top rounded-lg"
                    src={dealToShow.image}
                    alt={dealToShow.title}
                    width={300}
                    height={450}
                    priority
                  />
                  {isActive && (
                    <div className="dealinfo bg-white inline-block px-7 py-3 bottom-5 left-5 absolute rounded-lg shadow-lg">
                      <h3 className="font-light text-sm">{dealToShow.title}</h3>
                      <h1 className="text-2xl font-bold text-red-600">{dealToShow.discount}</h1>
                      <p className="text-sm text-gray-600">₹{dealToShow.price}</p>
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
                    height: "10px"
                  }}
                />
              ))}
            </div>

            <div className="INDICATORforSmallDevice bg-white rounded-full flex md:hidden items-center justify-center gap-2 absolute bottom-2 right-2 w-10 h-10 drop-shadow-lg z-10">
              <span className="text-xs font-semibold">{activeIndex + 1}/{deals.length}</span>
            </div>

          </div>
        ) : (
          <div className="w-full lg:w-[60%] h-[450px] flex items-center justify-center">
            <p className="text-gray-600">No deals available at the moment</p>
          </div>
        )}
      </div>


      <NewArrivals />

      <Features />

      <FollowInstagram />

      <Newsletter />

      <Footer />

    </div>
  );
}
