"use client";
import type { LucideIcon } from "lucide-react";
type Props = {
    img : string;
    text : string;
  icon: LucideIcon;
};
export default function PrimaryImgBox({
  img,
  text,
  icon: Icon,
}: Props) {
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="flex-1">
        <div className="flex justify-between p-5">
          <div className="font-bold">{text}</div>

          <a
            href={img}
            download="receipt.jpg"
            className="bg-gray-300 rounded p-1  cursor-pointer  "
          >
            <Icon size={18}/>
          </a>
        </div>

        <div className="shadow-md rounded-2xl h-60 p-10">
          <img className="h-full w-full object-contain" src={img} alt="" />
        </div>
      </div>
    </div>
  );
}
