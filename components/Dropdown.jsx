"use client"

import { useAppContext } from "@/custom-hooks/Context";

const Dropdown = () => {
    const { isDropdown2, dropdownRef2 } = useAppContext();

    return (
        <>
            {isDropdown2 && (
                <div ref={dropdownRef2} className="fixed right-10 top-16 w-fit flex justify-end h-fit">

                    {/* Dropdown Content */}
                    <ul className="glass shadow-[0_0_15px_5px_rgba(59,130,246,0.8)] rounded rounded-tl-3xl rounded-tr-none rounded-br-3xl backdrop-blur-sm w-40 z-50 h-fit p-10 m-3">
                        <li className="text-white my-3 text-xl"><a>Item 1</a></li>
                        <li className="text-white my-3 text-xl"><a>Item 2</a></li>
                        <li className="text-white my-3 text-xl"><a>Item 3</a></li>
                        <li className="text-white my-3 text-xl"><a>Item 4</a></li>
                        <li className="text-white my-3 text-xl"><a>Item 5</a></li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Dropdown;
