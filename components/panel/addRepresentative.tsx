"use client";
import { useState } from "react";
import PrimeryInput from "../primary-input";
import { useRouter } from "next/navigation";
import { ShieldUser, Undo2 } from "lucide-react";
import { addRepresentativeSchema } from "@/schemas/schemas-add-representative";
export default function AddRepresentative() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [idNo, setIdNo] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    key:
      | "firstName"
      | "lastName"
      | "username"
      | "password"
      | "cellphone"
      | "idNo"
      | "confirmPassword",
  ) {
    if (key === "firstName") {
      setFirstName(event.target.value);
    }
    if (key === "lastName") {
      setLastName(event.target.value);
    }
    if (key === "username") {
      setUsername(event.target.value);
    }
    if (key === "password") {
      setPassword(event.target.value);
    }
    if (key === "cellphone") {
      setCellphone(event.target.value);
    }
    if (key === "idNo") {
      setIdNo(event.target.value);
    }
    if (key === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
  }
  function handleSubmit() {
    if (!isFormValid) return;

    createNewRepresentative();
  }
  const isFormValid =
    addRepresentativeSchema.safeParse({
      firstName,
      lastName,
      username,
      password,
      cellphone,
      idNo,
      confirmPassword,
    }).success && password === confirmPassword;
  async function createNewRepresentative() {
    const req = fetch(
      "http://37.32.24.124:443/api/v1/customer/exchange-users/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          cellphone : Number(cellphone),
          idNo,
        }),
      },
    );
    const res = await req;
    const bodyRes = await res.json();
    if (res.ok && bodyRes.success) {
      router.push("/panel/exchange-representative");
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
    <div className="flex justify-center items-center w-full">
      <div className="shadow-md rounded-xl p-8">
        <div className="flex gap-5">
          <PrimeryInput
            value={firstName}
            onChange={(e) => handleChange(e, "firstName")}
            type="text"
            lable="نام"
          />
          <PrimeryInput
            value={lastName}
            onChange={(e) => handleChange(e, "lastName")}
            type="text"
            lable="نام خانوادگی"
          />
          <PrimeryInput
            value={username}
            onChange={(e) => handleChange(e, "username")}
            type="text"
            lable="نام کاربری"
          />
        </div>
        <div className="flex gap-5">
          <PrimeryInput
            value={cellphone}
            onChange={(e) => handleChange(e, "cellphone")}
            type="text"
            lable="شماره همراه"
          />
          <PrimeryInput
            value={idNo}
            onChange={(e) => handleChange(e, "idNo")}
            type="text"
            lable="کد ملی"
          />
          <PrimeryInput
            value={password}
            onChange={(e) => handleChange(e, "password")}
            type="password"
            lable="رمز عبور"
          />
        </div>
        <PrimeryInput
          value={confirmPassword}
          onChange={(e) => handleChange(e, "confirmPassword")}
          type="password"
          lable="تکرار رمز عبور"
        />

        <div className="flex justify-end gap-3">
          <button
            disabled={!isFormValid}
            onClick={handleSubmit}
            className={`flex items-center gap-1  rounded px-2 py-1 ${
              !isFormValid
                ? "opacity-50 cursor-not-allowed bg-gray-400 text-black"
                : "opacity-100 cursor-pointer bg-blue-950 text-white"
            }`}
          >
            <ShieldUser size={16} />
            <span>ایجاد نماینده</span>
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
