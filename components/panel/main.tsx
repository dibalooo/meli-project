"use client"
import Filters from "./filters"
import OrderList from "@/app/panel/orders/ordersList"
export default function Main() {
    return (
        <div className=" bg-blue-100 w-full rounded-2xl">

            <div>
                <Filters />
                <OrderList/>
                
            </div>
        </div>
    )
}