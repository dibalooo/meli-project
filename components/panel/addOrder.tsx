"use client"
import { useEffect, useState } from "react"
import SelectBox, { type Option } from "./selectBox";
import PrimeryInput from "../primary-input";
type AddOrder = {
    productId: string;
    count: string;
    rate: string;
}


export default function AddOrder() {
    const [productId, setProductId] = useState<AddOrder["productId"]>("")
    const [count, setCount] = useState<AddOrder["count"]>("")
    const [rate, setRate] = useState<AddOrder["rate"]>("")
    const [products, setProducts] = useState<Option[]>([])

    async function getList() {
        const req = fetch("http://37.32.24.124:443/api/v1/customer/products/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ productId, count, rate })


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

        <div className="w-full">
            <div className=" flex flex-col justify-center items-center">
                <span>ثبت سفارش</span>


                <div>
                    <span>اطلاعات سفارش</span>
                    <SelectBox
                        lable="ارز"
                        name="currency"
                        placeholder="ارز موردنظر را انتخاب کنید"
                        options={products}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </div>
                <PrimeryInput value={count} type="text" placeholder="تعداد درخواستی خود را وارد کنید" onChange={(e) => setCount(e.target.value)} lable="تعداد درخواستی" />
                <PrimeryInput value={rate} type="text" placeholder="نرخ خود را وارد کنید" onChange={(e) => setRate(e.target.value)} lable="نرخ" />
            </div>



        </div>

    )


}