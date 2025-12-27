"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const CartPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    id: 1,
    name: 'John Doe',
    address: '123 Main Street, City',
    zip: '123456',
    phone: '+91 9876543210'
  });
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main Street, City',
      zip: '123456',
      phone: '+91 9876543210'
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '456 Park Avenue, Downtown',
      zip: '789012',
      phone: '+91 9876543211'
    }
  ]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    zip: '',
    phone: ''
  });
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Initialize temp selected address when modal opens
    if (showAddressModal) {
      setTempSelectedAddress(selectedAddress);
    }
  }, [showAddressModal, selectedAddress]);

  const handleAddressSelect = (address) => {
    setTempSelectedAddress(address);
  };

  const handleConfirmAddress = () => {
    if (tempSelectedAddress) {
      setSelectedAddress(tempSelectedAddress);
    }
    setShowAddressModal(false);
  };

  const handleAddNewAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.zip && newAddress.phone) {
      const newId = Math.max(...addresses.map(a => a.id)) + 1;
      const addressToAdd = {
        id: newId,
        ...newAddress
      };
      setAddresses([...addresses, addressToAdd]);
      setTempSelectedAddress(addressToAdd);
      setNewAddress({ name: '', address: '', zip: '', phone: '' });
      setShowAddAddressModal(false);
    }
  };

  const handleEditAddress = () => {
    if (tempSelectedAddress) {
      setEditingAddress({ ...tempSelectedAddress });
      setShowEditAddressModal(true);
    }
  };

  const handleSaveEditedAddress = () => {
    if (editingAddress && editingAddress.name && editingAddress.address && editingAddress.zip && editingAddress.phone) {
      setAddresses(addresses.map(addr =>
        addr.id === editingAddress.id ? editingAddress : addr
      ));
      setTempSelectedAddress(editingAddress);
      setEditingAddress(null);
      setShowEditAddressModal(false);
    }
  };

  return (<div className={`transition-all duration-500 ease-out
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

    <div className='px-4 sm:px-6 md:px-10 lg:px-20 pb-2 flex flex-col h-screen'>
      {/* Navbar */}
      <div className='py-4'>
        <div className="flex justify-center cursor-pointer" onClick={() => router.push('/')}>
          <img src="https://i.postimg.cc/K8VFC1p5/M-s-1.png" alt="Más" className="w-[100px]" />
        </div>

        <div className='text-center text-4xl pt-2 font-extralight'>
          Your Shopping Cart
        </div>
      </div>

      <div className='flex flex-col max-h-full md:flex-row gap-6 overflow-auto lg:gap-20 flex-1'>
        {/* Cart Items */}
        <div className='w-full md:w-3/4 py-1 md:py-2 lg:py-4 md:overflow-auto'>
          {/* Item 1 */}
          <div className='border-b py-6 flex items-center min-w-[350px]'>
            <div className='h-24 md:h-36 lg:h-48 w-24 md:w-36 lg:w-48 mr-4 relative'>
              <Image
                src="/hoodie.avif"
                alt="Product Image"
                fill
                className='object-cover'
              />
            </div>
            <div className='flex flex-col justify-center flex-1 relative'>
              <span className='text-sm text-gray-700'>Zara</span>
              <span className='line-clamp-1 pb-2 lg:pb-4'>Loose fit zip through hoodie</span>

              <span className='text-gray-600 font-light text-xs'>Color: Black</span>
              <span className='text-gray-600 font-light text-xs'>Size: L</span>

              <div className='flex items-center pt-1 md:pt-2 lg:pt-4'>
                <label htmlFor="quantity" className='text-gray-600 font-light text-xs'>Qty:</label>
                <select name="quantity" id="quantity" className='bg-transparent w-7 text-xs scale-70'>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className='pt-2 md:pt-3 lg:pt-6 flex gap-2 text-xs font-semibold text-gray-500'>
                <span className='cursor-pointer hover:text-black'>Edit</span>
                |
                <span className='cursor-pointer hover:text-black'>Remove</span>
                |
                <span className='cursor-pointer hover:text-black'>Move to wishlist</span>
              </div>

              <div className='flex flex-col absolute right-2 items-end'>
                <span className='text-gray-400 line-through text-xs text-extralight'>₹5,499</span>
                <span className=''>₹3,999</span>
              </div>

            </div>
          </div>
          {/* Item 1 */}
          <div className='border-b py-6 flex items-center min-w-[350px]'>
            <div className='h-24 md:h-36 lg:h-48 w-24 md:w-36 lg:w-48 mr-4 relative'>
              <Image
                src="/hoodie.avif"
                alt="Product Image"
                fill
                className='object-cover'
              />
            </div>
            <div className='flex flex-col justify-center flex-1 relative'>
              <span className='text-sm text-gray-700'>Zara</span>
              <span className='line-clamp-1'>Loose fit zip through hoodie</span>
              <span className='font-light text-gray-500 pb-1 mb:pb-2 lg:pb-4 text-sm'>Sold by: Zara India</span>
              <span className='text-gray-600 font-light text-xs'>Color: Black</span>
              <span className='text-gray-600 font-light text-xs'>Size: L</span>

              <div className='flex items-center pt-1 md:pt-2 lg:pt-4'>
                <label htmlFor="quantity" className='text-gray-600 font-light text-xs'>Qty:</label>
                <select name="quantity" id="quantity" className='w-7 text-xs scale-70'>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className='pt-2 md:pt-3 lg:pt-6 flex gap-2 text-xs font-semibold text-gray-500'>
                <span className='cursor-pointer hover:text-black'>Edit</span>
                |
                <span className='cursor-pointer hover:text-black'>Remove</span>
                |
                <span className='cursor-pointer hover:text-black'>Move to wishlist</span>
              </div>

              <div className='flex flex-col absolute right-2 items-end'>
                <span className='text-gray-400 line-through text-xs text-extralight'>₹5,499</span>
                <span className=''>₹3,999</span>
              </div>

            </div>
          </div>


          <div className='pt-8 pb-4'>
            <span className='text-3xl font-bold'>Nothing else here</span><br />
            <span className='text-gray-500'>Find something special to add...</span>
          </div>
        </div>

        {/* Customer Information & Order Summary */}
        <div className='w-full md:w-1/4 min-w-[330px] md:min-w-[270px] flex flex-col'>
          {/* Customer Information */}
          <div className='flex flex-col border-black h-max'>
            <span className='text-lg sm:text-2xl font-light pb-2'>Customer Information</span>

            <div className='flex flex-col gap-2 text-xs'>
              <div className='text-sm font-semibold'>{selectedAddress.name}</div>
              <div>{selectedAddress.address}</div>
              <div>{selectedAddress.zip}</div>
              <div className='text-sm'>{selectedAddress.phone}</div>
              <span
                className='text-xs text-gray-600 underline cursor-pointer hover:text-black pt-1'
                onClick={() => setShowAddressModal(true)}
              >
                Change Address
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className='flex flex-col border-black h-max'>
            <span className='text-lg sm:text-2xl font-light pt-6 pb-2'>Order Summary</span>

            <div className='flex flex-col gap-2'>
              <span className='font-semibold pb-1 md:pb-2 lg:pb-4 underline underline-offset-4 text-xs md:text-sm lg:text-base'>2 Item(s)</span>

              <div className='flex justify-between text-sm'><span>Total MRP</span> <span>₹14,499</span></div>
              <div className='flex justify-between text-sm'><span>Discount on MRP</span> <span className='text-primary'>-₹4,350</span></div>

              <input type="text" id='discountCoupon' placeholder='Add a coupon' className='border border-black text-primary p-2 text-sm' />

              <div className='flex justify-between text-sm'><span>Coupon Discount</span> <span className='text-primary'>-₹2,030</span></div>


              <div className='flex justify-between text-sm'>
                <span>Shipping fee</span>
                <div>
                  <span className='text-gray-400 line-through'>₹99</span>
                  <span className='font-semibold text-primary'> FREE</span>
                </div>
              </div>

              <div className='flex justify-between font-semibold border-t-2 py-2 my-2'>
                <span>Total Amount</span>
                <span>₹8,119</span></div>
            </div>
          </div>

          <div className='w-full mt-2 bg-black text-white hover:bg-gray-800 p-2 text-center text-sm cursor-pointer font-light'>Checkout</div>
          <div className='w-full mt-2 border-2 border-black p-2 text-center text-sm cursor-pointer font-light hover:bg-gray-100'>Add from wishlist</div>

        </div>
      </div>

      {/* Address Selection Modal */}
      {showAddressModal && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className='bg-white p-6 md:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <span className='text-xl font-light'>Select Address</span>
              <span
                className='text-2xl cursor-pointer hover:text-gray-600'
                onClick={() => setShowAddressModal(false)}
              >
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
                  onClick={() => handleAddressSelect(address)}
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
                      <div className='font-semibold'>{address.name}</div>
                      <div className='text-gray-600'>{address.address}</div>
                      <div className='text-gray-600'>{address.zip}</div>
                      <div className='text-gray-600'>{address.phone}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className='border-2 border-dashed border-gray-300 p-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-all text-center'
              onClick={() => setShowAddAddressModal(true)}
            >
              <span className='text-sm font-light'>+ Add New Address</span>
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={handleEditAddress}
                disabled={!tempSelectedAddress}
                className={`flex-1 border-2 border-black p-2 text-sm font-light hover:bg-gray-100 ${!tempSelectedAddress ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                Edit
              </button>
              <button
                onClick={handleConfirmAddress}
                className='flex-1 bg-black text-white p-2 text-sm font-light hover:bg-gray-800'
              >
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
                onClick={handleAddNewAddress}
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
                  value={editingAddress.name}
                  onChange={(e) => setEditingAddress({ ...editingAddress, name: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter full name'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Address</label>
                <input
                  type='text'
                  value={editingAddress.address}
                  onChange={(e) => setEditingAddress({ ...editingAddress, address: e.target.value })}
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
                onClick={() => {
                  setShowEditAddressModal(false);
                  setEditingAddress(null);
                }}
                className='flex-1 border-2 border-black p-2 text-sm font-light hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditedAddress}
                className='flex-1 bg-black text-white p-2 text-sm font-light hover:bg-gray-800'
              >
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
