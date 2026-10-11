"use client"
import { useState } from "react"
export default function Pagination({ setPageNumber, totalPages ,pageNumber}: { setPageNumber: (page: number) => void, totalPages: number ,pageNumber:number}) {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)

    }

    return (
        <div className="flex justify-center items-center gap-5">
            {pages.map((page) => {
                const isActive = pageNumber === page
                return(
                <div className={"cursor-pointer text-gary-500 p-2 w-10 text-center my-5 rounded-xl  " + (isActive ? "bg-[#211e72] text-white" : "bg-transparent ")} key={page} onClick={() => setPageNumber(page)}>{page}</div>

            )
            })}


        </div>
    )
}