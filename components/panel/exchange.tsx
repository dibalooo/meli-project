"use client";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import {
  BuildingComplex,
  Building,
  WalletMinimal,
  ToggleRight,
  MapPinHouse,
  Hash,
  Phone,
  CalendarDays,
  MapPinCheckInside,
  UserRoundGroup,
  UserRound,
  UserRoundStar
} from "lucide-react";
import { useRouter } from "next/navigation";
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
export default function Exchange() {
  const [loginInfo, setLoginInfo] = useState<Info | null>(null);
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
    const data = localStorage.getItem("loginInfo");
    if (data) {
      setLoginInfo(JSON.parse(data));
    }
    getProfile();
  }, []);
  return (
    <div className="w-full  ">
      <div className="flex gap-8 pb-5 border-b border-gray-300 ">
        <div className="flex-1 border border-gray-300 rounded-xl flex items-center justify-center flex-col py-5 ">
          <BuildingComplex size={28} />
          <h3>نام شرکت تضامینی</h3>
          <p>{loginInfo?.exchange?.persianName}</p>
        </div>
        <div className="flex-1 border border-gray-300 rounded-xl flex items-center justify-center flex-col py-5">
          <Building size={28} />
          <h3>برند صرافی</h3>
          <p>{loginInfo?.exchange?.name}</p>
        </div>
        <div className="flex-1 border border-gray-300 rounded-xl flex items-center justify-center flex-col py-5">
          <WalletMinimal size={28} />
          <h3>موجودی کیف پول</h3>
          <p>{profileInfo?.user?.walletBalance}</p>
        </div>
        <div className="flex-1 border border-gray-300 rounded-xl flex items-center justify-center flex-col py-5">
          <ToggleRight size={28} />
          <h3>وضعیت صرافی</h3>
          <p>{statusModel[loginInfo?.exchange.status ?? ""]}</p>
        </div>
      </div>
      <div className=" flex items-center justify-center gap-5 mt-5">
        <div className="border border-gray-300 rounded-xl flex-1 p-5">
          <div className="flex gap-3 items-center border-b border-gray-300 py-2">
            <MapPinHouse size={40} />

            <span>سایر اطلاعات</span>
          </div>
          <div className="flex items-center gap-3 py-3">
            <Hash size={26} className="border-l"/>
            <div>
              <div>شماره مجوز فعالیت</div>
              <span>{loginInfo?.exchange?.code}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 py-3">
            <Phone size={26} className="border-l" />
            <div>
              <div>تلفن محل فعالیت</div>
              <span>0{loginInfo?.exchange?.phone}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 py-3">
            <CalendarDays size={26} className="border-l "/>
            <div>
              <div>تاریخ ثبت صرافی</div>
              <span>0{profileInfo?.exchange?.createdAt}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 py-3">
            <MapPinCheckInside size={26} className="border-l"/>

            <div>
              <div>ادرس صرافی</div>
              <span>{loginInfo?.exchange?.address}</span>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-xl flex-1 p-5">
          <div className="flex items-center gap-3 border-b border-gray-300 py-2">
            <UserRoundGroup size={40} />

            <span>اطلاعات مالکین صرافی</span>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <span>
                {loginInfo?.exchange?.cellphone?.map((item, index) => (
                  <div key={index} className=" py-3">
                    {index === 0 && <UserRoundStar  size={26} className="border-b py-1"/>}
                    {index === 1 && <UserRound  size={26} className="border-b py-1" />}
                    {index === 2 && <UserRound  size={26} className="border-b py-1" />}

                    {}
                    <div>
                      <label>
                        {index === 0
                          ? "مالک اصلی"
                          : index === 1
                            ? "مالک دوم"
                            : index === 2
                              ? "مالک سوم"
                              : `مالک ${index + 1}`}
                      </label>
                    </div>
                    <div>{item?.fullName}</div>
                    <div>0{item?.cellphone}</div>
                  </div>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
