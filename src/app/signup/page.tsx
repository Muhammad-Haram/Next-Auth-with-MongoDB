"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignupPage() {

  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);


  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Success" + response.data);
      router.push('/login');
    }

    catch (error: any) {
      console.log("SignUp Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {

    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true)
    };

  }, [user]);

  return (
    <>

      <div className="bg-gray-50 font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full">

            <div className="p-8 rounded-2xl bg-white shadow">
              <h2 className="text-gray-800 text-center text-2xl font-bold">{loading ? "Processing..." : "Sign in"}</h2>


              <form className="mt-8 space-y-4">

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Username</label>
                  <div className="relative flex items-center">
                    <input id="username" type="text" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter username" value={user.username}
                      onChange={(e) => setUser({ ...user, username: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email</label>
                  <div className="relative flex items-center">
                    <input id="email" type="email" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter Email" value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input id="password" type="password" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })} />
                  </div>
                </div>

                <div className="text-sm">
                  <Link href="" className="text-blue-600 hover:underline font-semibold">
                    Forgot your password?
                  </Link>
                </div>

                <div className="!mt-8">
                  <button onClick={onSignUp} type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    {buttonDisabled ? "Please fill the form" : "Sign Up"}
                  </button>
                </div>

                <p className="text-gray-800 text-sm !mt-8 text-center">Alraedy have an account <Link href="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Visit login page</Link></p>

              </form>


            </div>

          </div>
        </div>
      </div>

    </>
  )
}