import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';

function SearchBar() {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(() =>{
        if(location.pathname.includes('book') ){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    }, [location])

    return showSearch && visible ? (
        <div className='border-t-[1px] border-b-[1px]  bg-gray-50 text-center'>
            <div className="inline-flex items-center justify-center border border-gray-300 px-5 py-2 my-5 mx-3 rounded-full">
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm'/>
                <img className='w-4' src="https://cdn-icons-png.flaticon.com/128/54/54481.png"  alt="" />
            </div>
            <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src="https://cdn-icons-png.flaticon.com/128/2961/2961937.png" width="10px" alt="" />
        </div>
    ) : null
}

export default SearchBar
