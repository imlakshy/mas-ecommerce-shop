"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRight, Package, Truck, CheckCircle } from 'lucide-react'

const OrdersPage = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const orders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'Delivered',
            statusColor: 'text-green-600',
            total: '₹8,119',
            subtotal: '₹7,998',
            shipping: 'FREE',
            totalMRP: '₹10,998',
            discountOnMRP: '₹3,000',
            couponCode: 'SAVE20',
            couponDiscount: '₹2,030',
            shippingFee: 'FREE',
            customerInfo: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+91 9876543210'
            },
            shippingDetails: {
                name: 'John Doe',
                address: '123 Main Street, City',
                zip: '123456',
                phone: '+91 9876543210'
            },
            items: [
                {
                    id: 1,
                    image: '/hoodie.avif',
                    brand: 'Zara',
                    name: 'Loose fit zip through hoodie',
                    color: 'Black',
                    size: 'L',
                    quantity: 1,
                    price: '₹3,999',
                    originalPrice: '₹5,499'
                },
                {
                    id: 2,
                    image: '/hoodie.avif',
                    brand: 'Zara',
                    name: 'Loose fit zip through hoodie',
                    color: 'Black',
                    size: 'M',
                    quantity: 1,
                    price: '₹3,999',
                    originalPrice: '₹5,499'
                }
            ]
        },
        {
            id: 'ORD-002',
            date: '2024-01-10',
            status: 'Shipped',
            statusColor: 'text-blue-600',
            total: '₹3,999',
            subtotal: '₹3,999',
            shipping: 'FREE',
            totalMRP: '₹5,499',
            discountOnMRP: '₹1,500',
            couponCode: null,
            couponDiscount: '₹0',
            shippingFee: 'FREE',
            customerInfo: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+91 9876543210'
            },
            shippingDetails: {
                name: 'John Doe',
                address: '123 Main Street, City',
                zip: '123456',
                phone: '+91 9876543210'
            },
            items: [
                {
                    id: 3,
                    image: '/hoodie.avif',
                    brand: 'Zara',
                    name: 'Loose fit zip through hoodie',
                    color: 'Black',
                    size: 'L',
                    quantity: 1,
                    price: '₹3,999',
                    originalPrice: '₹5,499'
                }
            ]
        },
        {
            id: 'ORD-003',
            date: '2024-01-05',
            status: 'Delivered',
            statusColor: 'text-green-600',
            total: '₹12,500',
            subtotal: '₹11,997',
            shipping: 'FREE',
            totalMRP: '₹16,497',
            discountOnMRP: '₹4,500',
            couponCode: 'WELCOME15',
            couponDiscount: '₹1,797',
            shippingFee: 'FREE',
            customerInfo: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+91 9876543210'
            },
            shippingDetails: {
                name: 'John Doe',
                address: '123 Main Street, City',
                zip: '123456',
                phone: '+91 9876543210'
            },
            items: [
                {
                    id: 4,
                    image: '/hoodie.avif',
                    brand: 'Zara',
                    name: 'Loose fit zip through hoodie',
                    color: 'Black',
                    size: 'L',
                    quantity: 2,
                    price: '₹3,999',
                    originalPrice: '₹5,499'
                },
                {
                    id: 5,
                    image: '/hoodie.avif',
                    brand: 'Zara',
                    name: 'Loose fit zip through hoodie',
                    color: 'Black',
                    size: 'XL',
                    quantity: 1,
                    price: '₹3,999',
                    originalPrice: '₹5,499'
                }
            ]
        },
        {
            id: 'ORD-004',
            date: '2023-12-28',
            status: 'Delivered',
            statusColor: 'text-green-600',
            total: '₹7,998',
            subtotal: '₹7,998',
            shipping: 'FREE',
            totalMRP: '₹10,998',
            discountOnMRP: '₹3,000',
            couponCode: null,
            couponDiscount: '₹0',
            shippingFee: 'FREE',
            customerInfo: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+91 9876543210'
            },
            shippingDetails: {
                name: 'John Doe',
                address: '123 Main Street, City',
                zip: '123456',
                phone: '+91 9876543210'
            },
            items: [
                {
                    id: 6,
                    image: '/hoodie.avif',
                    brand: 'Zara',
                    name: 'Loose fit zip through hoodie',
                    color: 'Black',
                    size: 'L',
                    quantity: 2,
                    price: '₹3,999',
                    originalPrice: '₹5,499'
                }
            ]
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered':
                return <CheckCircle className='w-4 h-4' />;
            case 'Shipped':
                return <Truck className='w-4 h-4' />;
            case 'Processing':
                return <Package className='w-4 h-4' />;
            default:
                return <Package className='w-4 h-4' />;
        }
    };

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
                        Order History
                    </div>
                </div>

                <div className='flex flex-col gap-8 md:gap-12 flex-1 max-w-5xl mx-auto w-full'>
                    {orders.map((order) => (
                        <div key={order.id} className='border-b pb-8 last:border-b-0'>
                            {/* Order Header */}
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex items-center gap-3'>
                                        <span className='text-lg font-semibold'>{order.id}</span>
                                        <span className={`text-sm font-light flex items-center gap-1 ${order.statusColor}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                    </div>
                                    <span className='text-sm text-gray-600 font-light'>Ordered on {order.date}</span>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <span className='text-lg font-semibold'>{order.total}</span>
                                    <span className='text-xs text-gray-600 font-light'>{order.items.length} item(s)</span>
                                </div>
                            </div>

                            {/* Order Items - First Product Preview */}
                            {order.items.length > 0 && (
                                <div
                                    className='flex items-start gap-4 border-b pb-6 mb-6 cursor-pointer hover:bg-gray-50 transition-all p-2 -m-2 rounded'
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <div className='h-24 md:h-32 lg:h-40 w-24 md:w-32 lg:w-40 relative flex-shrink-0'>
                                        <Image
                                            src={order.items[0].image}
                                            alt={order.items[0].name}
                                            fill
                                            className='object-cover'
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center flex-1 min-w-0'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm text-gray-700'>{order.items[0].brand}</span>
                                            <span className='text-sm font-semibold line-clamp-2'>{order.items[0].name}</span>
                                            {order.items.length > 1 && (
                                                <span className='text-xs text-gray-600 font-light mt-1'>
                                                    +{order.items.length - 1} more item{order.items.length - 1 > 1 ? 's' : ''}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Order Summary */}
                            <div className='flex flex-col gap-2 text-sm border-t pt-4'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600 font-light'>Subtotal</span>
                                    <span>{order.subtotal}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600 font-light'>Shipping</span>
                                    <span className='font-semibold text-primary'>{order.shipping}</span>
                                </div>
                                <div className='flex justify-between font-semibold border-t pt-2 mt-2'>
                                    <span>Total</span>
                                    <span>{order.total}</span>
                                </div>
                            </div>

                            {/* Order Actions */}
                            <div className='flex gap-3 mt-6'>
                                <button className='border-2 border-black px-4 py-2 text-sm font-light hover:bg-gray-100 transition-all'>
                                    Track Order
                                </button>
                                <button className='border-2 border-black px-4 py-2 text-sm font-light hover:bg-gray-100 transition-all flex items-center gap-1'>
                                    View Invoice <ArrowRight className='w-3 h-3' />
                                </button>
                                {order.status === 'Delivered' && (
                                    <button className='border-2 border-black px-4 py-2 text-sm font-light hover:bg-gray-100 transition-all'>
                                        Reorder
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Empty State (if no orders) */}
                    {orders.length === 0 && (
                        <div className='pt-8 text-center'>
                            <span className='text-3xl font-bold block mb-2'>No orders yet</span>
                            <span className='text-gray-500 block mb-6'>Start shopping to see your orders here</span>
                            <button
                                onClick={() => router.push('/')}
                                className='border-2 border-black px-6 py-2 text-sm font-light hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto'
                            >
                                Start Shopping <ArrowRight className='w-4 h-4' />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
                    onClick={() => setSelectedOrder(null)}
                >
                    <div
                        className='bg-white p-6 md:p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center mb-6'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-xl font-semibold'>{selectedOrder.id}</span>
                                <span className='text-sm text-gray-600 font-light'>Ordered on {selectedOrder.date}</span>
                            </div>
                            <span
                                className='text-2xl cursor-pointer hover:text-gray-600'
                                onClick={() => setSelectedOrder(null)}
                            >
                                ×
                            </span>
                        </div>

                        {/* All Order Items */}
                        <div className='flex flex-col gap-6 mb-6'>
                            {selectedOrder.items.map((item) => (
                                <div key={item.id} className='flex items-start gap-4 border-b pb-4 last:border-b-0'>
                                    <div className='h-24 md:h-32 lg:h-40 w-24 md:w-32 lg:w-40 relative flex-shrink-0'>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className='object-cover'
                                        />
                                    </div>
                                    <div className='flex flex-col justify-between flex-1 min-w-0'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm text-gray-700'>{item.brand}</span>
                                            <span className='text-sm font-semibold line-clamp-2'>{item.name}</span>
                                            <div className='flex flex-wrap gap-3 text-xs text-gray-600 font-light mt-1'>
                                                <span>Color: {item.color}</span>
                                                <span>Size: {item.size}</span>
                                                <span>Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2 mt-2'>
                                            {item.originalPrice && (
                                                <span className='text-gray-400 line-through text-xs'>{item.originalPrice}</span>
                                            )}
                                            <span className='text-sm font-semibold'>{item.price}</span>
                                            {item.quantity > 1 && (
                                                <span className='text-xs text-gray-600 font-light'>
                                                    (×{item.quantity} = ₹{(parseInt(item.price.replace('₹', '').replace(',', '')) * item.quantity).toLocaleString('en-IN')})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Customer Information */}
                        <div className='flex flex-col gap-2 text-sm border-t pt-6 mb-6'>
                            <span className='text-lg font-light mb-2'>Customer Information</span>
                            <div className='flex flex-col gap-1'>
                                <div>
                                    <span className='text-gray-600 font-light'>Name:</span>
                                    <span className='ml-2 font-semibold'>{selectedOrder.customerInfo.name}</span>
                                </div>
                                <div>
                                    <span className='text-gray-600 font-light'>Email:</span>
                                    <span className='ml-2 font-semibold'>{selectedOrder.customerInfo.email}</span>
                                </div>
                                <div>
                                    <span className='text-gray-600 font-light'>Phone:</span>
                                    <span className='ml-2 font-semibold'>{selectedOrder.customerInfo.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Details */}
                        <div className='flex flex-col gap-2 text-sm border-t pt-6 mb-6'>
                            <span className='text-lg font-light mb-2'>Shipping Details</span>
                            <div className='flex flex-col gap-1'>
                                <div className='font-semibold'>{selectedOrder.shippingDetails.name}</div>
                                <div className='text-gray-600'>{selectedOrder.shippingDetails.address}</div>
                                <div className='text-gray-600'>{selectedOrder.shippingDetails.zip}</div>
                                <div className='text-gray-600'>{selectedOrder.shippingDetails.phone}</div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className='flex flex-col gap-2 text-sm border-t pt-6'>
                            <span className='text-lg font-light mb-2'>Order Summary</span>
                            <div className='flex justify-between'>
                                <span className='text-gray-600 font-light'>Total MRP</span>
                                <span>{selectedOrder.totalMRP}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600 font-light'>Discount on MRP</span>
                                <span className='text-primary'>-{selectedOrder.discountOnMRP}</span>
                            </div>
                            {selectedOrder.couponCode && (
                                <div className='flex justify-between'>
                                    <span className='text-gray-600 font-light'>Applied Coupon Code</span>
                                    <span className='font-semibold'>{selectedOrder.couponCode}</span>
                                </div>
                            )}
                            <div className='flex justify-between'>
                                <span className='text-gray-600 font-light'>Coupon Discount</span>
                                <span className='text-primary'>-{selectedOrder.couponDiscount}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600 font-light'>Shipping Fee</span>
                                <div>
                                    {selectedOrder.shippingFee === 'FREE' ? (
                                        <span className='font-semibold text-primary'>FREE</span>
                                    ) : (
                                        <span>{selectedOrder.shippingFee}</span>
                                    )}
                                </div>
                            </div>
                            <div className='flex justify-between font-semibold border-t pt-2 mt-2'>
                                <span>Total Amount</span>
                                <span>{selectedOrder.total}</span>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className='w-full border-2 border-black p-2 text-sm font-light hover:bg-gray-100 transition-all'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrdersPage

