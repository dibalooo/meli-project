"use client"
import { useEffect, useState } from "react"
type OrderListRequest = {
    fromDate: string | null;
    toDate: string | null;
    status: string | null;
    productId: string | null;

}
type Order = {
    id: string
}
export default function OrderList() {
    const [fromDate, setFromDate] = useState<OrderListRequest["fromDate"]>(null)
    const [toDate, setToDate] = useState<OrderListRequest["toDate"]>(null)
    const [status, setStatus] = useState<OrderListRequest["status"]>(null)
    const [productId, setProductId] = useState<OrderListRequest["productId"]>(null)
    const [list, setList] = useState<Order[]>([])





    async function getList() {
        const token = localStorage.getItem("token")
        console.log("token exists:", !!token)
        console.log("token length:", token?.length)

        const httpRequest = fetch("http://37.32.24.124:443/api/v1/customer/orders/list", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify({ fromDate, toDate, status, productId })
        })
        const response = await httpRequest
        if (response.ok) {
            const bodyResponse = await response.json()
            if (bodyResponse.success) {
                const data = bodyResponse.data

                setList(data.items)

            }
        }




    }

    useEffect(() => {
        getList()

    }, [])
    return (
        <div>
            {list.map((item) => (
                <div>
                    {item.id}
                </div>



            ))}
        </div>

    )
}