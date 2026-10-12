"use client"
import Filters from "./filters"
import OrderList from "@/components/panel/ordersList"
import AddOrder from "@/components/panel/addOrder"
export default function Main() {
    return (
        <div className=" bg-blue-100 w-full rounded-2xl ">

            <div>
                <OrderList/>
                <AddOrder/>

                
            </div>
        </div>
    )
}