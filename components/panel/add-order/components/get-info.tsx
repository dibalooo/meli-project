"use client"
import PrimeryInput from "@/components/primary-input"
import { useAddOrderStore } from "@/store/addOrderStore";
import { useState, useEffect } from "react";
import SelectBox, { type Option } from "../../selectBox";
import { useRouter } from "next/navigation";



export default function GetInfo() {
    const { productId, setProductId, count, setCount, rate, setRate, step, setStep, products, setProducts } = useAddOrderStore((state) => state)
    const router = useRouter()







    async function getList() {
        const req = fetch("http://37.32.24.124:443/api/v1/customer/products/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },


        })
        const res = await req
        const bodyRes = await res.json()

        if (res.ok && bodyRes.success) {
            const products = bodyRes.data.items.map((item: any) => ({ name: item?.name, value: item?.id }));
            setProducts(products)

        }else if(res.status === 401 || bodyRes.statusCode === 440  ){
            router.push("/login")
            localStorage.removeItem("token")
            localStorage.removeItem("loginInfo")

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
                value={productId}
            />
            <div className="flex items-center gap-3  w-full pt-4 ">
                <PrimeryInput value={count} type="text" placeholder="تعداد درخواستی خود را وارد کنید" onChange={(e) => setCount(e.target.value)} lable="تعداد درخواستی" className="w-full" />
                <PrimeryInput value={rate} type="text" placeholder="نرخ خود را وارد کنید" onChange={(e) => setRate(e.target.value)} lable="نرخ" className="w-full" />
            </div>
        </form>
    )
}