"use client"
import Sidebar from "../../components/panel/sidebar"
import Main from "../../components/panel/main"
import Header from "../../components/panel/header"
export default function App() {
    return (
        <div className="mt-5 mx-10 border border-[#211e72] rounded-2xl ">
            <div className="pt-10 px-10 pb-8">
                <Header />
                <div className="flex gap-5 pt-5">
                    <Sidebar />
                    <Main />
                </div>
            </div>

        </div>

    )

}