"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DoorOpen, LogOut } from "lucide-react";
import PrimaryBtn from "../primary-btn";

export default function Header() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function logout() {
    setIsLoading(true);
    const req = fetch("http://37.32.24.124:443/api/v1/customer/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await req;

    if (res.ok) {
      localStorage.removeItem("loginInfo");
      localStorage.removeItem("token");
      router.push("/login");
    }
    setIsLoading(false);
  }
  return (
    <div>
      <div className="flex gap-5 ">
        <div className="bg-gray-400 flex items-center w-79 rounded-2xl p-2 justify-evenly text-white text-2xl font-bold shadow shadow-gray-500">
          <img src="/primary-logo.png" alt="" className="w-20 h-20" />
          <div>صرافی ملی</div>
        </div>
        <div className="bg-gray-100 w-full flex items-center justify-between h-30 rounded-2xl px-5 shadow shadow-gray-500">
          <div>
            <span className="text-2xl font-bold">سفارشات</span>
            <div>
              میتوانید تمامی سفارش های خود را اینجا ببینید و سفارش جدید ثبت
              کنید.
            </div>
          </div>
          <div className="text-[#211e72] mb-10 w-15 self-end ml-10">
            <PrimaryBtn icon={LogOut} label="خروج"  onClick={() => setShow(true)} classname={`flex items-center py-1 px-2 rounded gap-2 opacity-100 cursor-pointer bg-blue-950 text-white`}/>
          </div>
        </div>
      </div>
      {show && (
        <div className="text-center flex items-center justify-center fixed inset-0 bg-black/50">
          <div className="bg-white rounded-xl w-100 h-80 flex items-center justify-center flex-col">
            <div className="border border-blue-950 rounded-2xl p-30 ">
              <div className="font-bold p-2">خروج از حساب کاربری</div>
              <span>ایا اطمینان دارید؟</span>
              <div className="flex gap-3 justify-center ">
                <PrimaryBtn disabled={isLoading} icon={DoorOpen} label="خروج" onClick={logout} classname={` flex items-center  rounded  gap-2 px-2 py-1 ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed bg-gray-400 text-black"
                      : "opacity-100 cursor-pointer bg-blue-950 text-white"
                  }`}/>
                
                <PrimaryBtn disabled={isLoading} onClick={() => setShow(false)} label="انصراف" classname={`rounded gap-2 px-2 py-1 ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer bg-gray-300 text-gray-500"
                  }`}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
