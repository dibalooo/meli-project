"use client"
export default function Sidebar() {
     

    return (
        <div className="flex flex-col justify-between bg-[#211e72] h-[calc(100vh-250px)] w-80 rounded-2xl overflow-hidden">
            <div className=" mt-10 ">
                <div className="flex justify-around items-center">
                    <button className="flex items-center gap-5">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                            <path d="M14 19.2857L15.8 21L20 17M4 21C4 17.134 7.13401 14 11 14C12.4872 14 13.8662 14.4638 15 15.2547M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></span>
                        <span className="text-white">دیبا ارشادی</span>

                    </button>
                    <div><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 6l-6 6l6 6" /></svg></div>
                </div>
                <button className="flex items-center gap-5 w-50 h-10 m-10 border border-white rounded-md">
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 3.66333L20.25 7.7398V17.01L12 21.0865L3.75 17.01V7.7398L12 3.66333ZM5.25 9.41292V16.078L11.25 19.0427V12.3776L5.25 9.41292ZM12.75 12.3776V19.0427L18.75 16.078V9.41292L16.5 10.5247V13.4999L15 14.2499V11.2659L12.75 12.3776ZM17.807 8.20577L15.8527 9.17139C15.8099 9.13606 15.7624 9.10498 15.7106 9.07908L10.1015 6.27454L12 5.33645L17.807 8.20577ZM8.41452 7.1081L14.1871 9.9944L12 11.0751L6.19304 8.20577L8.41452 7.1081Z" fill="#fff" />
                    </svg></span>
                    <span className="text-white">سفارشات</span>

                </button>
                <button className="flex items-center gap-5 w-50 h-10 m-10 border border-white rounded-md">
                    <span><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 -0.5 33 21" version="1.1">


                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-333.000000, -240.000000)" fill="#ffff">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M285.1,98 L301.9,98 L301.9,82 L285.1,82 L285.1,98 Z M283,100 L304,100 L304,80 L283,80 L283,100 Z M292.45,91 L289.3,91 L289.3,89 L292.45,89 L292.45,86 L294.55,86 L294.55,89 L297.7,89 L297.7,91 L294.55,91 L294.55,94 L292.45,94 L292.45,91 Z" id="plus-[#1513]">

                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg></span>
                    <span className="text-white">سفارش جدید</span>

                </button>

            </div>





            <button className="  text-[#211e72] mb-10 w-15 self-end ml-10">
                <div className="flex items-center bg-white p-1 rounded-lg">

                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 21 21">

                            <g fill="none" fillRule="evenodd" stroke="#211e72" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 3)">

                                <path d="m10.595 10.5 2.905-3-2.905-3" />

                                <path d="m13.5 7.5h-9" />

                                <path d="m10.5.5-8 .00224609c-1.1043501.00087167-1.9994384.89621131-2 2.00056153v9.99438478c0 1.1045695.8954305 2 2 2h8.0954792" />

                            </g>

                        </svg>
                    </span>
                    <span>خروج</span>
                </div>


            </button>

        </div>





    )

}