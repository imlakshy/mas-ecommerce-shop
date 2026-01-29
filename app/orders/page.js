"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRight, Package, Truck, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/createSupabaseClient'
import Modal from '@/components/Modal'

const OrdersPage = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [trackingModal, setTrackingModal] = useState(null);
    const [invoiceModal, setInvoiceModal] = useState(null);

    const [orders, setOrders] = useState([]);



    useEffect(() => {
        if (trackingModal || invoiceModal || selectedOrder) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [trackingModal, invoiceModal, selectedOrder]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!user) return;

        const init = async () => {
           try{
             const { data: ordersData } = await supabase.from("orders")
                .select(`*,
                    addresses(*),
                order_items(*,
                products(
                brand,
                name,
                cost,
                images))`)
                .eq("user_id", user.id)
                .order("created_at", { ascending: false }).limit(3);

            setOrders(ordersData);
           }finally{
            setIsLoading(false);
           }
        }
        init();



    }, [user, orders])

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

    const formatPrice = (price) => {
        if (price == null) return "₹—";
        return `₹${Number(price).toLocaleString("en-IN")}`;
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

                    <div className='text-center text-3xl md:text-4xl pt-2 font-extralight'>
                        Order History
                    </div>
                </div>

                {isLoading ? (
                    <div className='flex items-center justify-center min-h-[400px]'>
                        <div className='flex flex-col items-center gap-4'>
                            <div className='w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
                            <span className='text-gray-600 text-sm'>Loading your orders...</span>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-8 md:gap-12 flex-1 max-w-5xl mx-auto w-full'>
                        {orders?.map((order) => (
                            <div
                                key={order.id}
                                className='border-b pb-8 last:border-b-0'>
                                {/* Order Header */}
                                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex items-center gap-3'>
                                            <span className='md:text-lg font-semibold'>{order.order_no}</span>
                                            <span classNdateame={`text-sm font-light flex items-center gap-1 ${order.statusColor}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </span>
                                        </div>
                                        <span className='text-xs text-gray-600 font-light'>Ordered on {new Date(order.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className='flex flex-col md:items-end'>
                                        <span className='text-lg font-semibold'>{formatPrice(order.total_amount)}</span>
                                        <span className='text-xs text-gray-600 font-light'>{order.order_items.length} item(s)</span>
                                    </div>
                                </div>

                                {/* Order Items - First Product Preview */}
                                {order.order_items.length > 0 && (
                                    <div
                                        className='flex items-start gap-4 border-b pb-6 mb-6 cursor-pointer hover:bg-gray-50 transition-all p-2 -m-2 rounded '
                                        onClick={() => setSelectedOrder(order)}>
                                        <div className='h-40 relative flex-shrink-0 aspect-[2/3]'>
                                            <Image
                                                src={order.order_items[0].products.images[0]}
                                                alt={order.order_items[0].products.name[0]}
                                                fill
                                                className='object-cover' />
                                        </div>

                                        <div className='h-40 flex justify-between flex-col flex-1 min-w-0'>
                                            <div className='flex flex-col md:gap-1'>
                                                <span className='text-sm text-gray-700'>{order.order_items[0].products.brand}</span>
                                                <span className='text-sm font-semibold line-clamp-2'>{order.order_items[0].products.name}</span>
                                                {order.order_items.length > 1 && (
                                                    <span className='text-xs text-gray-600 font-light md:mt-1'>
                                                        +{order.order_items.length - 1} more item{order.order_items.length - 1 > 1 ? 's' : ''}
                                                    </span>
                                                )}
                                            </div>

                                            <div className='flex flex-col'>
                                                <span className='text-sm text-gray-700'>Shipping To</span>
                                                <span className='text-sm font-semibold line-clamp-2'>{order.addresses.full_name}</span>
                                                <span className='text-xs text-gray-600 font-light mt-1'>{order.addresses.zip}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Order Actions */}
                                <div className='flex gap-3 mt-6'>
                                    <button
                                        onClick={() => setTrackingModal(order)}
                                        className='border-2 border-black px-4 py-2 text-sm font-light hover:bg-gray-100 transition-all'>
                                        Track Order
                                    </button>
                                    <button
                                        onClick={() => setInvoiceModal(order)}
                                        className='border-2 border-black px-4 py-2 text-sm font-light hover:bg-gray-100 transition-all flex items-center gap-1'>
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
                        {orders && orders.length === 0 && (
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
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <Modal>
                    <div
                        className='bg-white p-6 md:p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center mb-6'>
                            <div className='flex flex-col gap-1'>
                                <span className='text-xl font-semibold'>#{selectedOrder.order_no}</span>
                                <span className='text-sm text-gray-600 font-light'>Ordered on {new Date(selectedOrder.created_at).toLocaleDateString()}</span>
                            </div>
                            <span
                                className='text-2xl cursor-pointer hover:text-gray-600'
                                onClick={() => setSelectedOrder(null)}>
                                ×
                            </span>
                        </div>

                        {/* All Order Items */}
                        <div className='flex flex-col gap-6 mb-6'>
                            {selectedOrder.order_items.map((item) => (
                                <div key={item.id} className='flex items-start gap-4 border-b pb-4 last:border-b-0'>
                                    <div className='h-24 md:h-32 lg:h-40 aspect-[2/3] relative flex-shrink-0'>
                                        <Image
                                            src={item.products.images[0]}
                                            alt={item.productsname}
                                            fill
                                            className='object-cover'
                                        />
                                    </div>
                                    <div className='flex flex-col justify-between flex-1 min-w-0'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm text-gray-700'>{item.products.brand}</span>
                                            <span className='text-sm font-semibold line-clamp-2'>{item.products.name}</span>
                                            <div className='flex flex-wrap gap-3 text-xs text-gray-600 font-light mt-1'>
                                                {item.color && <span>Color: {item.color}</span>}
                                                <span>Size: {item.size}</span>
                                                <span>Qty: {item.qty}</span>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2 mt-2'>
                                            {item.cost && (
                                                <span className='text-gray-400 line-through text-xs'>{item.cost}</span>
                                            )}
                                            <span className='text-sm font-semibold'>{formatPrice(item.price * item.qty)}</span>
                                            {item.qty > 1 && (
                                                <span className='text-xs text-gray-600 font-light'>
                                                    {formatPrice(item.price)} each
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Shipping Details */}
                        <div className='flex flex-col gap-2 text-sm border-t pt-6 mb-6'>
                            <span className='text-lg font-light mb-2'>Shipping Details</span>
                            <div className='flex flex-col gap-1'>
                                <div className='font-semibold'>{selectedOrder.addresses.full_name}</div>
                                <div className='text-gray-600'>{selectedOrder.addresses.address_line}</div>
                                <div className='text-gray-600'>{selectedOrder.addresses.zip}</div>
                                <div className='text-gray-600'>{selectedOrder.addresses.phone}</div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className='flex flex-col gap-2 text-sm border-t pt-6'>
                            <span className='text-lg font-light mb-2'>Order Summary</span>
                            <div className='flex justify-between'>
                                <span className='text-gray-600 font-light'>Total MRP</span>
                                <span>{formatPrice(selectedOrder.total_mrp)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600 font-light'>Discount on MRP</span>
                                <span className='text-primary'>-{formatPrice(selectedOrder.total_mrp - selectedOrder.total_price)}</span>
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
                                        <span>{formatPrice(selectedOrder.shipping_fee)}</span>
                                    )}
                                </div>
                            </div>
                            <div className='flex justify-between font-semibold border-t pt-2 mt-2'>
                                <span>Total Amount</span>
                                <span>{formatPrice(selectedOrder.total_amount)}</span>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className='w-full border-2 border-black p-2 text-sm font-light hover:bg-gray-100 transition-all'>
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Track Order Modal */}
            {trackingModal && (
                <Modal>
                    <div
                        className='bg-white p-6 md:p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto rounded-lg'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-2xl font-light'>Track Order</h2>
                            <span
                                className='text-2xl cursor-pointer hover:text-gray-600'
                                onClick={() => setTrackingModal(null)}>
                                ×
                            </span>
                        </div>

                        <div className='space-y-6'>
                            {/* Order Number */}
                            <div className='bg-gray-50 p-4 rounded-lg'>
                                <p className='text-sm text-gray-600 font-light mb-1'>Order Number</p>
                                <p className='text-lg font-semibold'>{trackingModal.order_no}</p>
                            </div>

                            {/* Tracking Timeline */}
                            <div className='space-y-4'>
                                <h3 className='text-lg font-light mb-4'>Order Status</h3>

                                {/* Timeline Steps */}
                                <div className='space-y-4'>
                                    {/* Order Placed */}
                                    <div className='flex gap-4'>
                                        <div className='flex flex-col items-center'>
                                            <div className='w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold'>✓</div>
                                            <div className='w-1 h-12 bg-green-500 mt-2'></div>
                                        </div>
                                        <div className='pb-8'>
                                            <p className='font-semibold text-green-600'>Order Placed</p>
                                            <p className='text-sm text-gray-600 font-light'>
                                                {new Date(trackingModal.created_at).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Order Confirmed */}
                                    <div className='flex gap-4'>
                                        <div className='flex flex-col items-center'>
                                            <div className='w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold'>✓</div>
                                            <div className='w-1 h-12 bg-green-500 mt-2'></div>
                                        </div>
                                        <div className='pb-8'>
                                            <p className='font-semibold text-green-600'>Order Confirmed</p>
                                            <p className='text-sm text-gray-600 font-light'>We have received and confirmed your order</p>
                                        </div>
                                    </div>

                                    {/* Processing */}
                                    <div className='flex gap-4'>
                                        <div className='flex flex-col items-center'>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${trackingModal.status === 'Processing' || trackingModal.status === 'Shipped' || trackingModal.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                                {trackingModal.status === 'Processing' || trackingModal.status === 'Shipped' || trackingModal.status === 'Delivered' ? '✓' : '◦'}
                                            </div>
                                            <div className={`w-1 h-12 mt-2 ${trackingModal.status === 'Shipped' || trackingModal.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        </div>
                                        <div className='pb-8'>
                                            <p className={`font-semibold ${trackingModal.status === 'Processing' || trackingModal.status === 'Shipped' || trackingModal.status === 'Delivered' ? 'text-green-600' : 'text-gray-600'}`}>Processing</p>
                                            <p className='text-sm text-gray-600 font-light'>We are preparing your order for shipment</p>
                                        </div>
                                    </div>

                                    {/* Shipped */}
                                    <div className='flex gap-4'>
                                        <div className='flex flex-col items-center'>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${trackingModal.status === 'Shipped' || trackingModal.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                                {trackingModal.status === 'Shipped' || trackingModal.status === 'Delivered' ? '✓' : '◦'}
                                            </div>
                                            <div className={`w-1 h-12 mt-2 ${trackingModal.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        </div>
                                        <div className='pb-8'>
                                            <p className={`font-semibold ${trackingModal.status === 'Shipped' || trackingModal.status === 'Delivered' ? 'text-green-600' : 'text-gray-600'}`}>Shipped</p>
                                            <p className='text-sm text-gray-600 font-light'>Your order is on its way to you</p>
                                        </div>
                                    </div>

                                    {/* Delivered */}
                                    <div className='flex gap-4'>
                                        <div className='flex flex-col items-center'>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${trackingModal.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                                {trackingModal.status === 'Delivered' ? '✓' : '◦'}
                                            </div>
                                        </div>
                                        <div>
                                            <p className={`font-semibold ${trackingModal.status === 'Delivered' ? 'text-green-600' : 'text-gray-600'}`}>Delivered</p>
                                            <p className='text-sm text-gray-600 font-light'>Your order has been delivered</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Current Status */}
                            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                                <p className='text-sm font-light text-blue-900'>
                                    <span className='font-semibold'>Current Status:</span> {trackingModal.status}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setTrackingModal(null)}
                            className='w-full border-2 border-black p-3 text-sm font-light hover:bg-gray-100 transition-all mt-6'
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            )}

            {/* View Invoice Modal */}
            {invoiceModal && (
                <Modal>
                    <div
                        className='bg-white p-6 md:p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto rounded-lg'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-2xl font-light'>Invoice</h2>
                            <span
                                className='text-2xl cursor-pointer hover:text-gray-600'
                                onClick={() => setInvoiceModal(null)}>
                                ×
                            </span>
                        </div>

                        {/* Invoice Content */}
                        <div id='invoice' className='space-y-6'>
                            {/* Header */}
                            <div className='border-b pb-6'>
                                <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[80px] mb-4" />
                                <h1 className='text-2xl font-light'>INVOICE</h1>
                                <p className='text-sm text-gray-600 font-light'>Order #{invoiceModal.order_no}</p>
                            </div>

                            {/* Order Details */}
                            <div className='grid grid-cols-2 gap-6'>
                                <div>
                                    <p className='text-xs text-gray-600 font-light uppercase mb-1'>Invoice Date</p>
                                    <p className='font-semibold'>
                                        {new Date(invoiceModal.created_at).toLocaleDateString('en-IN')}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-xs text-gray-600 font-light uppercase mb-1'>Order Status</p>
                                    <p className='font-semibold'>{invoiceModal.status}</p>
                                </div>
                            </div>

                            {/* Billing & Shipping Address */}
                            <div className='grid grid-cols-2 gap-6 border-t pt-6'>
                                <div>
                                    <p className='text-sm font-light text-gray-600 mb-2 uppercase'>Shipping Address</p>
                                    <div className='text-sm font-light space-y-1'>
                                        <p className='font-semibold'>{invoiceModal.addresses.full_name}</p>
                                        <p>{invoiceModal.addresses.address_line}</p>
                                        <p>{invoiceModal.addresses.zip}</p>
                                        <p>{invoiceModal.addresses.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-sm font-light text-gray-600 mb-2 uppercase'>Billing Address</p>
                                    <div className='text-sm font-light space-y-1'>
                                        <p className='font-semibold'>{invoiceModal.addresses.full_name}</p>
                                        <p>{invoiceModal.addresses.address_line}</p>
                                        <p>{invoiceModal.addresses.zip}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Items Table */}
                            <div className='border-t pt-6'>
                                <table className='w-full text-sm'>
                                    <thead>
                                        <tr className='border-b'>
                                            <th className='text-left py-2 font-light text-gray-600'>Product</th>
                                            <th className='text-center py-2 font-light text-gray-600'>Qty</th>
                                            <th className='text-right py-2 font-light text-gray-600'>Price</th>
                                            <th className='text-right py-2 font-light text-gray-600'>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceModal.order_items.map((item) => (
                                            <tr key={item.id} className='border-b'>
                                                <td className='py-3'>
                                                    <div className='font-light'>
                                                        <p className='font-semibold'>{item.products.name}</p>
                                                        <p className='text-xs text-gray-600'>{item.products.brand}</p>
                                                    </div>
                                                </td>
                                                <td className='text-center py-3 font-light'>{item.qty}</td>
                                                <td className='text-right py-3 font-light'>{formatPrice(item.price)}</td>
                                                <td className='text-right py-3 font-semibold'>{formatPrice(item.price * item.qty)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Price Summary */}
                            <div className='flex flex-col items-end space-y-2 border-t pt-6'>
                                <div className='flex justify-between w-48'>
                                    <span className='text-gray-600 font-light'>Subtotal</span>
                                    <span>
                                        {formatPrice(invoiceModal.order_items.reduce((sum, item) => sum + (item.price * item.qty), 0))}
                                    </span>
                                </div>
                                <div className='flex justify-between w-48'>
                                    <span className='text-gray-600 font-light'>Shipping</span>
                                    <span className='text-green-600 font-medium'>FREE</span>
                                </div>
                                <div className='flex justify-between w-48 border-t pt-2 font-semibold text-lg'>
                                    <span>Total</span>
                                    <span>{formatPrice(invoiceModal.total_amount)}</span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className='border-t pt-6 text-center text-xs text-gray-600 font-light'>
                                <p>Thank you for your business!</p>
                                <p className='mt-2'>For any queries, please contact us at support@mas.com</p>
                            </div>
                        </div>

                        <div className='flex gap-3 mt-6'>
                            <button
                                onClick={() => window.print()}
                                className='flex-1 bg-black text-white p-3 text-sm font-light hover:bg-gray-800 transition-all'
                            >
                                Print Invoice
                            </button>
                            <button
                                onClick={() => setInvoiceModal(null)}
                                className='flex-1 border-2 border-black p-3 text-sm font-light hover:bg-gray-100 transition-all'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default OrdersPage
