"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Heart, LucideShoppingBag, UserCircle, Package, LogOut } from "lucide-react"
import { supabase } from "@/lib/createSupabaseClient"
import { useAuth } from "@/context/AuthContext"
import { Button } from "./ui/button"
import { toast } from "sonner"

const Navbar = () => {

  const [showNavbar, setShowNavbar] = React.useState(true);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const router = useRouter();

  const { user } = useAuth();

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

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

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
          {!user ? (
            <Button className="rounded-lg bg-primary px-8 py-6 text-center text-sm font-semibold text-primary-foreground outline-none  transition duration-100 focus-visible:ring active:bg-primary md:text-base" onClick={() => router.push('/auth')}>Sign Up</Button>
          ) : (<>
            <Heart className="cursor-pointer hover:text-primary" size={20} onClick={() => router.push('/wishlist')} />

            <LucideShoppingBag className="cursor-pointer hover:text-primary" size={20} onClick={() => router.push('/cart')} />

            <div className="relative user-menu-container">
              <User
                className="cursor-pointer hover:text-primary"
                size={20}
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-3 w-52 bg-white shadow-xl z-50 rounded-sm">
                  <button
                    onClick={() => {
                      router.push('/account');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-5 py-3.5 text-sm font-semibold hover:text-primary hover:bg-gray-50 transition-all flex items-center gap-3.5"
                  >
                    <UserCircle className="w-5 h-5 stroke-[1.5]" />
                    Hey {user.user_metadata.display_name}!
                  </button>
                  <button
                    onClick={() => {
                      router.push('/orders');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-5 py-3.5 text-sm font-semibold hover:text-primary hover:bg-gray-50 transition-all flex items-center gap-3.5"
                  >
                    <Package className="w-5 h-5 stroke-[1.5]" />
                    Orders
                  </button>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setShowUserMenu(false);
                      toast.success("Logged out!");
                      router.push('/');
                    }}
                    className="w-full text-left px-5 py-3.5 text-sm font-semibold hover:text-primary hover:bg-gray-50 transition-all flex items-center gap-3.5">
                    <LogOut className="w-5 h-5 stroke-[1.5]" onClick={async () => { await supabase.auth.signOut(); setShowUserMenu(false); toast.success("Logged out!") }} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
