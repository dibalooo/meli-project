'use client';

import { useRouter } from 'next/navigation';
import { Undo2, CircleDashedCheck } from 'lucide-react';
import PrimeryInput from '../primary-input';
import React, { useState, useEffect } from 'react';
import { resetPasswordSchema } from '@/schemas/schemas-reset-password';

export default function ResetPassword() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // بررسی اعتبار کل فرم
  const isValid =
    resetPasswordSchema.safeParse(formData).success &&
    formData.newPassword === formData.confirmNewPassword;

  // تغییر مقدار فیلدها
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof formData
  ) {
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // بررسی خطاهای فیلدها
  useEffect(() => {
    const currentPasswordResult =
      resetPasswordSchema.shape.currentPassword.safeParse(
        formData.currentPassword
      );

    const newPasswordResult =
      resetPasswordSchema.shape.newPassword.safeParse(
        formData.newPassword
      );

    const confirmNewPasswordResult =
      resetPasswordSchema.shape.confirmNewPassword.safeParse(
        formData.confirmNewPassword
      );

    setErrors({
      currentPassword: currentPasswordResult.success
        ? ''
        : currentPasswordResult.error.issues[0].message,

      newPassword: newPasswordResult.success
        ? ''
        : newPasswordResult.error.issues[0].message,

      confirmNewPassword: !confirmNewPasswordResult.success
        ? confirmNewPasswordResult.error.issues[0].message
        : formData.newPassword !== formData.confirmNewPassword
          ? 'رمز عبور جدید و تکرار آن یکسان نیستند'
          : '',
    });
  }, [
    formData.currentPassword,
    formData.newPassword,
    formData.confirmNewPassword,
  ]);

  // ارسال درخواست تغییر رمز عبور
  async function changePass() {
    setIsLoading(true);

    try {
      const res = await fetch(
        'http://37.32.24.124:443/api/v1/customer/auth/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const bodyRes = await res.json();

      if (res.ok && bodyRes.success) {
        router.push('/login');
        return;
      }

      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('loginInfo');
        router.push('/login');
        return;
      }

      if (res.status === 440) {
        const message = bodyRes?.message;

        if (confirm(message)) {
          localStorage.removeItem('token');
          localStorage.removeItem('loginInfo');
          router.push('/login');
        }
      }
    } catch (error) {
      console.error('Change password error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // اعتبارسنجی قبل از ارسال
  function handleSubmit() {
    if (!isValid || isLoading) return;

    changePass();
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-150 shadow-md p-5 rounded-xl">
        <div className="flex justify-between items-center py-1">
          <span className="font-bold">تغییر رمز عبور</span>
        </div>

        <div>
          {/* رمز عبور فعلی */}
          <div className="py-2">
            <PrimeryInput
              value={formData.currentPassword}
              lable="رمزعبور فعلی"
              onChange={(e) => handleChange(e, 'currentPassword')}
              type="password"
              className={`w-full border ${
                errors.currentPassword && formData.currentPassword
                  ? 'border-red-500'
                  : ''
              }`}
            />

            {errors.currentPassword && formData.currentPassword && (
              <p className="text-red-500 text-sm pt-2">
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* رمز عبور جدید */}
          <div className="py-2">
            <PrimeryInput
              value={formData.newPassword}
              lable="رمزعبور جدید"
              onChange={(e) => handleChange(e, 'newPassword')}
              type="password"
              className={`w-full border ${
                errors.newPassword && formData.newPassword
                  ? 'border-red-500'
                  : ''
              }`}
            />

            {errors.newPassword && formData.newPassword && (
              <p className="text-red-500 text-sm pt-2">
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* تکرار رمز عبور */}
          <div className="py-2">
            <PrimeryInput
              value={formData.confirmNewPassword}
              lable="تکرار رمز عبور جدید"
              onChange={(e) => handleChange(e, 'confirmNewPassword')}
              type="password"
              className={`w-full border ${
                errors.confirmNewPassword && formData.confirmNewPassword
                  ? 'border-red-500'
                  : ''
              }`}
            />

            {errors.confirmNewPassword && formData.confirmNewPassword && (
              <p className="text-red-500 text-sm pt-2">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 py-4">
          <button
            disabled={!isValid || isLoading}
            onClick={handleSubmit}
            className={`flex items-center gap-2 rounded px-2 py-1 ${
              !isValid || isLoading
                ? 'opacity-50 cursor-not-allowed bg-gray-400 text-black'
                : 'opacity-100 cursor-pointer bg-blue-950 text-white'
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