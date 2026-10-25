"use client";
import { useEffect, useState } from "react";
import Filters from "@/components/panel/filters";
import Pagination from "@/components/panel/pagination";
import { useRouter } from "next/navigation";
import { CircleOff } from "lucide-react";
import { CreditCard } from "lucide-react";
import { BadgeInfo } from "lucide-react";
type OrderListRequest = {
  fromDate: string | null;
  toDate: string | null;
  status: string | null;
  productId: string | null;
};
type Order = {
  id: string;
  exchangeId: string;
  count: number;
  approvedCount: number;
  productId: string;
  rate: number;
  downDeposit: number;
  totalAmount: number;
  walletAmount: number;
  status: string;
  description: null;
  settledAmount: number;
  approvedAmount: number;
  pendingAmount: number;
  createdBy: string;
  reviewedBy: string;
  product: {
    id: string;
    name: string;
    symbol: string;
    type: string;
    enName: string;
  };
  exchange: {
    id: string;
    name: string;
    persianName: string;
    code: string;
    cellphone: [9182021310, 9027340211, 9925518330];
    status: string;
    blackList: string;
    blackListDescription: string;
  };
  createdAt: string;
  reviewedAt: string;
  purchaseReceiptBase64: null;
  letterIntroductionBase64: null;
};

