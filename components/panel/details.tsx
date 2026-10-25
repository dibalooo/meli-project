"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Undo2 } from "lucide-react";
type ProfileType = {
  user: {
    id: string;
    firstNam: string;
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
    status: string;
    blackList: string;
    blackListDescription: string;
  };
  createdAt: string;
  purchaseReceiptBase64: null;
  letterIntroductionBase64: null;
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
};

const rejectReason: Record<string, string> = {
  REQUESTED_COUNT:
    "تعداد درخواست‌شده بیشتر از میزان قابل تخصیص توسط صرافی است.",
  REQUESTED_RATE: "نرخ درخواست‌شده کمتر از نرخ اعلام‌شده توسط صرافی است.",
  REQUESTED_CURRENCY:
    "نوع ارز درخواست‌شده با ارز ارائه‌شده توسط صرافی مغایرت دارد.",
};

export default function Details({ id }: { id: string }) {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [orders, setOrders] = useState<OrdersType | null>(null);
  const router = useRouter();
  const handlePrint = () => {
    window.print();
  };
  const [firstImage, setFirstImage] = useState("");
  const [seconedImage, setSecondImage] = useState("");
  const [description, setDescription] = useState("");
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
      if (confirm(message) == true) {
        router.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("loginInfo");
      }
    }
  }

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

    if (res.ok && bodyRes.success) {
      setOrders(bodyRes?.data);
      setFirstImage(bodyRes?.data?.purchaseReceiptBase64);
      setSecondImage(bodyRes?.data?.letterIntroductionBase64);
      setDescription(bodyRes?.data?.description);
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
    getOrders();
    getProfile();
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div>
        <div className="flex justify-between">
          <span className="font-bold">جزئیات</span>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 cursor-pointer bg-blue-950 text-white rounded px-2 py-1"
          >
            <Undo2 size={16} />
            <span>بازگشت</span>
          </button>
        </div>
        <div className="shadow-md p-8 rounded w-180 h-170 overflow-y-scroll">
          <div className="flex justify-between gap-5">
            <div className="flex-1">
              <div className="flex justify-between items-center border-b border-gray-300 py-2 ">
                <div>ارز</div>
                <div>
                  {orders?.product?.name}({orders?.product?.enName})
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-300 py-2 ">
                <div>نرخ</div>
                <div> {orders?.rate}</div>
              </div>
              <div className="flex justify-between border-b border-gray-300 py-2">
                <div>تعداد درخواستی </div>
                <div>{orders?.count}</div>
              </div>
              <div className="flex justify-between border-b border-gray-300 py-2">
                <div>درصد بیعانه </div>
                <div>{orders?.downDeposit ? `${orders?.downDeposit}%` : 0}</div>
              </div>
              <div className="flex justify-between border-b border-gray-300 py-2">
                <div>تعداد تایید شده </div>
                <div>
                  {orders?.approvedCount != null ? orders?.approvedCount : "-"}
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>مبلغ کل</div>
                <div>
                  {orders?.totalAmount != null ? orders?.totalAmount : "-"}
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>مبلغ بیعانه</div>
                <div>
                  {orders?.totalAmount != null && orders.downDeposit != null
                    ? (orders.totalAmount * orders.downDeposit) / 100
                    : "-"}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>مبلغ باقی مانده</div>
                <div>
                  {orders?.totalAmount != null
                    ? orders.totalAmount - orders?.approvedAmount
                    : "-"}
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>مبلغ تایید شده </div>
                <div>
                  {orders?.approvedAmount != null
                    ? orders?.approvedAmount
                    : "-"}
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>مبلغ در انتظار تایید </div>
                <div>
                  {orders?.pendingAmount != null ? orders?.pendingAmount : "-"}
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>وضعیت</div>
                <div>
                  {" "}
                  {statusModel[orders?.status ?? ""] ?? orders?.status}
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>ایجاد کننده </div>
                <div>{orders?.createdByFullName}</div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>تاریخ ایجاد</div>
                <div>
                  {orders?.createdAt &&
                    new Date(orders.createdAt).toLocaleString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  {" - "}
                  {orders?.createdAt &&
                    new Date(orders.createdAt).toLocaleDateString("fa-IR")}
                </div>
              </div>
            </div>
          </div>
          <div className=" border-b border-gray-300 py-5  w-full">
            <div>توضیحات</div>
            <div>
              {orders?.status === "REJECTED"
                ? description
                    .split("|")
                    .map((item) => <div key={item}>{rejectReason[item]}</div>)
                : orders?.status === "CANCELLED"
                  ? orders?.description 
                  : "-"}
            </div>
          </div>
          <br />
          <div>
            {(orders?.status === "MANUAL_OTP_PENDING" ||
              orders?.status === "COMPLETED") && (
              <div className="flex justify-between gap-5">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>تصویر رسید</div>

                    <a
                      href={firstImage}
                      download="receipt.jpg"
                      className="bg-gray-300 rounded px-2 cursor-pointer  "
                    >
                      دانلود
                    </a>
                  </div>

                  <div className="shadow-md rounded-2xl h-60 p-10">
                    <img
                      className="h-full w-full object-contain"
                      src={firstImage}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>تصویر معرفی نامه</div>

                    <a
                      href={seconedImage}
                      download="receipt.jpg"
                      className="bg-gray-300 rounded px-2 cursor-pointer"
                    >
                      دانلود
                    </a>
                  </div>

                  <div className="shadow-md rounded-2xl h-60 p-10">
                    <img
                      className="h-full w-full object-contain"
                      src={seconedImage}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-8">
            <div className="border-b border-gray-300 pb-4 flex justify-between">
              <div>شیوه نامه</div>
              <button
                className="print:hidden  bg-gray-300 rounded px-2 cursor-pointer"
                onClick={handlePrint}
              >
                چاپ
              </button>
            </div>

            <div id="print-area" className="pt-5">
              <div>بسمه تعالی</div>
              <br />
              <div>
                <div>مدیریت محترم شرکت صرافی ملی ایران</div>
                <div>موضوع:درخواست خریدارز به صورت اسکناس در سرفصل 26</div>
              </div>
              <br />
              <div>
                با سلام
                <br />
                <br />
                احتراماً، وفق بخشنامه 76578 مورخ 07/04/1405 بانک مرکزی جمهوری
                اسلامی ایران و نظر به امکان خرید ارز در سرفصل از/به بانک و صرافی
                دیگر با کد عملیاتی 26 برای شرکت های صرافی دارای مجوز معتبر
                فعالیت، شرکت{" "}
                <span className="font-bold">
                  {orders?.exchange?.persianName}
                </span>{" "}
                به شناسه ملی{" "}
                <span className="font-bold">{profile?.user?.idNo} </span>درخواست
                خرید مقدار <span className="font-bold">{orders?.count}</span>{" "}
                <span className="font-bold">{orders?.product?.name}</span> در
                نرخ <span className="font-bold">{orders?.rate}</span> ریال را
                اعلام می دارد. خواهشمند است در صورت امکان و با رعایت ضوابط و
                مقررات ارزی مربوط، مساعدت لازم در خصوص تامین ارز مورد درخواست و
                انجام معامله را مبذول فرمایید.
                <br />
                <br />
                بدیهی است انجام معامله و تسویه آن منوط به توافق نهایی طرفین و در
                چهارچوب مجموعه مقررات ارزی می باشد.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
