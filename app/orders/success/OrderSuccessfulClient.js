"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/createSupabaseClient'
import { useAuth } from '@/context/AuthContext'

const OrderSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const orderId = searchParams.get('orderId');

    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [address, setAddress] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);

    const formatPrice = (price) => {
        if (price == null) return "₹—";
        return `₹${Number(price).toLocaleString("en-IN")}`;
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!user || !orderId) return;

        const fetchOrderDetails = async () => {
            try {
                //Order details
                const { data: orderData, error: orderError } = await supabase
                    .from("orders")
                    .select("*")
                    .eq("id", orderId)
                    .single();

                if (orderError) throw orderError;
                setOrder(orderData);

                // Fetch address details
                if (orderData.address_id) {
                    const { data: addressData, error: addressError } = await supabase
                        .from("addresses")
                        .select("*")
                        .eq("id", orderData.address_id)
                        .single();

                    if (!addressError) {
                        setAddress(addressData);
                    }
                }

                const { data: itemsData, error: itemsError } = await supabase
                    .from("order_items")
                    .select("*, products(*)")
                    .eq("order_id", orderId);

                if (itemsError) throw itemsError;
                setOrderItems(itemsData || []);
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [user, orderId]);
const totalItems = orderItems.reduce((sum, item) => sum + item.qty, 0);
    

    return (
        <div className={`transition-all duration-500 ease-out
      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

            <div className='px-4 sm:px-6 md:px-10 lg:px-20 py-8 md:py-12 min-h-screen bg-gradient-to-b from-white to-gray-50'>

                <div className="flex justify-center cursor-pointer mb-8" onClick={() => router.push('/')}>
                    <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]" />
                </div>

                {loading ? (
                    <div className='flex justify-center items-center h-96'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black'></div>
                    </div>
                ) : order ? (
                    <div className='max-w-3xl mx-auto'>
                        {/* Success Animation - Checkmark */}
                        <div className='flex justify-center mb-8'>
                            <div className='relative w-24 h-24'>
                                {/* Outer circle with animation */}
                                <div className='absolute inset-0 animate-pulse'>
                                    <svg
                                        className='w-full h-full'
                                        viewBox="0 0 100 100"
                                        fill="none"
                                    >
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="48"
                                            stroke="#10b981"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>

                                {/* Checkmark with celebration animation */}
                                <svg
                                    className='absolute inset-0 w-full h-full animate-bounce'
                                    viewBox="0 0 100 100"
                                    fill="none"
                                >
                                    {/* Background circle */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="50"
                                        fill="#10b981"
                                    />

                                    {/* Checkmark path */}
                                    <path
                                        d="M 30 50 L 45 65 L 75 35"
                                        stroke="white"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        strokeDasharray="50"
                                        strokeDashoffset="50"
                                        style={{
                                            animation: 'drawCheck 0.8s ease-out forwards 0.3s'
                                        }}
                                    />
                                </svg>
                            </div>

                            <style jsx>{`
                @keyframes drawCheck {
                  to {
                    stroke-dashoffset: 0;
                  }
                }

                @keyframes celebrate {
                  0%, 100% {
                    transform: scale(1) rotate(0deg);
                  }
                  50% {
                    transform: scale(1.1) rotate(5deg);
                  }
                }

                :global(.celebrate-confetti) {
                  animation: celebrate 0.6s ease-in-out infinite;
                }
              `}</style>
                        </div>

                        {/* Success Message */}
                        <div className='text-center mb-12'>
                            <h1 className='text-4xl md:text-5xl font-light mb-3'>
                                Order Confirmed!
                            </h1>
                            <p className='text-gray-600 text-lg'>
                                Thank you for your purchase. Your order has been successfully placed.
                            </p>
                        </div>

                        {/* Order Number & Details */}
                        <div className='bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8 shadow-sm'>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
                                <div>
                                    <p className='text-gray-600 text-sm font-light'>Order Number</p>
                                    <p className='text-xl font-semibold mt-1'>#{order.order_no}</p>
                                </div>
                                <div>
                                    <p className='text-gray-600 text-sm font-light'>Order Date</p>
                                    <p className='text-xl font-semibold mt-1'>
                                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-gray-600 text-sm font-light'>Total Items</p>
                                    <p className='text-xl font-semibold mt-1'>{totalItems}</p>
                                </div>
                                <div>
                                    <p className='text-gray-600 text-sm font-light'>Payment</p>
                                    <p className='text-xl font-semibold mt-1'>COD</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className='bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8 shadow-sm'>
                            <h2 className='text-2xl font-light mb-6'>Order Summary</h2>

                            {/* Items List */}
                            <div className='divide-y'>
                                {orderItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className='py-6 flex items-start gap-4 hover:bg-gray-50 transition-colors p-4 -mx-4 rounded'
                                    >
                                        {/* Product Image */}
                                        <div className='relative w-20 h-28 flex-shrink-0'>
                                            <Image
                                                src={item.products.images?.[0] || '/hoodie.avif'}
                                                alt={item.products.name}
                                                fill
                                                className='object-cover rounded'
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className='flex-1'>
                                            <p className='text-sm text-gray-600 font-light'>
                                                {item.products.brand}
                                            </p>
                                            <h3 className='text-lg font-light line-clamp-2 my-1'>
                                                {item.products.name}
                                            </h3>
                                            <div className='flex gap-4 text-sm text-gray-600 font-light'>
                                                {item.color && <span>Color: <span className='font-medium text-black'>{item.color}</span></span>}
                                                <span>Size: <span className='font-medium text-black'>{item.size}</span></span>
                                                <span>Qty: <span className='font-medium text-black'>{item.qty}</span></span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className='text-right flex-shrink-0'>
                                            <p className='text-sm text-gray-600 font-light mb-1'>Price</p>
                                            <p className='text-lg font-semibold'>
                                                {formatPrice(item.price * item.qty)}
                                            </p>
                                            <p className='text-xs text-gray-500 font-light mt-1'>
                                                {formatPrice(item.price)} each
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className='mt-8 pt-6 border-t space-y-3'>
                                <div className='flex justify-between text-gray-700'>
                                    <span className='font-light'>Subtotal</span>
                                    <span>{formatPrice(
                                        orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0)
                                    )}</span>
                                </div>
                                <div className='flex justify-between text-gray-700'>
                                    <span className='font-light'>Shipping</span>
                                    <span className='text-green-600 font-medium'>{order.shipping_fee === 0 ? "FREE" : formatPrice(order.shipping_fee)}</span>
                                </div>
                                <div className='flex justify-between text-xl font-semibold pt-3 border-t'>
                                    <span>Total Amount</span>
                                    <span className='text-green-600'>{formatPrice(order.total_amount)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        {address && (
                            <div className='bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8 shadow-sm'>
                                <h2 className='text-2xl font-light mb-6'>Shipping Address</h2>
                                <div className='bg-gray-50 rounded-lg p-6'>
                                    <div className='space-y-2'>
                                        <p className='text-lg font-semibold'>{address.full_name}</p>
                                        <p className='text-gray-700 font-light'>{address.address_line}</p>
                                        <p className='text-gray-700 font-light'>Postal Code: {address.zip}</p>
                                        <p className='text-gray-700 font-light'>Phone: {address.phone}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* What's Next */}
                        <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8 mb-8'>
                            <h3 className='text-lg font-light mb-4'>What's Next?</h3>
                            <ul className='space-y-3 text-gray-700 font-light'>
                                <li className='flex items-start gap-3'>
                                    <span className='text-green-600 font-bold mt-1'>✓</span>
                                    <span>We'll confirm your order and send a confirmation email shortly</span>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <span className='text-green-600 font-bold mt-1'>✓</span>
                                    <span>You can track your order in the <button onClick={() => router.push('/orders')} className='text-blue-600 underline hover:text-blue-800'>Orders</button> section</span>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <span className='text-green-600 font-bold mt-1'>✓</span>
                                    <span>Our team will prepare and ship your order soon</span>
                                </li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <button
                                onClick={() => router.push('/orders')}
                                className='px-8 py-3 border border-black rounded-lg font-light hover:bg-gray-50 transition-colors'
                            >
                                View All Orders
                            </button>
                            <button
                                onClick={() => router.push('/products')}
                                className='px-8 py-3 bg-black text-white rounded-lg font-light hover:bg-gray-800 transition-colors'
                            >
                                Continue Shopping
                            </button>
                        </div>

                        {/* Confetti Animation Particles */}
                        <div className='fixed inset-0 pointer-events-none overflow-hidden'>
                            {[...Array(15)].map((_, i) => (
                                <div
                                    key={i}
                                    className='absolute animate-bounce'
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `-10px`,
                                        animation: `fall ${2 + Math.random() * 1}s ease-in forwards`,
                                        animationDelay: `${Math.random() * 0.5}s`,
                                    }}
                                >
                                    <div className='text-3xl'>
                                        {['🎉', '✨', '🎊', '⭐'][Math.floor(Math.random() * 4)]}
                                    </div>
                                </div>
                            ))}
                            <style jsx>{`
                @keyframes fall {
                  to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                  }
                }
              `}</style>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center h-96'>
                        <p className='text-xl text-gray-600 mb-4'>Order not found</p>
                        <button
                            onClick={() => router.push('/cart')}
                            className='px-6 py-2 bg-black text-white rounded-lg font-light hover:bg-gray-800'
                        >
                            Back to Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSuccessPage;
