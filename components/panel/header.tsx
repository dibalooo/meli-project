"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Header() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  async function logout() {
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
  }
  return (
    <div>
      <div className="flex gap-5 ">
        <div className="bg-gray-400 flex items-center w-[316px] rounded-2xl p-2 justify-evenly text-white text-2xl font-bold shadow shadow-gray-500">
          <img src="/primary-logo.png" alt="" className="w-[80px] h-[80px]" />
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
          <button
            className="text-[#211e72] mb-10 w-15 self-end ml-10"
            onClick={() => setShow(true)}
          >
            <div className="flex items-center bg-white p-1 rounded-lg">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 21 21"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="#211e72"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(4 3)"
                  >
                    <path d="m10.595 10.5 2.905-3-2.905-3" />

                    <path d="m13.5 7.5h-9" />

                    <path d="m10.5.5-8 .00224609c-1.1043501.00087167-1.9994384.89621131-2 2.00056153v9.99438478c0 1.1045695.8954305 2 2 2h8.0954792" />
                  </g>
                </svg>
              </span>
              <span>خروج</span>
            </div>
          </button>
        </div>
      </div>
      {show && (
        <div className="text-center flex items-center justify-center fixed inset-0 bg-black/50">
          <div className="bg-white rounded w-85 h-45">
            <div>خروج از حساب کاربری</div>
            <span>ایا اطمینان دارید؟</span>
            <div className="flex gap-3 justify-center mt-20">
              <span onClick={logout}>خروج</span>
              <span onClick={() => setShow(false)}>انصراف</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
