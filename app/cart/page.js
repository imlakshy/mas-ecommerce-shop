"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/createSupabaseClient'
import { toast } from 'sonner'

const CartPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null);

  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    zip: '',
    phone: ''
  });
  const [editingAddress, setEditingAddress] = useState(null);

  const [addresses, setAddresses] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const [totalMRP, setTotalMRP] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponDiscount, setCoupounDiscount] = useState(0);

  const shippingFee = useMemo(() => {
    return totalPrice > 2000 ? 0 : 99;
  }, [totalPrice]);

  const totalAmount = useMemo(() => {
    return (totalPrice - couponDiscount) + shippingFee;
  }, [totalPrice, couponDiscount]);

  const formatPrice = (price) => {
    if (price == null) return "₹—";
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) return;

    const init = async () => {
      try{
        const data = await supabase.from("cart").
        select(`
          *,
          products(*)`)
        .eq("user_id", user.id);

      setCartItems(data.data || []);
      }finally{
        setIsLoading(false);
      }
    }
    init();

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.products.price * item.qty,
      0
    );
    const totalMRP = cartItems.reduce(
      (sum, item) => sum + item.products.cost * item.qty,
      0
    );

    setTotalPrice(totalPrice);
    setTotalMRP(totalMRP)
  }, [user, cartItems]);

  useEffect(() => {
    if (!user) return
    const init = async () => {
      const data = await supabase.from("addresses").select("*").eq("user_id", user.id)
      setAddresses(data.data)
    }
    init();
    if (!selectedAddress) {
      setSelectedAddress(addresses[0])
    }
  }, [user, addresses])


  useEffect(() => {
    const setSizeAndQty = async (id) => {
      if (editItemId) {
        const data = await supabase.from("cart").select("*").eq("id", id);

        setQty(data.data.qty)
        setSize(data.data.size)
      }
    }
    setSizeAndQty(editItemId);
  }, [editItemId])

  const handleMoveToWishlist = async (id, productId) => {
    const data = await supabase.from("wishlist")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", productId)

    if (data.data.length > 0) {
      toast.error("Already in wishlist");
      await supabase.from("cart").delete().eq("id", id)
    } else {
      const data = await supabase.from("wishlist").insert({
        user_id: user.id,
        product_id: productId
      })
      console.log(data);

      await supabase.from("cart").delete().eq("id", id)
      toast.success("Added to wishlist")
    }
  }

  const handleRemove = async (productId, size, color) => {
    if (!user) return;
    await supabase.from("cart")
      .delete()
      .eq("product_id", productId)
      .eq("size", size)
      .eq("color", color)
      .eq("user_id", user.id);
  }

  const handleConfirmAddress = () => {
    if (tempSelectedAddress) {
      setSelectedAddress(tempSelectedAddress);
    }
    setShowAddressModal(false);
  };

  const handleAddAddress = async () => {
    const { data, error } = await supabase.from("addresses").insert({
      user_id: user.id,
      full_name: newAddress.name,
      phone: newAddress.phone,
      address_line: newAddress.address,
      zip: newAddress.zip,
    })

    console.log(data);


    if (error) {
      if (error.code === "23505") {
        toast.error("Address Already Exists");
      }
    }
    setShowAddAddressModal(false)
    setNewAddress([]);
    setShowAddAddressModal(false)
  }

  const handleEditAddress = () => {
    if (tempSelectedAddress) {
      setEditingAddress({ ...tempSelectedAddress });
      setShowEditAddressModal(true);
    }
  };

  const handleCheckout = async () => {
    const { data: order, error } = await supabase.from("orders")
      .insert({
        user_id: user.id,
        address_id: selectedAddress.id,
        total_amount: totalAmount,
        total_price: totalPrice,
        total_mrp: totalMRP,
        coupondiscount: couponDiscount,
        shipping_fee: shippingFee,
        payment_method: 'COD'
      }).select().single();


    if (error) {
      console.log(error);

      toast.error("Failed to create order. Please try again.");
      return;
    }

    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.products.id,
      qty: item.qty,
      size: item.size,
      color: item.color,
      price: item.products.price,
    }))

    const { error: orderItemsError } = await supabase.from("order_items").insert(orderItems);


    if (orderItemsError) {
      toast.error("Failed to save order items. Please try again.");
      return;
    }

    await supabase.from("cart").delete().eq("user_id", user.id);

    router.push(`/orders/success?orderId=${order.id}`);
  };

  return (<div className={`transition-all duration-500 ease-out
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

    <div className='px-4 sm:px-6 md:px-10 lg:px-20 pb-2 flex flex-col h-screen'>
      {/* Navbar */}
      <div className='py-4'>
        <div className="flex justify-center cursor-pointer" onClick={() => router.push('/')}>
          <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]" />
        </div>

        <div className='text-center text-3xl md:text-4xl pt-2 font-extralight'>
          Your Shopping Cart
        </div>
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center min-h-[400px]'>
              <div className='flex flex-col items-center gap-4'>
                <div className='w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
                <span className='text-gray-600 text-sm'>Loading your cart...</span>
              </div>
            </div>
      ):(
        <div className='flex flex-col max-h-full md:flex-row gap-6 overflow-auto lg:gap-20 flex-1'>
        {/* Cart Items */}
        <div className='w-full md:w-3/4 py-1 md:py-2 lg:py-4 md:overflow-auto'>
          {cartItems.length > 0 && cartItems.map((item) => (
            <div key={item.id} className='border-b py-6 flex items-center min-w-[350px]'>
              <div
                className='h-24 md:h-36 lg:h-48 aspect-[2/3] mr-4 relative cursor-pointer'
                onClick={() => router.push(`/product/${item.products.id}`)}>
                <Image
                  src={item.products.images[0]}
                  alt="Product Image"
                  fill
                  className='object-cover'
                />
              </div>
              <div className='flex flex-col justify-center flex-1 relative'>
                <span className='text-xs md:text-sm text-gray-700'>{item.products.brand}</span>
                <span className='text-sm md:text-base line-clamp-1 pb-2 lg:pb-4'>{item.products.name}</span>

                {item.products.color && <span className='text-gray-600 font-light text-xs'>Color: {item.color}</span>}

                <div className='flex items-center pt-1 md:pt-2 lg:pt-4'>
                  <label htmlFor="size" className='text-gray-600 font-light text-xs'>Size: {editItemId != item.id && item.size}</label>

                  {editItemId === item.id && (
                    <select
                      id="size"
                      value={item.size}
                      onChange={
                        async (e) => {
                          await supabase.from("cart").update({ size: e.target.value }).eq("id", item.id)
                          setEditItemId(null);
                        }
                      }
                      className="bg-transparent w-10 text-xs scale-70"
                    >
                      <option value={"S"}>S</option>
                      <option value={"M"}>M</option>
                      <option value={"L"}>L</option>
                      <option value={"XL"}>XL</option>
                      <option value={"XXL"}>XXL</option>
                    </select>
                  )}

                </div>

                <div className='flex items-center pt-1 md:pt-2 lg:pt-4'>
                  <label htmlFor="quantity" className='text-gray-600 font-light text-xs'>Qty: {editItemId != item.id && item.qty}</label>

                  {editItemId === item.id && (
                    <select
                      id="quantity"
                      value={item.qty}
                      onChange={
                        async (e) => {
                          await supabase.from("cart").update({ qty: e.target.value }).eq("id", item.id)
                          setEditItemId(null);
                        }
                      }
                      className="bg-transparent w-7 text-xs scale-70"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  )}

                </div>

                <div className='pt-2 md:pt-3 lg:pt-6 flex gap-2 text-xs font-semibold text-gray-500'>
                  <span className='cursor-pointer hover:text-black' onClick={() => setEditItemId(editItemId === item.id ? null : item.id)}>{editItemId === item.id ? "Done" : "Edit"}</span>
                  |
                  <span className='cursor-pointer hover:text-black' onClick={() => { handleRemove(item.products.id, item.size, item.color) }}>Remove</span>
                  |
                  <span className='cursor-pointer hover:text-black' onClick={() => handleMoveToWishlist(item.id, item.products.id)}>Move to wishlist</span>
                </div>

                <div className='text-xs md:text-base flex flex-col absolute right-2 items-end'>
                  {item.products.price < item.products.cost && <span className='text-gray-400 line-through text-xs text-extralight'>{formatPrice(item.products.cost * item.qty)}</span>}

                  <span className='text-sm md:text-base'>{formatPrice(item.products.price * item.qty)}</span>
                </div>

              </div>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className='pt-8 pb-4'>
              <span className='text-3xl font-bold'>Nothing else here</span><br />
              <span className='text-gray-500'>Find something special to add...</span>
            </div>
          )}
        </div>

        {/* Customer Information & Order Summary */}
        <div
          className='pb-24 w-full md:w-1/4 min-w-[300px] md:min-w-[270px] flex flex-col'>
          {/* Customer Information */}
          <div
            className='bg-[#f5f5f5] md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none flex flex-col border-black h-max'>
            <span className='text-lg sm:text-2xl font-light pb-2'>Customer Information</span>

            <div className='flex flex-col gap-2 text-xs'>
              <div className='text-sm font-semibold'>{selectedAddress?.full_name}</div>
              <div>{selectedAddress?.address_line}</div>
              <div>{selectedAddress?.zip}</div>
              <div className='text-sm'>{selectedAddress?.phone}</div>
              <span
                className='text-xs text-gray-600 underline cursor-pointer hover:text-black pt-1'
                onClick={() => {
                  setShowAddressModal(true)
                  setTempSelectedAddress(selectedAddress)
                }}>
                {selectedAddress ? "Change Address" : "Add Info"}
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className='flex flex-col border-black h-max'>
            <span className='text-lg sm:text-2xl font-light pt-6 pb-2'>Order Summary</span>

            <div className='flex flex-col gap-2'>
              <span className='font-semibold pb-1 md:pb-2 lg:pb-4 underline underline-offset-4 text-xs md:text-sm lg:text-base'>{cartItems.length} Item(s)</span>

              {cartItems.length > 0 && <>
                <div className='flex justify-between text-sm'><span>Total MRP</span> <span>{formatPrice(totalMRP)}</span></div>

                {totalMRP > totalPrice && <div className='flex justify-between text-sm'><span>Discount on MRP</span> <span className='text-primary'>-{formatPrice(totalMRP - totalPrice)}</span></div>}

                <input type="text" id='discountCoupon' placeholder='Add a coupon' className='border border-black text-primary p-2 text-sm' />

                {couponDiscount > 0 && <div className='flex justify-between text-sm'><span>Coupon Discount</span> <span className='text-primary'>-₹2,030</span></div>}

                <div className='flex justify-between text-sm'>
                  <span>Total</span>
                  <div>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className='flex justify-between text-sm'>
                  <span>Shipping fee</span>
                  <div>
                    <span className={shippingFee > 0 ? " " : "text-gray-400 line-through"}>{formatPrice(99)}</span>

                    {shippingFee === 0 && <span className='font-semibold text-primary'> FREE</span>}
                  </div>
                </div>

                <div className='flex justify-between font-semibold border-t-2 py-2 my-2'>
                  <span>Total Amount</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </>}

            </div>
          </div>

          {/* Buttons */}
          {cartItems.length > 0 && <div className='w-full mt-2 bg-black text-white hover:bg-gray-800 p-2 text-center text-sm cursor-pointer font-light'
            onClick={handleCheckout}
          >Checkout</div>}

          <div
            onClick={() => router.push("/wishlist")}
            className='w-full mt-2 border-2 border-black p-2 text-center text-sm cursor-pointer font-light hover:bg-gray-100'>Add from wishlist</div>

        </div>
      </div>
      )}

      {/* Address Selection Modal */}
      {showAddressModal && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={() => setShowAddressModal(false)}>
          <div
            className='bg-white p-6 md:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-xl font-light'>Select Address</span>
              <span
                className='text-2xl cursor-pointer hover:text-gray-600'
                onClick={() => setShowAddressModal(false)}>
                ×
              </span>
            </div>

            <div className='flex flex-col gap-4 mb-4'>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border-2 p-4 cursor-pointer transition-all ${tempSelectedAddress?.id === address.id
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                    }`}
                  onClick={() => setTempSelectedAddress(address)}
                >
                  <div className='flex items-start gap-3'>
                    <input
                      type='radio'
                      name='address'
                      checked={tempSelectedAddress?.id === address.id}
                      onChange={() => handleAddressSelect(address)}
                      className='mt-1'
                    />
                    <div className='flex flex-col gap-1 text-sm flex-1'>
                      <div className='font-semibold'>{address.full_name}</div>
                      <div className='text-gray-600'>{address.address_line}</div>
                      <div className='text-gray-600'>{address.zip}</div>
                      <div className='text-gray-600'>{address.phone}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className='border-2 border-dashed border-gray-300 p-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-all text-center'
              onClick={() => setShowAddAddressModal(true)}>
              <span className='text-sm font-light'>+ Add New Address</span>
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={handleEditAddress}
                disabled={!tempSelectedAddress}
                className={`flex-1 border-2 border-black p-2 text-sm font-light hover:bg-gray-100 ${!tempSelectedAddress ? 'opacity-50 cursor-not-allowed' : ''
                  }`}>
                Edit
              </button>
              <button
                onClick={handleConfirmAddress}
                className='flex-1 bg-black text-white p-2 text-sm font-light hover:bg-gray-800'>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Address Modal */}
      {showAddAddressModal && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={() => {
            setShowAddAddressModal(false);
            setNewAddress({ name: '', address: '', zip: '', phone: '' });
          }}
        >
          <div
            className='bg-white p-6 md:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <span className='text-xl font-light'>Add New Address</span>
              <span
                className='text-2xl cursor-pointer hover:text-gray-600'
                onClick={() => {
                  setShowAddAddressModal(false);
                  setNewAddress({ name: '', address: '', zip: '', phone: '' });
                }}
              >
                ×
              </span>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Full Name</label>
                <input
                  type='text'
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter full name'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Address</label>
                <input
                  type='text'
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter street address'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>ZIP Code</label>
                <input
                  type='text'
                  value={newAddress.zip}
                  onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter ZIP code'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Phone Number</label>
                <input
                  type='text'
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter phone number'
                />
              </div>
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={() => {
                  setShowAddAddressModal(false);
                  setNewAddress({ name: '', address: '', zip: '', phone: '' });
                }}
                className='flex-1 border-2 border-black p-2 text-sm font-light hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                className='flex-1 bg-black text-white p-2 text-sm font-light hover:bg-gray-800'
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Address Modal */}
      {showEditAddressModal && editingAddress && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={() => {
            setShowEditAddressModal(false);
            setEditingAddress(null);
          }}
        >
          <div
            className='bg-white p-6 md:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <span className='text-xl font-light'>Edit Address</span>
              <span
                className='text-2xl cursor-pointer hover:text-gray-600'
                onClick={() => {
                  setShowEditAddressModal(false);
                  setEditingAddress(null);
                }}
              >
                ×
              </span>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Full Name</label>
                <input
                  type='text'
                  value={editingAddress.full_name}
                  onChange={(e) => setEditingAddress({ ...editingAddress, full_name: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter full name'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Address</label>
                <input
                  type='text'
                  value={editingAddress.address_line}
                  onChange={(e) => setEditingAddress({ ...editingAddress, address_line: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter street address'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>ZIP Code</label>
                <input
                  type='text'
                  value={editingAddress.zip}
                  onChange={(e) => setEditingAddress({ ...editingAddress, zip: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter ZIP code'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Phone Number</label>
                <input
                  type='text'
                  value={editingAddress.phone}
                  onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter phone number'
                />
              </div>
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={async () => {
                  await supabase.from("addresses").delete().eq("id", editingAddress.id)
                  setShowEditAddressModal(false)

                }}
                className='flex-1 border-2 border-black p-2 text-sm font-light hover:bg-gray-100'
              >
                Delete
              </button>
              <button
                onClick={async () => {
                  await supabase
                    .from("addresses")
                    .update({
                      full_name: editingAddress.full_name,
                      address_line: editingAddress.address_line,
                      zip: editingAddress.zip,
                      phone: editingAddress.phone
                    })
                    .eq("id", editingAddress.id);
                  setShowEditAddressModal(false)
                }}

                className='flex-1 bg-black text-white p-2 text-sm font-light hover:bg-gray-800'>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  </div>)
}

export default CartPage
