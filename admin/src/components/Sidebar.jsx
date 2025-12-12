import {NavLink} from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-1 border-blue-300'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

        <NavLink className='flex items-center gap-3 border border-blue-300 border-r-0 px-3 py-2 ' to="/add">
            <img className='w-5 h-5 ' src={assets.add_logo} alt="" />
            <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-blue-300 border-r-0 px-3 py-2 ' to="/list">
            <img className='w-5 h-5 ' src={assets.list_logo} alt="" />
            <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-blue-300 border-r-0 px-3 py-2 ' to="/orders">
            <img className='w-5 h-5 ' src={assets.orders} alt="" />
            <p className='hidden md:block'>Order Items</p>
        </NavLink>


      </div>
    </div>
  )
}

export default Sidebar
