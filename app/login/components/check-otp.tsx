"use client"
import { useState } from "react"



export default function CheckOtp({ otpId, setStep, setOtpId ,goToPanel}: { otpId: any, setStep: any, setOtpId: any,goToPanel:any }) {
    const [code, setCode] = useState("118303")

    function changeHandle(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === "code") {
            setCode(event.target.value)
        }
    }




    async function verifyOtp(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        const httpRequest = fetch("http://37.32.24.124:443/api/v1/customer/auth/verify-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ otpId, code })

        })
        const response = await httpRequest
        if (response.ok) {
            const responseBody = await response.json()
            if (responseBody.success) {
                const data = responseBody.data
                localStorage.setItem("loginInfo", JSON.stringify(data))
                const token = data.token
                localStorage.setItem("token" , token)
                goToPanel()
                



            }
        }
    }
    async function resendOtp() {
        const againRequest = fetch("http://37.32.24.124:443/api/v1/customer/auth/resend-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"


            },
            body: JSON.stringify({ otpId })

        })
        const response = await againRequest
        if (!response.ok) {
            setStep("sendOtp")


        }



    }


    return (<>
        <form onSubmit={verifyOtp}>
            <h1 className="text-xl pb-2 font-bold">تایید ورود دومرحله ای</h1>
            <h3>کد یکبار مصرف ارسال شده را وارد کنید</h3>
            <h3 className="pb-8">کد یکبار مصرف</h3>
            <div className="flex justify-between gap-4 py-2">
                <input value={code} onChange={changeHandle} name="code" className="outline-none border border-[#211e72] rounded-lg block" />
                <button type="submit" className="border bg-[#211e72] text-white w-15 h-8 rounded-lg ">ارسال</button>
            </div>



        </form>
        <div >
            <button onClick={() => setStep("sendOtp")} className="text-sm hover:text-base font-bold bg-white hover:bg-[#E5E4E2] rounded px-2">بازگشت</button>
            <button onClick={resendOtp} className="text-sm hover:text-base font-bold bg-white hover:bg-[#E5E4E2] rounded px-2">ارسال مجدد کد</button>
        </div>

    </>
















    )
}





