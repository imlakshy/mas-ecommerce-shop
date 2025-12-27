"use client"
import React, { use } from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'


const AuthPage = () => {

    const [mounted, setMounted] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSignup = async () => { }

    return (<div className={`transition-all duration-500 ease-out
    ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className='flex w-screen h-screen'>
            <div className='w-0 sm:w-4/6 relative'>
                <Image src="/loginImg.jpg" alt="Logo" fill className='object-cover' />
            </div>

            {isNewUser ?
                (<div className='w-full min-w-[320px] sm:w-1/3 p-4 flex flex-col gap-1 md:p-6 lg:p-8'>
                    <span className='text-4xl font-semibold leading-tight py-16'>Hey!<br />welcome aboard</span>

                    <div className="flex flex-col gap-8 ">
                        <h1 className="text-2xl">Sign up</h1>

                        <input type="text" id="name" placeholder="Name" className="border-b border-black font-light p-2 pl-0" value={name} onChange={(e) => setName(e.target.value)} />

                        <input type="text" id="username" placeholder="Username" className="border-b border-black font-light p-2 pl-0" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <input type="password" id="password" placeholder="Password" className="border-b border-black font-light p-2 pl-0" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button className="cursor-pointer hover:bg-[#292929] border p-2 border-black bg-black text-white font-light transition-all duration-300" onClick={handleSignup}>Sign up</button>
                    </div>
                    <button className="cursor-pointer hover:bg-gray-200 border-2 p-2 border-black hover:border-gray-200 font-light transition-all duration-300" onClick={() => setIsNewUser(false)}>Log in</button>
                </div>)
                :
                (<div className='w-2/6 p-4 flex flex-col gap-1 md:p-6 lg:p-8'>
                    <span className='text-4xl font-semibold leading-tight py-16'>Hey!<br />welcome back</span>

                    <div className="flex flex-col gap-8 ">
                        <h1 className="text-2xl">Log in</h1>

                        <input type="text" id="username" placeholder="Username" className="border-b border-black font-light p-2 pl-0" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <input type="password" id="password" placeholder="Password" className="border-b border-black font-light p-2 pl-0" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button className="cursor-pointer hover:bg-[#292929] border p-2 border-black bg-black text-white font-light transition-all duration-300" onClick={handleSignup}>Log in</button>
                    </div>
                    <button className="cursor-pointer hover:bg-gray-200 border-2 p-2 border-black hover:border-gray-200 font-light transition-all duration-300" onClick={() => setIsNewUser(true)}>Register</button>
                </div>)}
        </div>
    </div>)
}

export default AuthPage
