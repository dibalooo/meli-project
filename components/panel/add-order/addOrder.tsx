"use client"
import { useEffect, useState } from "react"
import SelectBox, { type Option } from "../selectBox";
import PrimeryInput from "../../primary-input";
import { useRouter } from "next/navigation";
import { useAddOrderStore } from "@/store/addOrderStore";
import ShowRules from "./components/show-rules";
import GetInfo from "./components/get-info";


type AddOrder = {
    productId: string;
    count: string;
    rate: string;
}


export default function AddOrder() {
    const { productId, setProductId, count, setCount, rate, setRate, step, setStep } = useAddOrderStore((state) => state)
    const [products, setProducts] = useState<Option[]>([])
    const router = useRouter()

    






    return (

        <div className="w-full mt-20">
            <div className="flex flex-col justify-between items-center ">
                <div className="shadow-md  p-5 rounded-2xl w-150 flex flex-col">
                    <div className="border-b mb-5 pb-3">ثبت سفارش</div>
                    <div className="flex items-center gap-3">
                        <span className="bg-blue-950 text-white px-2 text-center rounded">1</span>
                        <div>اطلاعات سفارش</div>
                    </div>
                    {step === "getInfo" && <GetInfo />}
                    <div className="flex items-center gap-3 py-5">
                        <span className="bg-blue-100 text-white px-2 text-center rounded">2</span>
                        <div>پذیرش شیوه نامه</div>
                    </div>
                    {step === "acceptRules" && <ShowRules />}
                    <div className="flex gap-3 justify-end text-white pt-5">
                        <div onClick={() => router.push("/panel/orders")} className="flex border rounded-lg items-center justify-center gap-2 w-30 h-10 bg-blue-950 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ffffff" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 206.108 206.108" xmlSpace="preserve">
                                <path d="M152.774,69.886H30.728l24.97-24.97c3.515-3.515,3.515-9.213,0-12.728c-3.516-3.516-9.213-3.515-12.729,0L2.636,72.523  c-3.515,3.515-3.515,9.213,0,12.728l40.333,40.333c1.758,1.758,4.061,2.636,6.364,2.636c2.303,0,4.606-0.879,6.364-2.636  c3.515-3.515,3.515-9.213,0-12.728l-24.97-24.97h122.046c19.483,0,35.334,15.851,35.334,35.334s-15.851,35.334-35.334,35.334H78.531  c-4.971,0-9,4.029-9,9s4.029,9,9,9h74.242c29.408,0,53.334-23.926,53.334-53.334S182.182,69.886,152.774,69.886z" />
                            </svg>
                            بازگشت
                        </div>
                        <div onClick={() => setStep("acceptRules")} className="flex border rounded-lg items-center justify-center gap-2 w-30 h-10 bg-blue-950 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24"><path fill="none" stroke="#ffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 6l-6 6l6 6"></path></svg>
                            مرحله بعد
                        </div>



                    </div>
                </div>


            </div>



        </div>

    )


}