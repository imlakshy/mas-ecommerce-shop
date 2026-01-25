"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Heart, LucideShoppingBag, UserCircle, Package, LogOut, Menu, X } from "lucide-react"
import { supabase } from "@/lib/createSupabaseClient"
import { useAuth } from "@/context/AuthContext"
import { Button } from "./ui/button"
import { toast } from "sonner"

const Navbar = () => {

  const [showNavbar, setShowNavbar] = React.useState(true);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
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

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setShowMobileMenu(false);
  };

  return (
    <>
      {/* Backdrop for Mobile Menu */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'} bg-white`}
      >
        {/* Desktop & Tablet Navbar */}
        <div className="mx-auto px-5 lg:px-[2vw] xl:px-[10vw] flex justify-between items-center h-20" style={{ minHeight: '80px' }}>
          {/* Logo */}
          <div onClick={() => router.push("/")} className="flex-1 cursor-pointer">
            <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex grow gap-12 justify-center items-center">
            <Link href={""} className="text-lg font-semibold transition duration-100  hover:text-primary active:text-primary">Home</Link>

            <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary" onClick={(e) => handleNavClick(e, 'deals')}>Deals</Link>

            <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary" onClick={(e) => handleNavClick(e, 'newArrivals')}>New Arrivals</Link>

            <Link href={""} className="text-lg font-semibold transition duration-100 hover:text-primary active:text-primary">Help</Link>
          </div>

          {/* Desktop Right Section */}
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
                      Hey {String(user.user_metadata.display_name).split(" ")[0]}!
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
                      <LogOut className="w-5 h-5 stroke-[1.5]" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>)}
          </div>

          {/* Mobile Right Section - Icons & Hamburger */}
          <div className="lg:hidden flex items-center gap-4">
            {user && (
              <>
                <Heart className="cursor-pointer hover:text-primary" size={20} onClick={() => router.push('/wishlist')} />
                <LucideShoppingBag className="cursor-pointer hover:text-primary" size={20} onClick={() => router.push('/cart')} />
              </>
            )}

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="flex-shrink-0"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-5 py-4 space-y-2">
              <Link href="/" className="block px-3 py-2 text-base hover:bg-gray-100 rounded transition-all" onClick={() => setShowMobileMenu(false)}>Home</Link>
              <button onClick={(e) => handleNavClick(e, 'deals')} className="block w-full text-left px-3 py-2 text-base hover:bg-gray-100 rounded transition-all">Deals</button>
              <button onClick={(e) => handleNavClick(e, 'newArrivals')} className="block w-full text-left px-3 py-2 text-base hover:bg-gray-100 rounded transition-all">New Arrivals</button>
              <Link href={""} className="block px-3 py-2 text-base hover:bg-gray-100 rounded transition-all">Help</Link>

              {!user ? (
                <Button className="w-full rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground outline-none transition duration-100" onClick={() => { router.push('/auth'); setShowMobileMenu(false); }}>Sign Up</Button>
              ) : (
                <div className="space-y-1 pt-3 border-t">
                  <button
                    onClick={() => {
                      router.push('/account');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all flex items-center gap-3"
                  >
                    <UserCircle className="w-5 h-5" />
                    Account
                  </button>
                  <button
                    onClick={() => {
                      router.push('/orders');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all flex items-center gap-3"
                  >
                    <Package className="w-5 h-5" />
                    Orders
                  </button>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setShowMobileMenu(false);
                      toast.success("Logged out!");
                      router.push('/');
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-all flex items-center gap-3"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
