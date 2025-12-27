"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Heart, LucideShoppingBag } from "lucide-react"

const Navbar = () => {

  const router = useRouter();

  const [showNavbar, setShowNavbar] = React.useState(true);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);

  // Function to handle scroll events
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // For Mobile or negative scrolling
  };

  // Set up scroll event listener
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'} bg-white pt-3`}
      style={{ height: '80px' }}
    >
      <div className="mx-auto px-5 lg:px-[2vw] xl:px-[10vw] lg:pb-16 flex justify-between pb-4 md:py-8 items-center h-full">
        <div className="flex-1">
          <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]" />
        </div>

        <div className="hidden lg:flex grow gap-12 justify-center items-center"> 
          <Link href={""} className="text-lg font-semibold transition duration-100  hover:text-primary active:text-primary">Home</Link>
          <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary" onClick={() => document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })}>Deals</Link>
          <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary" onClick={() => document.getElementById('newArrivals')?.scrollIntoView({ behavior: 'smooth' })}>New Arrivals</Link>
          <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">Help</Link>
        </div>

        <div className="hidden lg:flex flex-1 gap-5 items-center justify-end">
          {/* <Button className="rounded-lg bg-primary px-8 py-6 text-center text-sm font-semibold text-primary-foreground outline-none  transition duration-100 focus-visible:ring active:bg-primary md:text-base" onClick={() => router.push('/auth')}>Sign Up</Button> */}
          <Heart className="cursor-pointer hover:text-primary" size={20} />
          <LucideShoppingBag className="cursor-pointer hover:text-primary" size={20} onClick={() => router.push('/cart')} />
          <User className="cursor-pointer hover:text-primary" size={20} onClick={() => router.push('/auth')} />
        </div>

        <button type="button" className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold focus-visible:ring active:text-primary md:text-base lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
