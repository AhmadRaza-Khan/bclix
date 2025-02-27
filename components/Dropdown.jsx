"use client"

import { logoutAction } from "@/actions/page";
import { useAppContext } from "@/custom-hooks/Context";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dropdown = () => {
    const { isDropdown2, dropdownRef2, logout, setUser, setUserEmail, userEmail } = useAppContext();
    const router = useRouter();

    const handleLogout = async() => {
        const response = await logoutAction();
        if (response.success) {
            Cookies.remove('token', { path: '/' });
            setUser("");
            setUserEmail("");
            logout()
            router.push('/');
        } else {
            console.error(response.message);
        }
      };
    return (
        <>
            {isDropdown2 && (
                <div ref={dropdownRef2} className="fixed right-10 top-16 w-fit flex justify-end h-fit">

                    {/* Dropdown Content */}
                    <ul className="glass shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] rounded rounded-tl-3xl rounded-tr-none rounded-br-3xl backdrop-blur-sm w-48 z-50 h-fit p-10 m-3">
                    {
                            userEmail ?
                            <div className="flex flex-col justify-center gap-2 items-start">
                            <button onClick={handleLogout} className="text-white hover:text-xl hover:text-slate-300 text-lg">Sign Out</button>
                            <Link href={'/chat'} className="text-white hover:text-xl hover:text-slate-300 text-lg">Help</Link>
                            <Link href={'/quote'} className="text-white hover:text-xl hover:text-slate-300 text-lg">Quote</Link>
                            <Link href={'/search-api'} className="text-white hover:text-xl hover:text-slate-300 text-lg">Search Api</Link>
                            </div>
                            :
                            <div className="flex flex-col justify-center gap-2 items-start">
                            <Link href={'/sign-up'} className="text-white hover:text-xl hover:text-slate-300 text-lg">Sign Up</Link>
                            <Link href={'/sign-in'} className="text-white hover:text-xl hover:text-slate-300 text-lg">Sign In</Link>
                            <Link href={'/chat'} className="text-white hover:text-xl hover:text-slate-300 text-lg">Help</Link>
                            <Link href={'/quote'} className="text-white hover:text-xl hover:text-slate-300 text-lg">Quote</Link>
                            <Link href={'/search-api'} className="text-white hover:text-xl text-nowrap hover:text-slate-300 text-lg">Search Api</Link>
                            </div>
                        }
                        
                        
                    </ul>
                </div>
            )}
        </>
    );
};

export default Dropdown;
