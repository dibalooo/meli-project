"use client";
import React, { useState, useEffect } from "react";
import PrimeryInput from "../../../components/primary-input";
import { loginSchema } from "@/schemas/schemas-login";
import { fa } from "zod/locales";
export default function SendOtp({
  setStep,
  setOtpId,
  goToPanel,
}: {
  setStep: any;
  setOtpId: any;
  goToPanel: any;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaImage, setCapchaImage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading , setIsLoading] = useState<boolean>(false)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof loginSchema.shape,
  ) {
    const value = event.target.value;
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
      return;
    }

    if (key === "username") {
      setUsername(value);
    }

    if (key === "password") {
      setPassword(value);
    }
    if (key === "captchaCode") {
      setCaptchaCode(value);
    }
    const result = loginSchema.shape[key].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [key]: result.success ? "" : result.error.issues[0].message,
    }));
  }const isFormValid =
  loginSchema.safeParse({
    username,
    password,
    captchaCode,
  }).success;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    setIsLoading(true)
    e.preventDefault();
    const request = fetch(
      "http://37.32.24.124:443/api/v1/customer/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, captchaId, captchaCode }),
      },
    );
    const response = await request;
    if (response.ok) {
      const jsonResponse = await response.json();
      const data = jsonResponse.data;
      const otpId = jsonResponse.data.otpId;

      if (jsonResponse.success && jsonResponse.data.otpRequired) {
        setStep("checkOtp");
        setOtpId(otpId);
      } else if (jsonResponse.success && !jsonResponse.data.otpRequired) {
        localStorage.setItem("loginInfo", JSON.stringify(data));
        const token = data.token;
        localStorage.setItem("token", token);
        goToPanel();
      }
    }
    setIsLoading(false)
  }
  async function fetchCaptcha() {
    const httpRequest = fetch(
      "http://37.32.24.124:443/api/v1/customer/auth/captcha",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const httpResponse = await httpRequest;
    if (httpResponse.ok) {
      const chaptchaToJson = await httpResponse.json();
      const captchaId = chaptchaToJson.data.captchaId;
      const captchaImage = chaptchaToJson.data.image;
      setCaptchaId(captchaId);
      setCapchaImage(captchaImage);
    }
  }
  useEffect(() => {
    fetchCaptcha();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCaptcha();
    }, 120000);
    return () => {
      clearTimeout(timer);
    };
  }, [captchaCode, captchaId]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold">ورود به حساب کاربری</h1>
        <h3>برای ادامه اطلاعات حساب خود را وارد کنید</h3>
        <div className="py-3">
          <PrimeryInput
          value={username}
          placeholder="نام کاربری را وارد کنید"
          onChange={(e) => handleChange(e, "username")}
          className={`w-full border ${errors.username && "border-red-500 "}`}
          type="text"
          lable="نام کاربری"
        />
        {errors && (
          <p className="text-red-500 text-sm pt-2">{errors.username}</p>
        )}
        </div>
        <div className="py-3">
          <PrimeryInput
          value={password}
          placeholder="رمز عبور را وارد کنید"
          onChange={(e) => handleChange(e, "password")}
          className={`w-full border ${errors.password && "border-red-500 "} `}
          type="password"
          lable="رمز عبور"
        />
        {errors && (
          <p className="text-sm text-red-500 pt-2">{errors.password}</p>
        )}
        </div>
        
        <div className="flex gap-5 items-center border-b border-gray-400">
          <div className="pb-2">
            <PrimeryInput
            value={captchaCode}
            placeholder="کد امنیتی"
            onChange={(e) => handleChange(e, "captchaCode")}
            className={`border-none shadow-none bg-white`}
            type="text"
            lable=""
          />
          
          </div>
          

          <img
            src={`data:image/png;base64,${captchaImage}`}
            alt=""
            onClick={fetchCaptcha}
            className="w-25 h-10 shadow-md rounded "
          />
          
          
        </div>
        {errors && (
            <p className="text-sm text-red-500">{errors.captchaCode}</p>
          )}

        <button
        disabled={isLoading || !isFormValid}
          className={`rounded w-full p-2 bg-[#211e72] text-white my-8 ${!isFormValid||isLoading
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-[#211e72] cursor-pointer"}`}
          type="submit"
        >
          ورود
        </button>
      </form>
    </>
  );
}
