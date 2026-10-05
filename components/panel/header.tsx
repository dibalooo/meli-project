"use client"
export default function Header() {
    return (
        <div className="flex gap-5 ">
            <div className="bg-gray-400 flex items-center w-[316px] rounded-2xl p-2 justify-evenly text-white text-2xl font-bold shadow shadow-gray-500">
                <img src="/primary-logo.png" alt="" className="w-[80px] h-[80px]" />
                <div>صرافی ملی</div>


            </div>
            <div className="bg-gray-100 w-full flex items-center justify-between h-30 rounded-2xl px-5 shadow shadow-gray-500">
                <div>
                    <span className="text-2xl font-bold">سفارشات</span>
                    <div>میتوانید تمامی سفارش های خود را اینجا ببینید و سفارش جدید ثبت کنید.</div>
                </div>
                <button className="flex items-center   bg-gray-500 rounded-md text-white shadow shadow-gray-500 px-2 ">
                    <span>پنل مشتری</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 30 16" fill="none">
                            <path d="M9 13L9 10H16V6L9 6L9 3L8 3L3 8L8 13H9Z" fill="#fffefe" />
                            <path d="M2 14L2 2L0 2L5.24537e-07 14H2Z" fill="#e9dddd" />
                        </svg>

                </button>

            </div>
        </div>

    )
}