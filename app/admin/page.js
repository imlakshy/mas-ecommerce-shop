"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import ProductForm from './ProductForm';
import { useState } from 'react';

const admin = () => {
  const [openForm, setopenForm] = useState(true)
  return (
    <div className='relative'>
      {openForm && <ProductForm/>}
      <Button onClick={()=>{setopenForm(!openForm);
      }}>Add</Button>
    </div>
  )
}

export default admin
