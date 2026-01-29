"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRight, Edit2, Plus, Trash2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import { supabase } from '@/lib/createSupabaseClient'
import Modal from '@/components/Modal'

const AccountPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);



  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    zip: '',
    phone: ''
  });

  const [editProfile, setEditProfile] = useState({
    name: '',
    email: '',
    password: ','
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (showEditAddressModal || showAddAddressModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showEditAddressModal, showAddAddressModal]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
    setMounted(true);
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;
    const init = async () => {
      const data = await supabase.from("addresses").select("*").eq("user_id", user.id)
      setAddresses(data.data);

      const { data: ordersData } = await supabase.from("orders")
        .select(`*,
        order_items(
        price,
        qty,
        products(
        brand,
        name,
        cost,
        images))`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }).limit(3);

      setOrders(ordersData);
    }
    init();
  }, [user, addresses, orders]);

  const handleAddAddress = async () => {
    const { error } = await supabase.from("addresses").insert({
      user_id: user.id,
      full_name: newAddress.name,
      phone: newAddress.phone,
      address_line: newAddress.address,
      zip: newAddress.zip,
    })

    if (error) {
      if (error.code === "23505") {
        toast.error("Address Already Exists");
      }
    }
    setShowAddAddressModal(false)
    setNewAddress([])
  }

  const handleEditProfile = () => {
    setEditProfile({ name: user?.user_metadata.display_name || '', email: user?.email || '', phone: user?.phone || '' });
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = async () => {
    setShowEditProfileModal(false);
    return toast.promise(
      supabase.auth.updateUser({
        data: {
          display_name: editProfile.name,
        },
        password: editProfile.password,
      }),
      {
        loading: "Updating...",
        success: "Profile updated",
        error: (err) => err?.message || "Failed to update profile",
      }
    );
  };

  const handleEditAddress = (address) => {
    setEditingAddress({ ...address });
    setShowEditAddressModal(true);
  };

  const handleSaveEditedAddress = async (id) => {
    if (editingAddress != null) {
      await supabase.from("addresses").update({
        full_name: editingAddress.full_name,
        address_line: editingAddress.address_line,
        zip: editingAddress.zip,
        phone: editingAddress.phone,
      }).eq("id", id);

      setEditingAddress(null);
      setShowEditAddressModal(false);
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
            My Account
          </div>
        </div>

        <div className='flex flex-col gap-8 md:gap-12 flex-1 max-w-4xl mx-auto w-full'>
          {/* Profile Information */}
          <div className='flex flex-col border-b pb-6'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-lg sm:text-2xl font-light'>Profile Information</span>
              <button
                onClick={handleEditProfile}
                className='text-xs text-gray-600 underline hover:text-black flex items-center gap-1'
              >
                <Edit2 className='w-3 h-3' />
                Edit
              </button>
            </div>

            <div className='flex flex-col gap-2 text-sm'>
              <div>
                <span className='text-gray-600 font-light'>Name:</span>
                <span className='ml-2 font-semibold'>{user?.user_metadata.display_name}</span>
              </div>
              <div>
                <span className='text-gray-600 font-light'>Email:</span>
                <span className='ml-2 font-semibold'>{user?.email}</span>
              </div>
              <div>
                <span className='text-gray-600 font-light text-xs underline cursor-pointer' onClick={handleEditProfile}>Change Password</span>
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className='flex flex-col border-b pb-6'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-lg sm:text-2xl font-light'>Saved Addresses</span>
              <button
                onClick={() => setShowAddAddressModal(true)}
                className='text-xs text-gray-600 underline hover:text-black flex items-center gap-1'
              >
                <Plus className='w-3 h-3' />
                Add New
              </button>
            </div>

            <div className='flex flex-col gap-4'>
              {addresses?.map((address) => (
                <div
                  key={address.id}
                  className='border-2 border-gray-300 p-4 flex justify-between items-start'
                >
                  <div className='flex flex-col gap-1 text-sm flex-1'>
                    <div className='font-semibold'>{address.full_name}</div>
                    <div className='text-gray-600'>{address.address_line}</div>
                    <div className='text-gray-600'>{address.zip}</div>
                    <div className='text-gray-600'>{address.phone}</div>
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleEditAddress(address)}
                      className='text-gray-600 hover:text-black'
                    >
                      <Edit2 className='w-4 h-4' />
                    </button>

                    <button
                      onClick={async () => {
                        await supabase.from("addresses").delete().eq("id", address.id)
                      }}
                      className='text-gray-600 hover:text-red-600'>
                      <Trash2 className='w-4 h-4' />
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order History */}
          <div className='flex flex-col pb-6'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-lg sm:text-2xl font-light'>Order History</span>
              <span onClick={() => router.push('/orders')} className='text-xs text-gray-600 underline cursor-pointer hover:text-black'>
                View All
              </span>
            </div>

            <div className='flex flex-col gap-4'>
              {orders?.map((order) => (
                <div
                  key={order.id}
                  className='border-b py-4 flex flex-col gap-2'>
                  <div className='flex justify-between items-start'>
                    <div className='flex gap-2'>
                      <div className='relative w-16 mb-2 overflow-hidden bg-gray-100 aspect-[2/3]'>
                        <Image
                          src={order.order_items[0]?.products?.images[0]}
                          alt="Product Image"
                          fill
                          className='object-cover transition duration-200 group-hover:scale-110' />
                      </div>

                      <div className='flex flex-col justify-center text-sm'>
                        <div className='text-gray-600 font-semibold'>{order.order_items[0].products.brand} - {order.order_items[0].products.name}</div>
                        {order.order_items.length > 1 && <div className='text-gray-600 font-light'>+{(order.order_items?.length) - 1} item(s)</div>}

                        <div className='text-gray-600 font-light mt-2'>{new Date(order.created_at).toLocaleDateString()}</div>
                        <div className={`font-light`}> {order.payment_method}</div>
                      </div>
                    </div>

                    <div className='flex flex-col items-end gap-1 text-sm'>
                      <div className={`font-light ${order.order_status === 'Delivered' ? 'text-green-600' :
                        order.order_status === 'Shipped' ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                        {order.order_status}
                      </div>
                      <div className='font-semibold'>{formatPrice(order.total_amount)}</div>
                      <button className='text-xs text-gray-600 underline hover:text-black mt-1 flex items-center gap-1'>
                        View Details <ArrowRight className='w-3 h-3' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <Modal>
          <div
            className='bg-white p-6 md:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <span className='text-xl font-light'>Edit Profile</span>
              <span
                className='text-2xl cursor-pointer hover:text-gray-600'
                onClick={() => setShowEditProfileModal(false)}>
              </span>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Full Name</label>
                <input
                  type='text'
                  value={editProfile.name}
                  onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter full name'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Email</label>
                <div
                  className='border border-gray-300 p-2 cursor-disabled text-sm focus:outline-none focus:border-black text-gray-400'
                  onClick={() => toast.error("Email cannot be changed")}>
                  {editProfile.email}
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>New Password</label>
                <input
                  type='password'
                  value={editProfile.password}
                  onChange={(e) => setEditProfile({ ...editProfile, password: e.target.value })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter new password'
                />
              </div>
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={() => {
                  setShowEditProfileModal(false); console.log(editProfile);
                }}
                className='flex-1 border-2 border-black p-2 text-sm font-light hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className='flex-1 bg-black text-white p-2 text-sm font-light hover:bg-gray-800'
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add New Address Modal */}
      {showAddAddressModal && (
        <Modal>
          <div
            className='bg-white p-6 md:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}>
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
                className='flex-1 border-2 border-black p-2 text-sm font-light hover:bg-gray-100'>
                Cancel
              </button>
              <button
                onClick={() => {
                  if (
                    !newAddress.name ||
                    !newAddress.address ||
                    !newAddress.phone ||
                    !newAddress.zip
                  ) {
                    toast.error("Please fill required details");
                  }
                  handleAddAddress();
                }}
                className='flex-1 bg-black text-white p-2 text-sm font-light hover:bg-gray-800'>
                Add Address
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Address Modal */}
      {showEditAddressModal && editingAddress && (
        <Modal>
          <div
            className='bg-white p-6 md:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'
            onClick={(e) => { e.stopPropagation() }}>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-xl font-light'>Edit Address</span>
              <span
                className='text-2xl cursor-pointer hover:text-gray-600'
                onClick={() => { setShowEditAddressModal(false) }}>
                ×
              </span>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Full Name</label>
                <input
                  type='text'
                  value={editingAddress.full_name}
                  onChange={(e) => setEditingAddress({ ...editingAddress, full_name: e.target.value, })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter full name'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Address</label>
                <input
                  type='text'
                  value={editingAddress.address_line}
                  onChange={(e) => setEditingAddress({ ...editingAddress, address_line: e.target.value, })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter street address'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>ZIP Code</label>
                <input
                  type='text'
                  value={editingAddress.zip}
                  onChange={(e) => setEditingAddress({ ...editingAddress, zip: e.target.value, })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter ZIP code'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-light'>Phone Number</label>
                <input
                  type='text'
                  value={editingAddress.phone}
                  onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value, })}
                  className='border border-gray-300 p-2 text-sm focus:outline-none focus:border-black'
                  placeholder='Enter phone number'
                />
              </div>
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={() => { setShowEditAddressModal(false) }}
                className='flex-1 border-2 border-black p-2 text-sm font-light hover:bg-gray-100'>
                Cancel
              </button>
              <button
                onClick={() => { handleSaveEditedAddress(editingAddress.id) }}
                className='flex-1 bg-black text-white p-2 text-sm font-light hover:bg-gray-800'>
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default AccountPage

