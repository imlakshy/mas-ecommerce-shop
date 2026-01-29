"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/createSupabaseClient'
import { Heart } from 'lucide-react'

const WishlistPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [productIds, setProductIds] = useState([]);
    const [items, setItems] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isWishlisted, setIsWishlisted] = useState([])

    const formatPrice = (price) => {
        if (price == null) return "₹—";
        return `₹${Number(price).toLocaleString("en-IN")}`;
    };

    const fetchRelatedProducts = async () => {
        const { data } = await supabase.from("products").select("*").not("id", "in", `(${productIds.join(",")})`).limit(12);
        setRelatedProducts(data ?? []);
    }

    const fetchProductId = async () => {
        const data = await supabase.from("wishlist").select("*").eq("user_id", user.id);
        setProductIds(data.data.map((item) => item.product_id));
    }

    const fetchItems = async () => {
        try{
            const { data } = await supabase.from("products").select("*").in("id", productIds);
        setItems(data);
        }finally{
            setIsLoading(false);
        }
    }

    const fetchWishlist = async () => {
        const { data } = await supabase.from("wishlist").select("product_id");
        setIsWishlisted(data.map(item => item.product_id))
    }

    useEffect(() => {
        
        setMounted(true);  
    }, []);

    useEffect(() => {
        if (!user) return;
        fetchProductId();
    }, [user]);

    useEffect(() => {
        if (productIds.length > 0) fetchItems();
        fetchRelatedProducts();
        if (user) fetchProductId();
    }, [productIds, isWishlisted]);

    const handleRemove = async (productId) => {
        await supabase.from("wishlist").delete().eq("product_id", productId).eq("user_id", user.id);
        fetchProductId();
    }

    return (
        <div className={`transition-all duration-500 ease-out
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

            <div className='px-4 sm:px-6 md:px-10 lg:px-20 pb-8 flex flex-col min-h-screen'>
                {/* Navbar */}
                <div className='py-4'>
                    <div className="flex justify-center cursor-pointer" onClick={() => router.push('/')}>
                        <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]" />
                    </div>

                    <div className='text-center text-4xl pt-2 font-extralight'>
                        Your Wishlist
                    </div>
                </div>

                {isLoading ? (
                <div className='flex items-center justify-center min-h-[400px]'>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
                        <span className='text-gray-600 text-sm'>Loading your wishlist...</span>
                    </div>
                </div>
                ):(<div className='flex flex-col flex-1'>
                    {/* Wishlist Items */}
                    <div className='w-full py-1 md:py-2 lg:py-4 md:overflow-auto'>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className='border-b py-6 flex items-center min-w-[350px]'>
                                <div
                                    onClick={() => router.push(`/product/${item.id}`)}
                                    className='cursor-pointer h-24 md:h-36 lg:h-48 mr-4 relative aspect-[2/3]'>
                                    <Image
                                        src={item.images[0]}
                                        alt="Product Image"
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                                <div className='flex flex-col justify-center flex-1 relative'>
                                    <span onClick={() => router.push(`/product/${item.id}`)} className='cursor-pointer text-sm text-gray-700'>{item.brand}</span>
                                    <span onClick={() => router.push(`/product/${item.id}`)} className='cursor-pointer line-clamp-1 pb-2 lg:pb-4'>{item.name}</span>
                                    <span className='text-xs text-gray-700'>{item.gender} - {item.category}</span>



                                    <div className='pt-2 md:pt-3 lg:pt-6 flex gap-2 text-xs font-semibold text-gray-500 items-center'>
                                        <span className='cursor-pointer hover:text-black' onClick={() => handleRemove(item.id)}>Remove</span>
                                        |
                                        <span onClick={() => router.push(`/product/${item.id}`)} className='cursor-pointer hover:text-black'>Move to cart <ArrowRight className="inline-block w-4 h-4" /></span>
                                    </div>

                                    <div className='flex flex-col absolute right-2 items-end'>
                                        <span className='text-gray-400 line-through text-xs text-extralight'>{formatPrice(item.cost)}</span>
                                        <span className=''>{formatPrice(item.price)}</span>
                                    </div>

                                </div>
                            </div>
                        ))}

                        {items.length === 0 && (
                            <div className='pt-8'>
                                <span className='text-3xl font-bold'>Nothing saved yet</span><br />
                                <span className='text-gray-500'>Add pieces you’d love to own someday.</span>
                                <span className='pt-6 block text-3xl font-bold hover:underline cursor-pointer' onClick={() => router.push("/products")}>Discover pieces <ArrowRight className="inline-block w-6 h-6" /></span>
                            </div>
                        )}
                    </div>

                    {/* You may also like these section */}
                    <div className='pb-8 mt-8'>
                        <h2 className='text-2xl md:text-3xl font-light mb-6 md:mb-8'>You may also like these</h2>

                        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6'>
                            {relatedProducts.map((product) => {
                                const isInWishlist = isWishlisted.includes(product.id);
                                return (<div
                                    key={product.id}
                                    className='cursor-pointer group'
                                    onClick={() => router.push(`/product/${product.id}`)}>
                                    <div className='relative w-full mb-2 overflow-hidden bg-gray-100 aspect-[2/3]'>

                                        <Image
                                            src={product.images[0]}
                                            alt="Product Image"
                                            fill
                                            className='object-cover transition duration-200 group-hover:scale-110'
                                        />
                                        <button
                                            onClick={async (e) => {
                                                e.stopPropagation()
                                                if (isInWishlist) {
                                                    // Remove from wishlist
                                                    const data = await supabase.from("wishlist")
                                                        .delete()
                                                        .eq("product_id", product.id)
                                                        .eq("user_id", user.id)

                                                    if (!data.error) {
                                                        fetchWishlist();
                                                    }
                                                } else {
                                                    // Add to wishlist
                                                    const data = await supabase.from("wishlist")
                                                        .insert({
                                                            product_id: product.id,
                                                            user_id: user.id
                                                        })

                                                    if (!data.error) {
                                                        fetchWishlist();
                                                    }
                                                }
                                            }}
                                            className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
                                            <Heart className={`w-4 h-4 text-gray-600 ${isInWishlist ? 'fill-red-500' : ''} transition-all duration-500`} />
                                        </button>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-xs text-gray-700 mb-1'>{product.brand}</span>
                                        <span className='text-xs line-clamp-1 mb-1'>{product.name}</span>
                                        <div className='flex flex-col'>
                                            <span className='text-gray-400 line-through text-xs'>{formatPrice(product.cost)}</span>
                                            <span className='text-xs font-semibold'>{formatPrice(product.price)}</span>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>)}
            </div >
        </div>)
}

export default WishlistPage

