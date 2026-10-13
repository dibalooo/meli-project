"use client"
import { useAddOrderStore } from "@/store/addOrderStore"
import { useEffect, useState } from "react"

export default function ShowRules() {
    const { count, rate, products, setProducts ,productId} = useAddOrderStore((state) => state)
    const [idNo, setIdNo] = useState("")
    const [persianName, setPersianName] = useState("")
    const selectedProduct = products.find(
    (item) => item.value === productId
);

    async function getProfileInfo() {
        const req = fetch("http://37.32.24.124:443/api/v1/customer/profile/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }

        })
        const res = await req
        if (res.ok) {
            const bodyReq = await res.json()
            if (bodyReq.success) {
                setIdNo(bodyReq.data.user.idNo)
                setPersianName(bodyReq.data.exchange.persianName)

            }
        }

    }
    useEffect(() => {
        getProfileInfo()
    },[])
    return (
        <div>

            <div className="pr-5 py-3 w-full border-bs">
                <div>بسمه تعالی</div>
                <div>
                    <div>مدیریت محترم شرکت صرافی ملی ایران</div>
                    <div>موضوع:درخواست خریدارز به صورت اسکناس در سرفصل 26</div>

                </div>
                <div>

                    با سلام
                    <br />
                    <br />


                    احتراماً، وفق بخشنامه 76578 مورخ 07/04/1405 بانک مرکزی جمهوری اسلامی ایران و نظر به امکان خرید ارز در سرفصل از/به بانک و صرافی دیگر با کد عملیاتی 26 برای شرکت های صرافی دارای مجوز معتبر فعالیت، شرکت صرافی {persianName} به شناسه ملی {idNo} درخواست خرید مقدار {count} {selectedProduct?.name} در نرخ {rate} ریال را اعلام می دارد.

                    خواهشمند است در صورت امکان و با رعایت ضوابط و مقررات ارزی مربوط، مساعدت لازم در خصوص تامین ارز مورد درخواست و انجام معامله را مبذول فرمایید.
                    <br />
                    <br />


                    بدیهی است انجام معامله و تسویه آن منوط به توافق نهایی طرفین و در چهارچوب مجموعه مقررات ارزی می باشد.

                </div>
            </div>


        </div>


    )
}