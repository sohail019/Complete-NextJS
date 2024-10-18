'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetail = async () => {
    try {
      const res = await axios.get("/api/users/profile/");
      console.log(res.data.data);
      setData(res.data.data._id);
    } catch (error:any) {
        console.error("Error:", error.message);
        toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error(error.message);
    }
  };
  return (
    <div>
        <h1>Profile Page</h1>
        <hr />
        <h2>
            {
                data === "nothing" ? "No Data to Display" : <Link href={`/profile/${data}`}>{data}</Link>
            }
        </h2>
        <hr />
        <button onClick={getUserDetail}>Get User Details</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
