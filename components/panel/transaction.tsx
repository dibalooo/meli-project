"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import { Undo2 } from "lucide-react";
type OrdersType = {
  id: string;
  exchangeId: string;
  count: number;
  approvedCount: null;
  productId: string;
  rate: number;
  downDeposit: null | number;
  totalAmount: null | number;
  walletAmount: number;
  status: string;
  description: null;
  settledAmount: number;
  approvedAmount: number;
  pendingAmount: number;
  createdBy: string;
  createdByFullName: string;
  reviewedBy: null;
  financialApprovedBy: null;
  financialApprover: null;
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
    cellphone: {
      fullName: string;
      cellphone: number;
    }[];
    status: string;
    blackList: string;
    blackListDescription: string;
  };
  createdAt: string;
  purchaseReceiptBase64: null;
  letterIntroductionBase64: null;
};

type TransactionsListType = {
  items: [
    {
      id: string;
      exchangeId: string;
      orderId: string;
      status: string;
      amount: number;
      bankName: string;
      trackingCode: string;
      description: null;
      createdBy: string;
      createdByType: string;
      paymentSource: string;
      isDeposit: string;
      reviewedBy: string;
      createdAt: string;
      reviewedAt: string;
      receiptBase64: string;
    },
  ];
  count: 1;
};
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
  APPROVED: "تایید شده",
};
const paymentSourceModel: Record<string, string> = {
  RECEIPT: "رسید",
  WALLET: "کیف پول",
};
const createdByTypeModel: Record<string, string> = {
  CUSTOMER: "مشتری",
  ADMIN: "راهبر",
};

export default function Transaction({
  id,
  orderId,
}: {
  id: string;
  orderId: string;
}) {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<OrdersType | null>(null);
  const [transactionsList, setTransactionsList] =
    useState<TransactionsListType | null>(null);

  async function getOrders() {
    const req = fetch("http://37.32.24.124:443/api/v1/customer/orders/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id }),
    });
    const res = await req;
    const bodyRes = await res.json();
    console.log("Orders response:", bodyRes);

    if (res.ok && bodyRes.success) {
      setOrderInfo(bodyRes?.data);
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

  async function getList() {
    const req = fetch(
      "http://37.32.24.124:443/api/v1/customer/transactions/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ orderId }),
      },
    );
    const res = await req;
    const bodyRes = await res.json();

    if (res.ok && bodyRes.success) {
      setTransactionsList(bodyRes?.data);
      // setList(bodyRes?.data?.items);
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
    getList();
    getOrders();
  }, [id, orderId]);

  return (
    <div className="w-full">
      <div>
        <div className="flex justify-between py-3">
          <span className="font-bold">تراکنش ها</span>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 cursor-pointer bg-blue-950 text-white rounded px-2 py-1"
          >
            <Undo2 size={16} />
            <span>بازگشت</span>
          </button>
        </div>
        <div className="shadow-md p-8 rounded-lg  flex gap-8 justify-between">
          <div className="flex-1">
            <div className="flex justify-between items-center border-b border-gray-300 py-3">
              <span>ارز</span>
              <span>
                {orderInfo?.product?.name}({orderInfo?.product?.enName})
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-3">
              <span>مبلغ سفارش</span>
              <span>{orderInfo?.totalAmount}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-3">
              <span>وضعیت سفارش</span>
              <span>
                {statusModel[orderInfo?.status ?? ""] ?? orderInfo?.status}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center border-b border-gray-300 py-3">
              <span>نرخ</span>
              <span>{orderInfo?.rate}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-3">
              <span>مبلغ تایید شده</span>
              <span>{orderInfo?.approvedAmount}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center border-b border-gray-300 py-3">
              <span>تعداد درخواستی</span>
              <span>{orderInfo?.count}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-3">
              <span>مبلغ در انتظار تایید </span>
              <span>
                {orderInfo?.pendingAmount != null
                  ? orderInfo?.pendingAmount
                  : "-"}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center border-b border-gray-300 py-3">
              <span>تعداد تایید شده</span>
              <span>
                {orderInfo?.approvedCount != null
                  ? orderInfo?.approvedCount
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-3">
              <span>مبلغ باقی مانده </span>
              <span>
                {orderInfo?.totalAmount != null
                  ? orderInfo.totalAmount - orderInfo?.approvedAmount
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table className="w-full mt-5 shadow shadow-gray-300 rounded-xl *:text-center">
          <thead>
            <tr>
              <th className="px-6 py-4">ردیف</th>
              <th className="px-6 py-4 ">مبلغ</th>
              <th className="px-6 py-4">وضعیت</th>
              <th className="px-6 py-4 ">بیعانه</th>
              <th className="px-6 py-4 ">منبع تراکنش</th>
              <th className="px-6 py-4 ">ایجاد کننده</th>
              <th className="px-6 py-4 ">نام بانک</th>
              <th className="px-6 py-4">کد پیگیری</th>
              <th className="px-6 py-4">تاریخ ایجاد</th>
              <th className="px-6 py-4">تاریخ تایید</th>
            </tr>
          </thead>
          <tbody>
            {transactionsList?.items.map((item, index) => {
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
                <tr className="" key={index}>
                  <td className="px-6 py-4  ">{index + 1}</td>
                  <td className="px-6 py-4 ">{item?.amount}</td>
                  <td className="px-6 py-4 ">
                    {statusModel[item?.status ?? ""] ?? item?.status}
                  </td>
                  <td className="px-6 py-4 ">
                    {item?.isDeposit === "Y" ? <Check /> : <X />}
                  </td>
                  <td className="px-6 py-4 ">
                    {paymentSourceModel[item?.paymentSource ?? ""] ??
                      item?.paymentSource}
                  </td>
                  <td className="px-6 py-4 ">
                    {createdByTypeModel[item?.createdByType ?? ""] ??
                      item?.createdByType}
                  </td>
                  <td className="px-6 py-4 ">{item?.bankName}</td>
                  <td className="px-6 py-4 ">{item?.trackingCode}</td>
                  <td>
                    <div>{persianDate}</div>
                    <div>{persianTime}</div>
                  </td>
                  <td>
                    {item.reviewedAt ? (
                      <>
                        <div>
                          {new Date(item.reviewedAt).toLocaleDateString(
                            "fa-IR",
                          )}
                        </div>

                        <div>
                          {new Date(item.reviewedAt).toLocaleTimeString(
                            "fa-IR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-6 py-4 ">
                    <Info
                      className="cursor-pointer"
                      size={20}
                      onClick={() =>
                        router.push(
                          `/panel/transaction/${item?.orderId}/${item?.id}`,
                        )
                      }
                    />
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
