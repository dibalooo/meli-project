"use client"
import PrimeryInput from "@/components/primary-input"
import { useAddOrderStore } from "@/store/addOrderStore";
import { useState, useEffect } from "react";
import SelectBox, { type Option } from "../../selectBox";
import { addOrderSchema } from "@/schemas/schemas-add-order";



export default function GetInfo() {
    const { productId, setProductId, count, setCount, rate, setRate, step, setStep, products, setProducts } = useAddOrderStore((state) => state)








async function getList() {
    const req = fetch("http://37.32.24.124:443/api/v1/customer/products/list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },


    })
    const res = await req
    if (res.ok) {
        const bodyRes = await res.json()
        if (bodyRes.success) {
            const products = bodyRes.data.items.map((item: any) => ({ name: item?.name, value: item?.id }));
            setProducts(products)

        }
    }


}
useEffect(() => {
    getList()
}, [])


return (
    <form className="pr-5 py-3 w-full">
        <SelectBox
            lable="ارز"
            name="currency"
            placeholder="ارز موردنظر را انتخاب کنید"
            options={products}
            onChange={(e) => setProductId(e.target.value)}
            className="shadow-md block border-none"
        />
        <div className="flex items-center gap-3  w-full pt-4 ">
            <PrimeryInput value={count} type="text" placeholder="تعداد درخواستی خود را وارد کنید" onChange={(e) => setCount(e.target.value)} lable="تعداد درخواستی" className="w-full" />
            <PrimeryInput value={rate} type="text" placeholder="نرخ خود را وارد کنید" onChange={(e) => setRate(e.target.value)} lable="نرخ" className="w-full" />
        </div>
    </form>
)
}