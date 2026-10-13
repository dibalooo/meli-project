"use client"
import { use, useEffect, useState } from "react"
import Filters from "@/components/panel/filters"
import Pagination from "@/components/panel/pagination"
import addOrder from "./add-order/addOrder"
type OrderListRequest = {
    fromDate: string | null;
    toDate: string | null;
    status: string | null;
    productId: string | null;

}
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
    },
    exchange: {
        id: string;
        name: string;
        persianName: string;
        code: string;
        cellphone: [
            9182021310,
            9027340211,
            9925518330
        ],
        status: string;
        blackList: string;
        blackListDescription: string;
    },
    createdAt: string,
    reviewedAt: string,
    purchaseReceiptBase64: null,
    letterIntroductionBase64: null
}




export default function OrderList() {
    const [fromDate, setFromDate] = useState<OrderListRequest["fromDate"]>(null)
    const [toDate, setToDate] = useState<OrderListRequest["toDate"]>(null)
    const [status, setStatus] = useState<OrderListRequest["status"]>(null)
    const [productId, setProductId] = useState<OrderListRequest["productId"]>(null)
    const [list, setList] = useState<Order[]>([])
    const [pageNumber,setPageNumber] = useState(1)
    const [totalPages , setTotalPages] = useState(0)




    const statusModel: Record<string, string> = {
        PENDING_ADMIN_APPROVAL: "در انتظار تایید مدیر",
        WAITING_FOR_DEPOSIT: "در انتظار پرداخت بیعانه",
        PARTIALLY_PAID: "پرداخت بخشی از بیعانه",
        DEPOSIT_PAID: "بیعانه پرداخت شده",
        BALANCE_PARTIALLY_PAID: "بخشی از مانده سفارش پرداخت شده",
        PAYMENT_PENDING_APPROVAL: "پرداخت در انتطار تایید مدیر",
        FULLY_PAID: "تسویه کامل",
        SELLER_OTP_PENDING: "در انتظار کد تایید صرافی",
        MANUAL_OTP_PENDING: "در انتظار کد تایید دستی",
        COMPLETED: "تکمیل شده",
        REJECTED: "رد شده",
        CANCELLED: "لغو شده"

    }
    





    async function getList() {
        const token = localStorage.getItem("token")


        const httpRequest = fetch("http://37.32.24.124:443/api/v1/customer/orders/list", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({ fromDate, toDate, status, productId ,pageNumber,pageSize:10})
        })
        const response = await httpRequest
        if (response.ok) {
            const bodyResponse = await response.json()
            if (bodyResponse.success) {
                const data = bodyResponse.data

                setList(data.items)
                setTotalPages(data?.totalPages || 0)

            }
        }




    }

    useEffect(() => {
        getList()

    },[pageNumber])





    return (


        <div className="w-full" >
            <Filters statusModel={statusModel} setStatus={setStatus} setProductId={setProductId} getList={getList} setFromDate={setFromDate} setToDate={setToDate} pageNumber={pageNumber} setPageNumber={setPageNumber} />






            <table className="w-full">
                <thead className="bg-gray-100 shadow shadow-gray-300 rounded-xl *:text-center">
                    <tr>
                    <th className="px-6 py-4" >ردیف</th>
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
                        const persianDate = new Date(item.createdAt).toLocaleDateString("fa-IR")
                        const persianTime = new Date(item.createdAt).toLocaleTimeString("fa-IR", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })

                        return (
                            <tr className="border border-white *:border-white  *:border-l *:text-center" key={index}>


                                <td className="px-6 py-4  ">{index + 1}</td>
                                <td className="px-6 py-4 ">{item.product.name}({item.product.symbol})</td>
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

                                <td >
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
                                    <div className="flex flex-col items-center gap-2 ">

                                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                            <g id="Interface / Credit_Card_01">
                                                <path id="Vector" d="M3 11V15.8002C3 16.9203 3 17.4801 3.21799 17.9079C3.40973 18.2842 3.71547 18.5905 4.0918 18.7822C4.5192 19 5.07899 19 6.19691 19H17.8031C18.921 19 19.48 19 19.9074 18.7822C20.2837 18.5905 20.5905 18.2842 20.7822 17.9079C21 17.4805 21 16.9215 21 15.8036V11M3 11V9M3 11H21M3 9V8.2002C3 7.08009 3 6.51962 3.21799 6.0918C3.40973 5.71547 3.71547 5.40973 4.0918 5.21799C4.51962 5 5.08009 5 6.2002 5H17.8002C18.9203 5 19.4796 5 19.9074 5.21799C20.2837 5.40973 20.5905 5.71547 20.7822 6.0918C21 6.5192 21 7.07899 21 8.19691V9M3 9H21M7 15H11M21 11V9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg>


                                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                            <path d="M6 11H18M22 8V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H17M22 16V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H17M7 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V16M2 8V7.8C2 6.11984 2 5.27976 2.32698 4.63803C2.6146 4.07354 3.07354 3.6146 3.63803 3.32698C4.27976 3 5.11984 3 6.8 3H7M6 13.8V10.2C6 9.0799 6 8.51984 6.21799 8.09202C6.40973 7.71569 6.71569 7.40973 7.09202 7.21799C7.51984 7 8.0799 7 9.2 7H14.8C15.9201 7 16.4802 7 16.908 7.21799C17.2843 7.40973 17.5903 7.71569 17.782 8.09202C18 8.51984 18 9.0799 18 10.2V13.8C18 14.9201 18 15.4802 17.782 15.908C17.5903 16.2843 17.2843 16.5903 16.908 16.782C16.4802 17 15.9201 17 14.8 17H9.2C8.0799 17 7.51984 17 7.09202 16.782C6.71569 16.5903 6.40973 16.2843 6.21799 15.908C6 15.4802 6 14.9201 6 13.8Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>


                                    </div>

                                </td>









                            </tr>
                            

                        )
                    })}


                </tbody>

            </table>
            <Pagination setPageNumber={setPageNumber} totalPages={totalPages} pageNumber={pageNumber} />

        </div>





    )
}

