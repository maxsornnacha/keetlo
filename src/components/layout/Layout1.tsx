"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Footer from "../Footer"
import Header from "../Header"
import { faHeadset } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from "next/navigation"
import { Provider } from "react-redux";
import { store } from "@/redux/store";


export default function Layout1({ children }: any){
    const pathname = usePathname();
    
    return (
    <Provider store={store}>
    {pathname.includes("/room") || pathname === "/join/pre-room" ?
    <div>
        <main>
            {children}

        </main>
    </div>
    :
    <div>
        <div className="sticky top-0 z-10 h-max w-full bg-white shadow ">
        <Header/>
        </div>
        <main>
            {children}
        <div className="fixed bottom-4 right-4 z-10">
            <FontAwesomeIcon icon={faHeadset} className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-700 text-white p-4 cursor-pointer shadow-lg"/>
        </div>
        </main>
        <Footer/>
    </div>
    }
    </Provider>
    )
}