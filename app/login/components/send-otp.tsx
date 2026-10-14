"use client"
import React, { useState, useEffect } from "react";
import PrimeryInput from "../../../components/primary-input"
export default function SendOtp({ setStep, setOtpId , goToPanel}: { setStep: any, setOtpId: any , goToPanel:any}) {
    const [username, setUsername] = useState("3oulless");
    const [errorUsername, seterrorUsername] = useState(false)
    const [password, setPassword] = useState("Admin@5847!@#$");
    const [errorPassword, setErrorpassword] = useState(false)
    const [captchaId, setCaptchaId] = useState("");
    const [captchaCode, setCaptchaCode] = useState("118303");
    const [captchaImage, setCapchaImage] = useState("");




    function handleChange(event: React.ChangeEvent<HTMLInputElement>, key: string) {
        if (key === "username") {
            setUsername(event.target.value)
            seterrorUsername(false)
        }
        if (key === "password") {
            setPassword(event.target.value)
            setErrorpassword(false)
        }
        if (key === "captcha") {
            setCaptchaCode(event.target.value)
            setErrorpassword(false)

        }










    }







    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const request = fetch("http://37.32.24.124:443/api/v1/customer/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify({ username, password, captchaId, captchaCode })
        })
        const response = await request
        if (response.ok) {
            const jsonResponse = await response.json()
            const data = jsonResponse.data
            const otpId = jsonResponse.data.otpId


            if (jsonResponse.success && jsonResponse.data.otpRequired) {
                setStep("checkOtp")
                setOtpId(otpId)
            }
            else if (jsonResponse.success && !jsonResponse.data.otpRequired) {
                localStorage.setItem("loginInfo", JSON.stringify(data))
                const token = data.token
                localStorage.setItem("token", token)
                goToPanel()


            }
        }
    }
    async function fetchCaptcha() {
        const httpRequest = fetch("http://37.32.24.124:443/api/v1/customer/auth/captcha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            }
        })
        const httpResponse = await httpRequest
        if (httpResponse.ok) {
            const chaptchaToJson = await httpResponse.json()
            const captchaId = chaptchaToJson.data.captchaId
            const captchaImage = chaptchaToJson.data.image
            setCaptchaId(captchaId)
            setCapchaImage(captchaImage)


        }
    }
    useEffect(() => {
        fetchCaptcha()

    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCaptcha()

        }, 120000)
        return () => {
            clearTimeout(timer)
        }
    }, [captchaCode, captchaId])










    return (
        <>
            <form onSubmit={handleSubmit}   >
                <h1 className="font-bold">ورود به حساب کاربری</h1>
                <h3>برای ادامه اطلاعات حساب خود را وارد کنید</h3>
                <PrimeryInput value={username} placeholder="نام کاربری را وارد کنید" onChange={(e) => handleChange(e, "username")} className="" type="text" lable="نام کاربری" />
                <PrimeryInput value={password} placeholder="رمز عبور را وارد کنید" onChange={(e) => handleChange(e, "password")} className="" type="password" lable="رمز عبور" />
                <span className="block">کد کپچا</span>
                <div className="flex gap-5">

                    <PrimeryInput value={captchaCode} placeholder="کپچا" onChange={(e) => handleChange(e, "captcha")} className="" type="text" lable="" />

                    <img src={`data:image/png;base64,${captchaImage}`} alt="" onClick={fetchCaptcha} className="w-40 h-10 shadow-md rounded-lg border border-blue-5" />
                </div>

                <button className="rounded w-full h-10  bg-[#211e72] text-white" type="submit"  >ورود</button>

            </form>










        </>
    )


}