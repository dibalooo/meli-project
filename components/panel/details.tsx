"use client"
import { useEffect, useState } from "react";

export default function Details({ id }: { id: string }) {
    const [profile, setProfile] = useState({});
    const [orders, setOrders] = useState({})

    async function getProfile() {
        const req = fetch("http://37.32.24.124:443/api/v1/customer/profile/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
        const res = await req;
        if (res.ok) {
            const bodyRes = await res.json();
            if (bodyRes.success) {
                setProfile(bodyRes.data)


            }
        }
    }


    async function getOrders() {
        const req = fetch("http://37.32.24.124:443/api/v1/customer/orders/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ id })


        })
        const res = await req;

        if (res.ok) {
            const bodyRes = await res.json()
            if (bodyRes.success) {
                setOrders(bodyRes.data)


            }
        }
    }

    useEffect(() => {
        getOrders()
        getProfile()
    }, [])
    return (
        <div className="flex justify-center items-center flex-col w-200 ">
            <div>جزئیات سفارش</div>
            <div >
                <div className=" flex  flex-col  shadow-md  p-8 rounded-2xl w-150 h-150">

                    <div className=" ">
                        <div className="flex justify-between items-center">
                            <div>ارز</div>
                            <div>{orders.product?.name}({orders.product?.enName})</div>
                        </div>
                        <div className="flex justify-between">
                            <div>نرخ</div>
                            <div> {orders.rate}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>تعداد درخواستی </div>
                            <div>{orders.count}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>درصد بیعانه </div>
                            <div>{orders.downDeposit}%</div>
                        </div>
                        <div className="flex justify-between">
                            <div>تعداد تایید شده </div>
                            <div>{orders.approvedCount}</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>مبلغ کل</div>
                            <div>{orders.totalAmount
                            }</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>مبلغ بیعانه</div>
                            <div>{(orders.totalAmount * orders.downDeposit) / 100}</div>
                        </div>



                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <div>مبلغ باقی مانده</div>
                            <div>{(orders.totalAmount) - (orders.approvedAmount)}</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>مبلغ تایید شده </div>
                            <div>{orders.approvedAmount}</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>مبلغ در انتظار تایید </div>
                            <div>{orders.pendingAmount
                            }</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>وضعیت</div>
                            <div> {orders.status}</div>

                        </div>
                        <div className="flex justify-between items-center">
                            <div>ایجاد کننده </div>
                            <div>
                                {orders.createdByFullName
                                }
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>تاریخ و زمان ایجاد </div>
                            <div>{orders.createdAt}</div>

                        </div>


                    </div>

                    <div>شیوه نامه</div>
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


                            احتراماً، وفق بخشنامه 76578 مورخ 07/04/1405 بانک مرکزی جمهوری اسلامی ایران و نظر به امکان خرید ارز در سرفصل از/به بانک و صرافی دیگر با کد عملیاتی 26 برای شرکت های صرافی دارای مجوز معتبر فعالیت، شرکت  {orders.exchange?.persianName} به شناسه ملی {profile.user?.idNo} درخواست خرید مقدار {orders.count} {orders.product?.name} در نرخ {orders.rate} ریال را اعلام می دارد.

                            خواهشمند است در صورت امکان و با رعایت ضوابط و مقررات ارزی مربوط، مساعدت لازم در خصوص تامین ارز مورد درخواست و انجام معامله را مبذول فرمایید.
                            <br />
                            <br />


                            بدیهی است انجام معامله و تسویه آن منوط به توافق نهایی طرفین و در چهارچوب مجموعه مقررات ارزی می باشد.

                        </div>

                    </div>
                </div>
            </div>



        </div>
    )
}