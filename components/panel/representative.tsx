"use client";
import { UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type ListType = {
  items: [
    {
      userId: string;
      exchangeId: string;
      firstName: string;
      lastName: string;
      username: string;
      cellphone: number;
      status: string;
      createdAt: string;
    },
    {
      userId: string;
      exchangeId: string;
      firstName: string;
      lastName: string;
      username: string;
      cellphone: number;
      status: string;
      createdAt: string;
    },
    {
      userId: string;
      exchangeId: string;
      firstName: string;
      lastName: string;
      username: string;
      cellphone: number;
      status: string;
      createdAt: string;
    },
    {
      userId: string;
      exchangeId: string;
      firstName: string;
      lastName: string;
      username: string;
      cellphone: number;
      status: string;
      createdAt: string;
    },
  ];
  count: 4;
};
const userStatus: Record<string, string> = {
  ACTIVE: "فعال",
};

export default function ExchangeRepresentative() {
  const [list, setList] = useState<ListType | null>(null);
  const router = useRouter();
  async function listOfRepresentatives() {
    const req = fetch(
      "http://37.32.24.124:443/api/v1/customer/exchange-users/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    const res = await req;
    const bodyRes = await res.json();
    console.log(bodyRes?.data);
    if (res.ok && bodyRes.success) {
      setList(bodyRes?.data);
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
    listOfRepresentatives();
  }, []);
  return (
    <div className="w-full flex justify-center">
      <div className="w-full">
        <div className="flex items-center justify-between mb-10 w-full">
          <div>
            <div>نمایندگان صرافی</div>
            <div>نمایندگان ثبت شده در صرافی را مشاهده میکنید</div>
          </div>
          <button onClick={()=>router.push("/panel/add-representative")} className="flex items-center gap-1 cursor-pointer bg-blue-950 text-white rounded px-2 py-1">
            <UserRoundPlus size={16} />
            <div>افزودن نماینده</div>
          </button>
        </div>
        <table className="w-full mt-5 shadow shadow-gray-300 rounded-xl overflow-hidden *:text-center">
          <thead>
            <tr className="bg-gray-100  ">
              <th className="px-6 py-4">ردیف</th>
              <th className="px-6 py-4 ">نام</th>
              <th className="px-6 py-4">نام خانوادگی</th>
              <th className="px-6 py-4 ">نام کاربری</th>
              <th className="px-6 py-4 ">شماره همراه</th>
              <th className="px-6 py-4 ">وضعیت</th>
              <th className="px-6 py-4">تاریخ ایجاد</th>
            </tr>
          </thead>
          <tbody>
            {list?.items.map((item, index) => {
              const persianDate = new Date(item.createdAt).toLocaleDateString(
                "fa-IR",
              );
              const persianTime = new Date(item.createdAt).toLocaleTimeString(
                "fa-IR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              );

              return (
                <tr key={index}>
                  <td className="px-6 py-4 ">{index + 1}</td>
                  <td className="px-6 py-4 ">{item?.firstName}</td>
                  <td className="px-6 py-4 ">{item?.lastName}</td>
                  <td className="px-6 py-4 ">{item?.username}</td>
                  <td className="px-6 py-4 ">0{item?.cellphone}</td>
                  <td className="px-6 py-4 ">
                    {userStatus[item?.status ?? ""] ?? item?.status}
                  </td>
                  <td>
                    <div>{persianDate}</div>
                    <div>{persianTime}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
