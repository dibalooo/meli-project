"use client";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FileImage } from "lucide-react";
import { CloudUpload } from "lucide-react";
import { Send } from "lucide-react";
import { Trash } from "lucide-react";
export default function UploadDucument({ id }: { id: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const router = useRouter();
  const [imageName, setImageName] = useState<File | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file);
    }
  };
  const handleRemove = () => {
    setImageName(null);
  };
  return (
    <div className="w-full">
      <div className="flex">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4">
          <div className="mb-4 flex items-center gap-3">
            <FileImage size={32} className="text-[#211e72]" />

            <div>
              <h3 className="font-semibold text-gray-800">آپلود رسید پرداخت</h3>

              <p className="text-sm text-gray-500">فایل PNG، JPG یا PDF</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,application/pdf"
            hidden
            onChange={handleChange}
          />

          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed text-[#211e72] bg-indigo-50/30 p-6 text-center">
            <CloudUpload size={40} className="text-[#211e72]" />

            <div>
              <p className="font-medium text-gray-700">
                فایل خود را انتخاب کنید
              </p>
            </div>

            <button
              type="button"
              onClick={handleClick}
              className="rounded-lg bg-[#211e72] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4541ac]"
            >
              انتخاب فایل
            </button>
          </div>
          {imageName && (
            <div className="flex justify-end gap-3 py-2 items-center">
              <p>{imageName.name}</p>
              <button
                type="button"
                onClick={handleRemove}
                className="bg-[#211e72] text-white rounded p-1"
              >
                <Trash size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4">
          <div className="mb-4 flex items-center gap-3">
            <FileImage size={32} className="text-[#211e72]" />

            <div>
              <h3 className="font-semibold text-gray-800">آپلود معرفی نامه</h3>

              <p className="text-sm text-gray-500">فایل PNG، JPG یا PDF</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,application/pdf"
            hidden
            onChange={handleChange}
          />

          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed text-[#211e72] bg-indigo-50/30 p-6 text-center">
            <CloudUpload size={40} className="text-[#211e72]" />

            <div>
              <p className="font-medium text-gray-700">
                فایل خود را انتخاب کنید
              </p>
            </div>

            <button
              type="button"
              onClick={handleClick}
              className="rounded-lg bg-[#211e72] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4541ac]"
            >
              انتخاب فایل
            </button>
          </div>
          {imageName && (
            <div className="flex justify-end gap-3 py-2 items-center">
              <p>{imageName.name}</p>
              <button
                type="button"
                onClick={handleRemove}
                className="bg-[#211e72] text-white rounded p-1"
              >
                <Trash size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
