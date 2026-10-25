"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryImgBox from "../primary-imgbox";
import { ArrowDownToLine } from "lucide-react";
import { Undo2 } from "lucide-react";

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
const description: Record<string, string> = {
  REQUESTED_COUNT:
    "تعداد درخواست‌شده بیشتر از میزان قابل تخصیص توسط صرافی است.",
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
  const [img, setImg] = useState("");

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
      setImg(bodyRes?.data?.receiptBase64);
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
    <div className="w-full flex items-center justify-center">
      <div className="">
        <div className="flex justify-between items-center py-1">
          <span className="font-bold">جزئیات سفارش</span>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 cursor-pointer bg-blue-950 text-white rounded px-2 py-1"
          >
            <Undo2 size={16} />
            <span>بازگشت</span>
          </button>
        </div>
        <div className="shadow-md p-8 rounded">
          <div className="flex gap-8 w-150 ">
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
                <span>
                  {transaction?.createdAt &&
                    new Date(transaction?.createdAt).toLocaleString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  {" - "}
                  {transaction?.createdAt &&
                    new Date(transaction?.createdAt).toLocaleDateString(
                      "fa-IR",
                    )}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <span>وضعیت</span>
                <span>
                  {statusModel[transaction?.status ?? ""] ??
                    transaction?.status}
                </span>
              </div>
            </div>

            <div className="flex-1">
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
                <span>
                  {transaction?.reviewedAt &&
                    new Date(transaction?.reviewedAt).toLocaleString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  {" - "}
                  {transaction?.reviewedAt &&
                    new Date(transaction?.reviewedAt).toLocaleDateString(
                      "fa-IR",
                    )}
                </span>
              </div>
            </div>
          </div>
          <div className=" border-b border-gray-300 py-3 w-full">
            <span>توضیحات</span>
            <div>
              {transaction?.status === "REJECTED"
                ? description[transaction?.description ?? ""]
                : transaction?.description || transaction?.status === "APPROVED"
                  ? transaction?.description
                  : "-"}
            </div>
          </div>
          {transaction?.receiptBase64 !== null && (
            <PrimaryImgBox img={img} text="تصویر رسید" icon={ArrowDownToLine} />
          )}
        </div>
      </div>
    </div>
  );
}
