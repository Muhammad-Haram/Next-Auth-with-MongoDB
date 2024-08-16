"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function VerifyEmailPage() {

    // const router = useRouter()
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {

        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }

    }

    useEffect(() => {

        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

        // const { query } = router;
        // const urlToken = query.token;

    }, [])

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">

                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Verify Email</h2>
                        <p className='text-blue-600 ml-1 whitespace-nowrap font-semibold text-center mt-3'>
                            {token ? `${token}` : "No Token"}
                        </p>

                        {verified && (<button></button>)}

                    </div>
                </div>
            </div>
        </div>
    )
}

