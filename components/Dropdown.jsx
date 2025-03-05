"use client"
import { logoutAction } from "@/actions/page";
import { useAppContext } from "@/custom-hooks/Context";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dropdown = () => {
    const { isDropdown2, dropdownRef, logout, show, setUser, setUserEmail, userEmail } = useAppContext();
    const router = useRouter();

    const handleLogout = async() => {
        console.log("clicked")
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
                <div ref={dropdownRef} className="fixed right-10 top-16 w-fit flex justify-end h-fit z-40">

                    {/* Dropdown Content */}
                    <ul className="backdrop-blur-lg shadow-[0_0_15px_5px_rgba(236,158,14,1)] rounded rounded-tl-3xl rounded-tr-none rounded-br-3xl w-48 z-50 h-fit p-10 m-3">
                    {
                            userEmail ?
                            <div className="flex flex-col justify-center gap-2 items-start">
                                {
                                show && 
                                <Link href={'/admin-dashboard'} className="text-white hover:text-2xl hover:text-slate-300 text-xl">Dashboard</Link>
                              }
                            <button onClick={handleLogout} className="text-white hover:underline hover:text-xl hover:text-slate-300 text-lg">Sign Out</button>
                            <Link href={'/chat'} className="text-white hover:underline hover:text-xl hover:text-slate-300 text-lg">Help</Link>
                            <Link href={'/request-quote'} className="text-white hover:underline hover:text-xl hover:text-slate-300 text-lg">Quote</Link>
                            <Link href={'/search-api'} className="text-white hover:underline hover:text-xl hover:text-slate-300 text-lg">Search Api</Link>
                            </div>
                            :
                            <div className="flex flex-col justify-center gap-2 items-start">
                            <Link href={'/sign-up'} className="text-white hover:underline hover:text-xl hover:text-slate-300 text-lg">Sign Up</Link>
                            <Link href={'/sign-in'} className="text-white hover:underline hover:text-xl hover:text-slate-300 text-lg">Sign In</Link>
                            <Link href={'/chat'} className="text-white hover:underline hover:text-xl hover:text-slate-300 text-lg">Help</Link>
                            <Link href={'/request-quote'} className="text-white hover:underline hover:text-xl hover:text-slate-300 text-lg">Quote</Link>
                            <Link href={'/search-api'} className="text-white hover:underline hover:text-xl text-nowrap hover:text-slate-300 text-lg">Search Api</Link>
                            </div>
                        }
                        
                        
                    </ul>
                </div>
            )}
        </>
    );
};

export default Dropdown;
