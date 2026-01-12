"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowRight, Edit2, Plus, Trash2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'
import { supabase } from '@/lib/createSupabaseClient'

const AccountPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const { user, loading } = useAuth();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main Street, City',
      zip: '123456',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '456 Park Avenue, Downtown',
      zip: '789012',
      phone: '+91 9876543211',
      isDefault: false
    }
  ]);

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

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: 2,
      total: '₹8,119',
      status: 'Delivered'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: 1,
      total: '₹3,999',
      status: 'Shipped'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      items: 3,
      total: '₹12,500',
      status: 'Delivered'
    }
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
    console.log(user);

    setMounted(true);
  }, [user, loading]);

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

  const handleAddNewAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.zip && newAddress.phone) {
      const newId = Math.max(...addresses.map(a => a.id), 0) + 1;
      const addressToAdd = {
        id: newId,
        ...newAddress,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, addressToAdd]);
      setNewAddress({ name: '', address: '', zip: '', phone: '' });
      setShowAddAddressModal(false);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress({ ...address });
    setShowEditAddressModal(true);
  };

  const handleSaveEditedAddress = () => {
    if (editingAddress && editingAddress.name && editingAddress.address && editingAddress.zip && editingAddress.phone) {
      setAddresses(addresses.map(addr =>
        addr.id === editingAddress.id ? editingAddress : addr
      ));
      setEditingAddress(null);
      setShowEditAddressModal(false);
    }
  };

  const handleDeleteAddress = (id) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
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
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className='border-2 border-gray-300 p-4 flex justify-between items-start'
                >
                  <div className='flex flex-col gap-1 text-sm flex-1'>
                    {address.isDefault && (
                      <span className='text-xs text-gray-500 font-light mb-1'>Default Address</span>
                    )}
                    <div className='font-semibold'>{address.name}</div>
                    <div className='text-gray-600'>{address.address}</div>
                    <div className='text-gray-600'>{address.zip}</div>
                    <div className='text-gray-600'>{address.phone}</div>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className='text-xs text-gray-600 underline hover:text-black mt-2 w-fit'
                      >
                        Set as default
                      </button>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleEditAddress(address)}
                      className='text-gray-600 hover:text-black'
                    >
                      <Edit2 className='w-4 h-4' />
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className='text-gray-600 hover:text-red-600'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order History */}
          <div className='flex flex-col pb-6'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-lg sm:text-2xl font-light'>Order History</span>
              <span className='text-xs text-gray-600 underline cursor-pointer hover:text-black'>
                View All
              </span>
            </div>

            <div className='flex flex-col gap-4'>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className='border-b py-4 flex flex-col gap-2'
                >
                  <div className='flex justify-between items-start'>
                    <div className='flex flex-col gap-1 text-sm'>
                      <div className='font-semibold'>{order.id}</div>
                      <div className='text-gray-600 font-light'>{order.date}</div>
                      <div className='text-gray-600 font-light'>{order.items} item(s)</div>
                    </div>
                    <div className='flex flex-col items-end gap-1 text-sm'>
                      <div className='font-semibold'>{order.total}</div>
                      <div className={`font-light ${order.status === 'Delivered' ? 'text-green-600' :
                        order.status === 'Shipped' ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                        {order.status}
                      </div>
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
        <div
          className='fixed inset-0 bg-black bg-opacity-50 h-screen flex items-center justify-center z-50'
          onClick={() => setShowEditProfileModal(false)}
        >
          <div
            className='bg-white p-6 md:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <span className='text-xl font-light'>Edit Profile</span>
              <span
                className='text-2xl cursor-pointer hover:text-gray-600'
                onClick={() => setShowEditProfileModal(false)}
              >
                
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
        </div>
      )}

      {/* Add New Address Modal */}
      {showAddAddressModal && (
        <div
          className='fixed inset-0 bg-black h-screen bg-opacity-50 flex items-center justify-center z-50'
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
          className='fixed inset-0 bg-black h-screen bg-opacity-50 flex items-center justify-center z-50'
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
    </div>
  )
}

export default AccountPage

