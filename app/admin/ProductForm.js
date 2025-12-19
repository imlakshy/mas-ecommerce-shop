import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const ProductForm = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [rate, setRate] = useState("");
    const [discount, setDiscount] = useState("");
    const [price, setPrice] = useState("");
    const [imgUrl, setImgUrl] = useState([]);
    const [uuid, setUuid] = useState(180720240001);

    //Displaying price in real time
    useEffect(() => {
        if (rate > 0 && (discount < 99 && discount >= 0)) {
            setPrice(Math.floor(rate - (rate * (discount / 100))));
        }
    }, [rate, discount])

    //To make array of Image URLs
    const handleImgUrl = (e) => {
        const imgUrls = e.split(" ");
        setImgUrl(imgUrls);
    }

    //Adding product details in a JSON file
    const onSubmit = async (data) => {
        const product = { ...data, price, uuid, imgUrl };
        try {
            const response = await axios.post("/api/", product);

            if (response.status === 200) {
                alert('Product added successfully!');
                fetchUuid();
                reset();
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //Fetching product UUID
    const fetchUuid = async () => {
        try {
            const res = await axios.get("/api/");

            const lastuuid = res.data[(res.data.length) - 1].uuid;

            if (lastuuid) {
                setUuid(lastuuid + 1);
            }
        }
        catch {
            console.log("Sorry! Not able to fetch data. ");
        }
    }

    //Fetching product details
    useEffect(() => {
        fetchUuid();
    }, [])


    return (
        <div className='min-w-[375px] max-h-[80vh] bg-neutral-200 rounded-xl z-10 absolute top-[50vh] left-[50vw] 
        -translate-y-1/2 -translate-x-1/2 shadow-2xl overflow-y-auto'>

            <div className='bg-[#d0d0d0] flex justify-between items-center h-16 px-5'>
                <h1 className='text-xl font-bold'>Product Details:</h1>
                <p className='text-xl font-bold'> {price > 0 ? "₹" + price : ""}</p>
            </div>

            <div className="grid w-full max-w-sm items-center gap-5 pt-5 p-10 pb-5">

                <div className='text-gray-400'>
                    UUID: <span className='text-gray-500 font-semiboldbold'>{uuid}</span>
                </div>

                <form className='flex flex-col gap-5'>
                    <Label htmlFor="name">Name
                        <Input {...register("name", { required: true })} placeholder="Name" className='mt-2' />
                    </Label>

                    <Label htmlFor="desc">Description
                        <textarea {...register("desc", { required: true })} className='px-3 py-3 w-full mt-2 h-10 rounded-sm'></textarea>
                    </Label>

                    <div className='flex gap-2'>
                        <Label htmlFor="rate">Rate
                            <Input type="number" {...register("rate", { required: true, valueAsNumber: true })} placeholder="Rate" className="mt-2"
                                value={rate} onChange={e => { setRate(Number(e.target.value)) }} />
                        </Label>

                        <Label htmlFor="discount">Discount
                            <Input type="number" {...register("discount", { required: true, valueAsNumber: true, max: 99 })} placeholder="Discount" className="mt-2" value={discount} onChange={e => { setDiscount(Number(e.target.value)) }} />
                        </Label>

                        <Label htmlFor="units">Units
                            <Input defaultValue="5" type="number" {...register("units", { required: true, valueAsNumber: true })} placeholder="Units" className="mt-2" />
                        </Label>
                    </div>

                    <div className='flex gap-2'>
                        <Label htmlFor="gender" className='block flex-1'>Gender
                            <select {...register("gender")} className='w-full h-10 rounded-sm px-3 py-2 mt-2'>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </Label>


                        <Label htmlFor="category">Category
                            <Input type="text" {...register("category", { required: true })} placeholder="Category" className='mt-2' />
                        </Label>
                    </div>

                    <div className='flex gap-2'>
                        <Label htmlFor="brand">Brand
                            <Input type="text" {...register("brand", { required: true })} placeholder="Brand" className="mt-2" />
                        </Label>

                        <Label htmlFor="imgUrl">Image URL: {imgUrl.length > 0 && imgUrl.length}
                            <Input type="url" placeholder="Image URL" className='mt-2' onChange={(e) => handleImgUrl(e.target.value)} />
                        </Label>
                    </div>
                </form>
            </div>

            {/* <div className='absolute z-20 bottom-0 bg-gradient-to-b from-[#e5e5e548] to-neutral-200 flex justify-center w-full'> */}
            <div className='flex justify-center w-full pb-5 items-center'>
                <Button className='w-1/3 text-base' onClick={handleSubmit(onSubmit)}>Save</Button>
            </div>
            {/* </div> */}

        </div>
    )
}

export default ProductForm
