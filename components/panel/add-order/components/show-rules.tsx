"use client";
import { useAddOrderStore } from "@/store/addOrderStore";
import { useEffect, useState } from "react";
import Checkbox from "@/components/primary-checkbox";
import { useRouter } from "next/navigation";

export default function ShowRules() {
  const { count, rate, products, productId, isChecked, setIsChecked } =
    useAddOrderStore((state) => state);
  const [idNo, setIdNo] = useState("");
  const [persianName, setPersianName] = useState("");
  const selectedProduct = products.find((item) => item.value === productId);
  const router = useRouter();

  async function getProfileInfo() {
    const req = fetch("http://37.32.24.124:443/api/v1/customer/profile/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await req;
    const bodyReq = await res.json();

    if (res.ok && bodyReq.success) {
      setIdNo(bodyReq.data.user.idNo);
      setPersianName(bodyReq.data.exchange.persianName);
    }
    if (res.status === 401) {
      router.push("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("loginInfo");
    }
    if (res.status === 440) {
      const message = bodyReq?.message;
      // confirm(message);
      if (confirm(message) == true) {
        router.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("loginInfo");
      }
    }
  }
  useEffect(() => {
    getProfileInfo();
  }, []);

  useEffect(() => {
    return () => setIsChecked(false);
  }, []);

  return (
    <div>
      <div className="pr-5 py-3 w-full">
        <div>بسمه تعالی</div>
        <div>
          <div>مدیریت محترم شرکت صرافی ملی ایران</div>
          <div>موضوع:درخواست خریدارز به صورت اسکناس در سرفصل 26</div>
        </div>
        <div>
          با سلام
          <br />
          <br />
          احتراماً، وفق بخشنامه 76578 مورخ 07/04/1405 بانک مرکزی جمهوری اسلامی
          ایران و نظر به امکان خرید ارز در سرفصل از/به بانک و صرافی دیگر با کد
          عملیاتی 26 برای شرکت های صرافی دارای مجوز معتبر فعالیت، شرکت صرافی{" "}
          <span className="font-bold">{persianName}</span> به شناسه ملی <span className="font-bold">{idNo}</span> درخواست خرید مقدار <span className="font-bold">{count}</span>{" "}
          <span className="font-bold">{selectedProduct?.name}</span> در نرخ <span className="font-bold">{rate}</span> ریال را اعلام می دارد. خواهشمند
          است در صورت امکان و با رعایت ضوابط و مقررات ارزی مربوط، مساعدت لازم در
          خصوص تامین ارز مورد درخواست و انجام معامله را مبذول فرمایید.
          <br />
          <br />
          بدیهی است انجام معامله و تسویه آن منوط به توافق نهایی طرفین و در
          چهارچوب مجموعه مقررات ارزی می باشد.
        </div>
        <Checkbox
          label="تمام قوانین را میپذیرم."
          checked={isChecked}
          onChange={(value) => setIsChecked(value)}
        />
      </div>
    </div>
  );
}
