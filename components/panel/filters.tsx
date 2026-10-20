"use client"
import { useEffect, useState } from "react"
import DatePickerComponent from "./DatePicker"
import SelectBox from "./selectBox";
import PrimaryBtn from "../primary-btn";
import { useRouter } from "next/navigation";

type StatusModel = Record<string, string>;

export default function Filters({ statusModel, setStatus, setProductId, getList, setFromDate, setToDate, pageNumber, setPageNumber }: { statusModel: StatusModel, setStatus: any, setProductId: any, getList: () => void, setFromDate: (date: string | null) => void, setToDate: (date: string | null) => void, pageNumber: number, setPageNumber: (number: number) => void }) {
    const statusList = Object.keys(statusModel).map(key => ({ value: key, name: statusModel[key] }))
    const [products, setProducts] = useState([])
    const router = useRouter()
    async function requestProductList() {
        const fetching = fetch("http://37.32.24.124:443/api/v1/customer/products/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        const response = await fetching
        const bodyResponse = await response.json()


        if (response.ok && bodyResponse.success) {


            const products = bodyResponse.data.items.map((item: any) => ({ name: item?.name, value: item?.id }));
            setProducts(products)


        }
        if(response.status === 401 || bodyResponse.statusCode === 440){
            router.push("/login")
            localStorage.removeItem("token")
            localStorage.removeItem("loginInfo")
        }
    }
    useEffect(() => {
        requestProductList()


    }, [])


    return (
        <div className="flex justify-around items-center py-8  border-b border-white rounded-xl">
            <div>
                <div className="pb-1">از تاریخ</div>
                <DatePickerComponent onChange={(e: any) => setFromDate(e?.format())} />
            </div>
            <div>
                <div className="pb-1">تا تاریخ</div>
                <DatePickerComponent onChange={(e: any) => setToDate(e?.format())} />
            </div>
            <div className="relative">
                <SelectBox lable="وضعیت" options={statusList} onChange={(e) => setStatus(e?.target?.value)} name="status" placeholder="وضعیت سفارش را انتخاب کنید" />
                <span className="absolute left-2 top-9"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#000000" />
                </svg></span>
            </div>
            <div className="relative">
                <SelectBox lable="ارز" options={products} onChange={(e) => setProductId(e.target.value)} name="currency" placeholder="ارز موردنظر را انتخاب کنید" />
                <span className="absolute left-2 top-9"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#000000" />
                </svg></span>
            </div>
            <PrimaryBtn label="جست و جو" onClick={() => {
                pageNumber === 1 ? getList() : setPageNumber(1)

            }} />


        </div>


    )

}