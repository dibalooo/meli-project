"use client";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FileImage } from "lucide-react";
import { CloudUpload } from "lucide-react";
import { Send } from "lucide-react";
import { Trash } from "lucide-react";
import { text } from "stream/consumers";
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
export default function UploadDucument({ id }: { id: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const [purchaseReceiptBase64, setPurchaseReceiptBase64] = useState("");
  const [letterIntroductionBase64, setLetterIntroductionBase64] = useState("");

  const [fromDate, setFromDate] = useState<OrderListRequest["fromDate"]>(null);
  const [toDate, setToDate] = useState<OrderListRequest["toDate"]>(null);
  const [status, setStatus] = useState<OrderListRequest["status"]>(null);
  const [productId, setProductId] =
    useState<OrderListRequest["productId"]>(null);
  const [list, setList] = useState<Order[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const maxSize = 3 * 1024 * 1024;

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleClick2 = () => {
    fileInputRef2.current?.click();
  };
  const router = useRouter();
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [recommendationImage, setRecommendationImage] = useState<File | null>(
    null,
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPurchaseReceiptBase64(reader.result);
      }
    };

    if (file) {
      setReceiptImage(file);
    }
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLetterIntroductionBase64(reader.result);
      }
    };
    if (file) {
      setRecommendationImage(file);
    }
  };
  const handleRemove = () => {
    setReceiptImage(null);
    setPurchaseReceiptBase64("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleRemove2 = () => {
    setRecommendationImage(null);
    setLetterIntroductionBase64("");
    if (fileInputRef2.current) {
      fileInputRef2.current.value = "";
    }
  };
  async function uploadCompletionDocuments() {
    const req = fetch(
      "http://37.32.24.124:443/api/v1/customer/orders/upload-completion-documents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id,
          purchaseReceiptBase64,
          letterIntroductionBase64,
        }),
      },
    );
    const res = await req;
    const bodyRes = await res.json();
    if (res.ok && bodyRes.success) {
      router.push("/panel/orders");
    }
  }
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
  return (
    <div className="w-full flex items-center justify-center">
      <div className=" ">
        <div className="flex gap-6 mb-3">
          <div className="flex-1 ">
            <div className=" rounded-2xl border border-gray-200 bg-white p-4 w-100">
              <div className="mb-4 flex items-center gap-3">
                <FileImage size={32} className="text-[#211e72]" />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    آپلود رسید پرداخت
                  </h3>

                  <p className="text-sm text-gray-500">فایل PNG، JPG یا PDF</p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                hidden
                onChange={handleChange}
              />

              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed text-[#211e72] bg-indigo-50/30 p-6 text-center">
                <CloudUpload size={40} className="text-[#211e72]" />

                <div>
                  <p className="font-medium text-gray-700">
                    فایل خود را انتخاب کنید
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClick}
                  className="rounded-lg bg-[#211e72] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4541ac]"
                >
                  انتخاب فایل
                </button>
              </div>
              {receiptImage && (
                <div className="flex justify-between gap-3 py-2 items-center">
                  <p className={receiptImage.size > maxSize ? "text-red-800 " : ""}>
                    {receiptImage.size > maxSize
                      ? " حجم فایل بیشتر از 3 مگابایت نباید باشد." 
                      : ` حجم فایل: ${(receiptImage.size / (1024 * 1024)).toFixed(2)}
                    MB`}
                  </p>
                  <div className="flex justify-end gap-3 py-2 items-center">
                    <p>{receiptImage.name}</p>
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="bg-[#211e72] text-white rounded p-1"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 w-100">
              <div className="mb-4 flex items-center gap-3">
                <FileImage size={32} className="text-[#211e72]" />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    آپلود معرفی نامه
                  </h3>

                  <p className="text-sm text-gray-500">فایل PNG، JPG یا PDF</p>
                </div>
              </div>

              <input
                ref={fileInputRef2}
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                hidden
                onChange={handleChange2}
              />

              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed text-[#211e72] bg-indigo-50/30 p-6 text-center">
                <CloudUpload size={40} className="text-[#211e72]" />

                <div>
                  <p className="font-medium text-gray-700">
                    فایل خود را انتخاب کنید
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClick2}
                  className="rounded-lg bg-[#211e72] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4541ac]"
                >
                  انتخاب فایل
                </button>
              </div>
              {recommendationImage && (
                <div className="flex justify-between gap-3 py-2 items-center">
                  <p className={recommendationImage.size > maxSize ? "text-red-700":""}>
                    {recommendationImage.size > maxSize
                      ? "حجم فایل بیشتر از 3 مگابایت نباید باشد."
                      : `حجم فایل : ${(recommendationImage.size / (1024 * 1024)).toFixed(2)}
                    MB`}
                  </p>
                  <div className="flex justify-end gap-3 py-2 items-center">
                    <p>{recommendationImage.name}</p>
                    <button
                      type="button"
                      onClick={handleRemove2}
                      className="bg-[#211e72] text-white rounded p-1"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start gap-2">
          <button
            disabled={!purchaseReceiptBase64 || !letterIntroductionBase64}
            onClick={uploadCompletionDocuments}
            type="button"
            className=" disabled:opacity-50 flex items-center gap-1 cursor-pointer bg-blue-950 text-white rounded px-2 py-1"
          >
            <Send size={16} />
            <span>ارسال</span>
          </button>
          <button
            onClick={() => router.back()}
            className="  flex items-center gap-1 cursor-pointer bg-blue-950 text-white rounded px-2 py-1"
          >
            <Undo2 size={16} />
            <span>بازگشت</span>
          </button>
        </div>
      </div>
    </div>
  );
}
