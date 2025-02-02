"use client";
import { useRouter } from "next/navigation";
import Api from "@/components/Api";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from "react";
import { getAPIAction } from "@/actions/page";
const SearchApi = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [apiData, setApiData] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const notFoundRef = useRef(null);

    const getApiData = async()=>{
      const apis = await getAPIAction()
      setApiData(apis.data)
    }
    useEffect(()=>{
      getApiData()
    }, [])
    
    const handleSearchClick = () =>{
        const result = apiData.filter(value =>
            value.title.toLowerCase().includes(search.toLowerCase())
          );
        let id = result[0]?._id
        if (!id) {
            if (notFoundRef.current) {
              setIsActive(true)
              notFoundRef.current.textContent = `No results found for "${search}"`;
            }
          } else {
            router.push(`/search-api/${id}`);
          }
    }

  return (
    <div className="flex flex-col justify-center items-center py-96">
         <div className="w-96 relative">
      <input
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
    type="text"
    placeholder="Search your api here"
    className="input input-bordered input-accent w-full max-w-xs" />
    <SearchIcon onClick={handleSearchClick} className={`absolute top-4 right-20 scale-125 hover:scale-150 ${search.length == 0 ?  "opacity-50 pointer-events-none" : ""}`}/>
      </div>
      <div ref={notFoundRef} className="  py-2 px-5 text-lg rounded-xl mt-10 text-red-500"></div>
    <div className="my-20 grid grid-cols-5 gap-10 items-center content-center">
        
        {
            apiData.map((data, i)=> (
                <Api id={data._id} title={data.title} description={data.description} image={data.image} clients={data.clients} key={i} />
            ))
        }
    </div>
    </div>
  )
}

export default SearchApi