export default function OrderList() {
  const [fromDate, setFromDate] = useState<OrderListRequest["fromDate"]>(null);
  const [toDate, setToDate] = useState<OrderListRequest["toDate"]>(null);
  const [status, setStatus] = useState<OrderListRequest["status"]>(null);
  const [productId, setProductId] =
    useState<OrderListRequest["productId"]>(null);
  const [list, setList] = useState<Order[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  const statusModel: Record<string, string> = {
    PENDING_ADMIN_APPROVAL: "در انتظار تایید مدیر",
    WAITING_FOR_DEPOSIT: "در انتظار پرداخت بیعانه",
    PARTIALLY_PAID: "پرداخت بخشی از بیعانه",
    DEPOSIT_PAID: "بیعانه پرداخت شده",
    BALANCE_PARTIALLY_PAID: "بخشی از مانده سفارش پرداخت شده",
    PAYMENT_PENDING_APPROVAL: "پرداخت در انتطار تایید مدیر",
    PENDING_FINANCIAL_APPROVAL: "در انتظار تایید واحد مالی",
    PENDING_DOCUMENT_UPLOAD: "در انتظار بارگزاری مدارک",
    SELLER_OTP_PENDING: "در انتظار کد تایید صرافی",
    MANUAL_OTP_PENDING: "در انتظار کد تایید دستی",
    COMPLETED: "تکمیل و تحویل فیزیکی ارز",
    REJECTED: "رد شده",
    CANCELLED: "لغو شده",
  };

  async function getList() {
    const token = localStorage.getItem("token");

    const httpRequest = fetch(
      "http://37.32.24.124:443/api/v1/customer/orders/list",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fromDate,
          toDate,
          status,
          productId,
          pageNumber,
          pageSize: 10,
        }),
      },
    );
    const response = await httpRequest;
    const bodyResponse = await response.json();

    if (response.ok && bodyResponse.success) {
      const data = bodyResponse.data;

      setList(data.items);
      setTotalPages(data?.totalPages || 0);
    }
    if (response.status === 401) {
      router.push("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("loginInfo");
    }
    if (response.status === 440) {
      const message = bodyResponse?.message;
      // confirm(message);
      if (confirm(message) == true) {
        router.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("loginInfo");
      }
    }
  }

  useEffect(() => {
    getList();
  }, [pageNumber]);

  const handleCancel = (id: string) => {
    const cancel = prompt("علت لغو سفارش را وارد کنید");

    if (cancel !== null && cancel.trim()) {
      setCancel(id, cancel);
    }
  };

  async function setCancel(id: string, cancel: string) {
    const req = fetch("http://37.32.24.124:443/api/v1/customer/orders/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, description: cancel }),
    });
    const res = await req;
    const bodyRes = await res.json();
    if (res.ok && bodyRes.success) {
      getList();
    }
  }
  return (
    <div className="w-full">
      <Filters
        statusModel={statusModel}
        setStatus={setStatus}
        setProductId={setProductId}
        getList={getList}
        setFromDate={setFromDate}
        setToDate={setToDate}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />

      <table className="w-full">
        <thead className="bg-gray-100 shadow shadow-gray-300 rounded-xl *:text-center">
          <tr>
            <th className="px-6 py-4">ردیف</th>
            <th className="px-6 py-4 ">ارز</th>
            <th className="px-6 py-4">نرخ</th>
            <th className="px-6 py-4 ">تعداد درخواستی</th>
            <th className="px-6 py-4 ">مبالغ سفارش</th>
            <th className="px-6 py-4 ">وضعیت پرداخت</th>
            <th className="px-6 py-4 ">مبلغ باقی مانده</th>
            <th className="px-6 py-4 ">وضعیت</th>
            <th className="px-6 py-4">تاریخ ایجاد</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
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
              <tr
                className="border border-white *:border-white  *:border-l *:text-center"
                key={index}
              >
                <td className="px-6 py-4  ">{index + 1}</td>
                <td className="px-6 py-4 ">
                  {item.product.name}({item.product.symbol})
                </td>
                <td className="px-6 py-4 ">{item.rate}</td>
                <td className="border-l border-gray-20">
                  <div className="flex flex-col px-1 py-4">
                    <div className="flex justify-around items-center border-b border-gray-30">
                      <span>درخواستی</span>
                      <span>{item.count}</span>
                    </div>
                    <div className="flex justify-around items-center ">
                      <span>تایید شده</span>
                      <span>{item.approvedCount}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex flex-col px-1 py-4">
                    <div className="flex justify-around items-center border-b border-gray-30">
                      <span>مبلغ کل</span>
                      <span>{item.totalAmount}</span>
                    </div>
                    <div className="flex justify-around items-center">
                      <span>مبلغ بیعانه</span>
                      <span>{(item.downDeposit * item.totalAmount) / 100}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex flex-col px-1 py-4">
                    <div className="flex justify-around border-b border-gray-30">
                      <span>تایید شده</span>
                      <span>{item.approvedAmount}</span>
                    </div>
                    <div className="flex justify-around">
                      <span>در انتظار تایید</span>
                      <span>{item.pendingAmount}</span>
                    </div>
                  </div>
                </td>

                <td>{item.totalAmount - item.approvedAmount}</td>

                <td>{statusModel[item.status]}</td>
                <td>
                  <div>{persianDate}</div>
                  <div>{persianTime}</div>
                </td>
                <td>
                  <div className="flex flex-col items-center gap-2">
                    {item?.status === "CANCELLED" ||
                    item?.status === "REJECTED" ? (
                      <BadgeInfo
                        onClick={() => router.push(`/panel/details/${item.id}`)}
                        size={20}
                        className="cursor-pointer"
                      />
                    ) : (
                      <>
                        {item?.status === "PENDING_ADMIN_APPROVAL" ? (
                          <CircleOff
                            className="cursor-pointer"
                            size={20}
                            onClick={() => handleCancel(item.id)}
                          />
                        ) : (
                          <CreditCard
                            onClick={() =>
                              router.push(`/panel/transaction/${item.id}`)
                            }
                            className="cursor-pointer"
                            size={20}
                          />
                        )}

                        {item?.status && (
                          <BadgeInfo
                            onClick={() =>
                              router.push(`/panel/details/${item.id}`)
                            }
                            className="cursor-pointer"
                            size={20}
                          />
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        setPageNumber={setPageNumber}
        totalPages={totalPages}
        pageNumber={pageNumber}
      />
    </div>
  );
}
