"use client";

import { useRouter } from "next/navigation";
import { Undo2, CircleDashedCheck } from "lucide-react";
import PrimeryInput from "../primary-input";
import React, { useState } from "react";
import { resetPasswordSchema } from "@/schemas/schemas-reset-password";

export default function ResetPassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    key: "currentPassword" | "newPassword" | "confirmNewPassword",
  ) {
    if (key === "currentPassword") {
      setCurrentPassword(event.target.value);
    }
    if (key === "newPassword") {
      setNewPassword(event.target.value);
    }
    if (key === "confirmNewPassword") {
      setConfirmNewPassword(event.target.value);
    }
  }
  const isValid =
    resetPasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmNewPassword,
    }).success && newPassword === confirmNewPassword;

  function handleSubmit() {
    if (!isValid) return;
    changePass();
  }
  async function changePass() {
    const req = fetch(
      "http://37.32.24.124:443/api/v1/customer/auth/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      },
    );
    const res = await req;
    const bodyRes = await res.json();
    if (res.ok && bodyRes.success) {
      router.push("/login");
    }
    if (res.status === 401) {
      router.push("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("loginInfo");
    }
    if (res.status === 440) {
      const message = bodyRes?.message;
      // confirm(message);
      if (confirm(message) == true) {
        router.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("loginInfo");
      }
    }
  }
  return (
    <div className="w-full flex items-center justify-center">
      <div className="shadow-md p-5 rounded-xl">
        <div className="flex justify-between items-center py-1">
          <span className="font-bold">تغییر رمز عبور</span>
        </div>
        <div>
          <PrimeryInput
            value={currentPassword}
            lable="رمزعبور فعلی"
            onChange={(e) => handleChange(e, "currentPassword")}
            type="password"
            className="w-100"
          />
          <PrimeryInput
            value={newPassword}
            lable="رمزعبور جدید"
            onChange={(e) => handleChange(e, "newPassword")}
            type="password"
            className="w-100"
          />
          <PrimeryInput
            value={confirmNewPassword}
            lable="تکرار رمز عبور جدید"
            onChange={(e) => handleChange(e, "confirmNewPassword")}
            type="password"
            className="w-100"
          />
        </div>
        <div className="flex justify-end items-center gap-3 py-4">
          <button
            disabled={!isValid}
            onClick={handleSubmit}
            className={`flex items-center gap-2 rounded px-2 py-1 ${
              !isValid
                ? "opacity-50 cursor-not-allowed bg-gray-400 text-black"
                : "opacity-100 cursor-pointer bg-blue-950 text-white"
            }`}
          >
            <CircleDashedCheck size={16} />
            <span>ذخیره رمزعبور</span>
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 cursor-pointer bg-blue-950 text-white rounded px-2 py-1"
          >
            <Undo2 size={16} />
            <span>بازگشت</span>
          </button>
        </div>
      </div>
    </div>
  );
}
