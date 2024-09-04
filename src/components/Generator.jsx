import React, { useState } from 'react'
import { auth, provider, db } from '../firebase/index'
import { addDoc, collection } from 'firebase/firestore'
import { BiSave } from "react-icons/bi";
import { HiClipboardDocumentList } from "react-icons/hi2"
import {toast} from 'react-toastify'

const Generator = () => {
    const [includeNumbers, setIncludeNumbers] = useState(false)
    const [includeUppercase, setIncludeUppercase] = useState(false)
    const [includeLowercase, setIncludeLowercase] = useState(false)
    const [includeSymbols, setIncludeSymbols] = useState(false)
    const [length, setLength] = useState(4)
    const [password, setPassword] = useState('')
    const [saved, setSaved] = useState(false)

    const generatePassword = () => {
        setSaved(false)
        console.log(includeLowercase, includeNumbers, includeSymbols, includeUppercase, length)
        if (!length || (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols)) {
            toast.error('Please select any option', {
                toastId: 'options',
            });
            return;
        }
        const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let characterPool = ''
        if (includeLowercase) characterPool += lowerCaseLetters
        if (includeUppercase) characterPool += upperCaseLetters
        if (includeNumbers) characterPool += numbers
        if (includeSymbols) characterPool += symbols
        let newPassword = ''
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * characterPool.length)
            newPassword += characterPool[randomIndex]
        }
        setPassword(newPassword)
    }

    const savePassword = (password) => {
        const user = auth.currentUser;
        console.log('user is ', user)
        // Add a new document
        const Ref = collection(db, "Passwords");
        try {
            console.log('dwododk')
            addDoc(Ref, {
                userId: user.uid,
                password: password
            });
            toast('Added to Saved.', {
                toastId: 'saved',
            });
        } catch (error) {
            console.log('error is ', error)
        } finally {
            setSaved(true)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard', text);
                toast('Copied to clipboard', {
                    toastId: 'copyToClipboard',
                });
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    return (
        <>

            <div
                className='w-full flex justify-center items-center md:h-[700px] h-svh bg-center bg-cover'
                style={{
                    backgroundImage: "url('https://t3.ftcdn.net/jpg/08/54/46/12/360_F_854461280_JUFRnsM7blkQ9Tul0whbCWH73MpaeMyj.jpg')",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className='bg-black/50 backdrop-blur-3xl md:h-[600px] h-full md:w-[950px] w-full  py-10 md:rounded-lg flex flex-col gap-y-10 md:px-20 px-5 '>

                    <h2 className='font-bold text-2xl text-white'>Generate secure Passwords :</h2>

                    <div className='w-30 h-14 bg-gray-600  mb-2 rounded-md p-2 min-h-12 flex items-center justify-between px-5'>
                        <label className='text-white text-lg font-semibold ' style={{ wordSpacing: '0.4em' }} >{password}</label>
                        {password && <p className='flex gap-x-5'>
                            {!saved && <button
                                className='relative group'
                                onClick={() => savePassword(password)}
                            >
                                <span className='absolute -top-10 -left-4 px-3 bg-white/40 text-white rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-md'>
                                    Save
                                </span>
                                <BiSave className='w-8 h-8 text-gray-300' />
                            </button>}


                            <button onClick={() => copyToClipboard(password)} title='Copy To Clipboard' class="flex items-center relative group">
                                <span className='absolute w-fit -top-10 -left-4 px-3 bg-white/40 text-white rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-md'>
                                    Copy
                                </span>
                                <HiClipboardDocumentList className='w-8 h-8 text-gray-300' />

                            </button>
                        </p>}
                    </div>

                    <div className='border-2 border-green-600 flex py-8 md:px-5 '>

                        <div className='md:w-8/12 w-full '>

                            <div className=' md:hidden m-2 flex flex-col items-center justify-center gap-y-3  w-full mb-5'>

                                <span className='font-bold text-lg text-white'>Length :  {length}</span>

                                <span className='w-8/12 flex justify-center items-center h-6/12'>
                                    <label className='font-semibold text-white m-1'>4</label>
                                    <input
                                        type="range"
                                        id="large-range"
                                        value={length}
                                        min={4}
                                        max={12}
                                        onChange={(e) => setLength(e.target.value)}
                                        className="h-3 w-10/12 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-500 ease-in-out"
                                        style={{
                                            WebkitAppearance: 'none',
                                            appearance: 'none',
                                            transition: 'background 0.5s ease-out, transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
                                        }}
                                    />
                                    <label className='font-semibold text-white m-1'>12</label>
                                </span>

                            </div>

                            <div className='w-full h-10  m-2 flex justify-between items-center px-14'>
                                <label className='font-bold text-xl text-white'>Include Lowercase :</label>
                                <label className="switch">
                                    <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className='w-full h-10  m-2 flex justify-between items-center px-14'>
                                <label className='font-bold text-xl text-white'>Include Uppercase :</label>
                                <label className="switch">
                                    <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className='w-full h-10  m-2 flex justify-between items-center px-14'>
                                <label className='font-bold text-xl text-white'>Include Numbers  :</label>
                                <label className="switch">
                                    <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className='w-full h-10  m-2 flex justify-between items-center px-14'>
                                <label className='font-bold text-xl text-white'>Include Symbols  :</label>
                                <label className="switch">
                                    <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>

                        <div className='m-2  flex-col items-center justify-center gap-y-4 w-6/12 hidden md:flex'>

                            <span className='font-bold text-lg text-white'>Length :  {length}</span>

                            <span className='w-8/12 flex justify-center items-center h-6/12'>
                                <label className='font-semibold text-white m-1'>4</label>
                                <input
                                    type="range"
                                    id="large-range"
                                    value={length}
                                    min={4}
                                    max={12}
                                    onChange={(e) => setLength(e.target.value)}
                                    className="h-3 w-10/12 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        WebkitAppearance: 'none',
                                        appearance: 'none',
                                        transition: 'background 0.5s ease-out, transform 0.5s ease-out',
                                    }}
                                />
                                <label className='font-semibold text-white m-1'>12</label>
                            </span>
                        </div>

                    </div>
                    <span className='w-full flex justify-start mb-5'>
                        <button className='bg-white md:w-4/12 w-full p-1 rounded-lg font-bold text-xl' onClick={generatePassword}>Generate</button>
                    </span>
                </div>
            </div>
            <style jsx>{`
    #large-range::-webkit-slider-thumb {
        appearance: none;              
        width: 20px;
        height: 20px;
        background: #4A90E2;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.5s ease-out, background-color 0.5s ease-out;
    }

    #large-range::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: #4A90E2;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.5s ease-out, background-color 0.5s ease-out;
    }

    #large-range:hover::-webkit-slider-thumb {
        transform: scale(1.1);
        background-color: #3b82f6;
    }

    #large-range:hover::-moz-range-thumb {
        transform: scale(1.1);
        background-color: #3b82f6;
    }

    #large-range:active::-webkit-slider-thumb {
        transform: scale(1.2);
        background-color: #2563eb;
    }

    #large-range:active::-moz-range-thumb {
        transform: scale(1.2);
        background-color: #2563eb;
    }
`}</style>

        </>
    );
}

export default Generator