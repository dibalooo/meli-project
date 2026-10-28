"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FingerprintPattern,
  KeyRound,
  CircleUserRound,
  UserRoundStar,
  WalletMinimal,
  ToggleRight,
  Info,
  Smartphone,
  CalendarDays,
} from "lucide-react";
import { Calendar } from "react-multi-date-picker";
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
const statusModel: Record<string, string> = {
  ACTIVE: "فعال",
  DEACTIVE: "غیر فغال",
};
export default function Profile() {
  const [profileInfo, setProfileInfo] = useState<ProfileType | null>(null);
  const router = useRouter();
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
      setProfileInfo(bodyRes?.data);
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
    getProfile();
  }, []);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-gray-300 pb-5">
        <div>
          <h3>اطلاعات پروفایل من</h3>
          <span>اطلاعات شخصی و وضعیت حساب کاربری</span>
        </div>
        <button className="flex items-center justify-between gap-2 bg-blue-950 text-white rounded p-2 cursor-pointer">
          <KeyRound size={16} />
          <span>تغییر رمز عبور</span>
        </button>
      </div>
      <div className="flex gap-3 pt-5">
        <div className="flex items-center justify-center flex-1 border border-gray-300 rounded-xl flex-col py-5">
          <CircleUserRound size={28} />
          <div>نام و نام خانوادگی</div>
          <span>
            {profileInfo?.user?.firstName} {profileInfo?.user?.lastName}
          </span>
        </div>
        <div className="flex items-center justify-center flex-1 border border-gray-300 rounded-xl flex-col py-5">
          <UserRoundStar size={28} />
          <div>نام کاربری</div>
          <span>{profileInfo?.user?.username}</span>
        </div>
        <div className="flex items-center justify-center flex-1 border border-gray-300 rounded-xl flex-col py-5 ">
          <WalletMinimal size={28} />
          <div>موجودی کیف پول</div>
          <span>{profileInfo?.user?.walletBalance}</span>
        </div>
        <div className="flex items-center justify-center flex-1 border border-gray-300 rounded-xl flex-col py-5">
          <ToggleRight size={28} />
          <div>وضعیت کاربر</div>
          <span>{statusModel[profileInfo?.exchange.status ?? ""]}</span>
        </div>
      </div>
      <div className="w-full border-gray-300  border rounded-xl p-6 mt-5">
        <div className="border-b border-gray-300 py-3">
          <div className="flex items-center gap-3">
            <Info size={35} />
            <span>سایر اطلاعات</span>
          </div>
        </div>
        <div className="flex items-center py-3">
          <div className="flex-1 flex items-center  ">
            <FingerprintPattern size={26} className="border-l " />
            <div className="pr-3">
              <div>کد ملی</div>
              <span>{profileInfo?.user?.idNo}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center  ">
            <Smartphone size={26} className="border-l " />
            <div className="pr-3">
              <div>تلفن همراه</div>
              <span>0{profileInfo?.user?.cellphone}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center  ">
            <CalendarDays size={26} className="border-l " />
            <div className="pr-3">
              <div>تاریخ عضویت</div>
              <span>{profileInfo?.user?.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
