"use client"
import { use, useState } from "react"
import SendOtp from "./components/send-otp"
import CheckOtp from "./components/check-otp"
import { useRouter } from "next/navigation"

export default function App() {
    const [step, setStep] = useState("sendOtp") // sendOtp|checkOtp
    const [otpId, setOtpId] = useState("")
    const router = useRouter()

    const goToPanel = ()=>{
        router.push("/panel")
    }

    //   if(step === "sendOtp"){
    //     return <SendOtp setStep={setStep} setOtpId={setOtpId}/>
    //   }
    //    if(step === "checkOtp"){
    //     return <CheckOtp otpId={otpId}/>
    //   }

    // {step==="sendOtp" && <sendOtp/>}
    return (
        <div className=" h-screen flex justify-center items-center  ">
            <div className="  rounded-lg  w-100  justify-center shadow-xl/30 shadow-[#211e72] p-8">
                {step === "sendOtp" && <SendOtp setStep={setStep} setOtpId={setOtpId} goToPanel={goToPanel}/>}
                {step === "checkOtp" && <CheckOtp setStep={setStep} otpId={otpId} setOtpId={setOtpId} goToPanel={goToPanel}/>}
               


            </div>

        </div>
    )


}