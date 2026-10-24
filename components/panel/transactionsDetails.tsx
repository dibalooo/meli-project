"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type transactionsGetType = {
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
};
const paymentSourceModel: Record<string, string> = {
  RECEIPT: "رسید",
  WALLET: "کیف پول",
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
const createdByTypeModel: Record<string, string> = {
  CUSTOMER: "مشتری",
  ADMIN: "راهبر",
};
export default function TransactionsDetails({
  transactionId,
}: {
  transactionId: string;
}) {
  const [transaction, setTransaction] = useState<transactionsGetType | null>(
    null,
  );
  const router = useRouter();

  async function transactionsGet() {
    const req = fetch(
      "http://37.32.24.124:443/api/v1/customer/transactions/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: transactionId }),
      },
    );
    const res = await req;
    const bodyRes = await res.json();
    if (res.ok && bodyRes.success) {
      setTransaction(bodyRes?.data);
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
    transactionsGet();
  }, [transactionId]);

  return (
    <div className="w-150">
      <span>جزئیات تراکنش</span>
      <div className="shadow-md p-8 rounded-lg  flex gap-8 ">
        <div>
          <div className="flex gap-8 ">
            <div className="flex-1">
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <span>مبلغ</span>
                <span>{transaction?.amount}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <span>منبع تراکنش</span>
                <span>
                  {paymentSourceModel[transaction?.paymentSource ?? ""] ??
                    transaction?.paymentSource}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <span>نام بانک</span>
                <span>{transaction?.bankName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <span>تاریخ ایجاد</span>
                <span></span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <span>وضعیت</span>
                <span>
                  {statusModel[transaction?.status ?? ""] ??
                    transaction?.status}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <span>ایجاد کننده</span>
                <span>
                  {createdByTypeModel[transaction?.createdByType ?? ""] ??
                    transaction?.createdByType}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <span>کد پیگیری</span>
                <span>{transaction?.trackingCode}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <span>تاریخ تایید</span>
                <span></span>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
