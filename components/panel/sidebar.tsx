"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Store,
  ChevronLeft,
  Package,
  PackageOpen,
  UserRoundCheck,
} from "lucide-react";
type ProfileType = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    cellphone: number;
    status: string;
    idNo: string;
    walletBalance: number;
    createdBy: string;
    createdAt: string;
  };
  exchange: {
    id: string;
    name: string;
    code: string;
    status: string;
    persianName: string;
    cellphone: [
      {
        fullName: string;
        cellphone: number;
      },
      {
        fullName: string;
        cellphone: number;
      },
      {
        fullName: string;
        cellphone: number;
      },
    ];
    phone: number;
    address: string;
    createdBy: string;
    createdAt: string;
  };
};
type Info = {
  otpRequired: false;
  token: string;
  expiresInMinutes: number;
  userId: string;
  exchangeId: string;
  username: string;
  firstName: string;
  lastName: string;
  exchange: {
    id: string;
    name: string;
    persianName: string;
    code: string;
    cellphone: [
      {
        fullName: string;
        cellphone: number;
      },
      {
        fullName: string;
        cellphone: number;
      },
      {
        fullName: string;
        cellphone: number;
      },
    ];
    phone: number;
    address: string;
    status: string;
  };
};
export default function Sidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loginInfo, setLoginInfo] = useState<Info | null>(null);

  async function getProfile() {
    const req = fetch("http://37.32.24.124:443/api/v1/customer/profile/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await req;
    const bodyRes = await res.json();
    if (res.ok && bodyRes.success) {
      setProfile(bodyRes?.data);
    }

    if (res.status === 401) {
      router.push("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("loginInfo");
    }
    if (res.status === 440) {
      const message = bodyRes?.message;
      // confirm(message);
      if (confirm(message) == true) {
        router.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("loginInfo");
      }
    }
  }
  useEffect(() => {
    const data = localStorage.getItem("loginInfo");
    if (data) {
      setLoginInfo(JSON.parse(data));
    }

    getProfile();
  }, []);

  return (
    <div className="flex flex-col justify-between bg-[#211e72] h-[calc(100vh-250px)] w-80 rounded-2xl overflow-hidden">
      <div className=" my-10 ">
        <div className="flex justify-around items-center border-b border-white pb-5">
          <button
            className="flex items-center gap-5 cursor-pointer "
            onClick={() => router.push("/panel/exchange")}
          >
            <Store size={26} color="white" />
            <span className="text-white">
              {loginInfo?.exchange?.persianName}
            </span>
          </button>
          <ChevronLeft size={20} color="white" />
        </div>
        <Link
          className={`flex items-center gap-3 w-50 h-10 m-10 border border-white rounded-md pr-3 ${
            pathName === "/panel/orders" || pathName === "/panel"
              ? "bg-white"
              : ""
          }`}
          href="/panel/orders"
        >
          <span>
            {(pathName === "/panel/orders" || pathName === "/panel") && (
              <PackageOpen size={22} color="#211e72" />
            )}
            {pathName !== "/panel/orders" && pathName !== "/panel" && (
              <Package size={22} color="white" />
            )}
          </span>

          <span
            className={
              pathName === "/panel/orders" || pathName === "/panel"
                ? "text-blue-950"
                : "text-white"
            }
          >
            سفارشات
          </span>
        </Link>
        <Link
          className={`flex items-center gap-5 w-50 h-10 m-10 border border-white rounded-md pr-2 ${pathName === "/panel/add-order" ? "bg-while" : "bg-[#211e72]"}`}
          href="/panel/add-order"
        >
          <span className="text-white">سفارش جدید</span>
        </Link>
      </div>
      <button
        onClick={() => router.push("/panel/profile")}
        className="border-t border-white flex text-white justify-start items-center gap-5 p-3 cursor-pointer"
      >
        <UserRoundCheck size={28} color="white" />
        <div>
          <span>
            {profile?.user?.firstName} {profile?.user?.lastName}
          </span>
          <div>کاربر سامانه</div>
        </div>
      </button>
    </div>
  );
}
