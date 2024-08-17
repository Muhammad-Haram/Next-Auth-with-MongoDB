"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [urlLink, setUrlLink] = useState("");

  const getUserDetail = async () => {
    try {
      const response = await axios.post("/api/users/me");
      console.log(response);
      setData(response.data.data);
      setUrlLink(response.data.data._id);
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const logoutRes = await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="w-full">
          <h2 className="text-gray-800 text-center text-2xl font-bold">
            Profile Page
          </h2>

          <h2 className="text-gray-800 text-center text-2xl font-bold">
            {data === "nothing" ? (
              "No Data For Display"
            ) : (
              <>
                <Link href={`/profile/${urlLink}`}>
                  <div>
                    <p>{data._id}</p>
                  </div>
                </Link>

                <div>{data.username}</div>
                <div>{data.email}</div>
              </>
            )}
          </h2>

          <div className="flex items-center justify-center">
            <button
              onClick={logout}
              className="text-blue-600 ml-1 whitespace-nowrap font-semibold text-center mt-3"
            >
              logout
            </button>
          </div>

          {/* <button onClick={getUserDetail} className='text-blue-600 ml-1 whitespace-nowrap font-semibold text-center mt-3'>
            get
          </button> */}
        </div>
      </div>
    </div>
  );
}
