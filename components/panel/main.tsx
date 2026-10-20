"use client"
import Filters from "./filters"
import OrderList from "@/components/panel/ordersList"
import AddOrder from "@/components/panel/add-order/addOrder"
export default function Main() {
    return (
        <div className="  w-full  ">

            <div>
                <OrderList/>
                <AddOrder/>

                
            </div>
        </div>
    )
}