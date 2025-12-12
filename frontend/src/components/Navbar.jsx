import { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

export default function Navbar() {
  // State to control mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className="">

      {/* Navigation */}
      <nav className="bg-white ">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

          {/* Left side: Logo + Navigation links */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">

            {/* Logo Icon */}
            <div className="text-yellow-600">
              <Link to= "/">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M20 30 Q 50 10, 80 30 L 70 40 Q 50 25, 30 40 Z" />
                  <path d="M20 50 Q 50 70, 80 50 L 70 60 Q 50 75, 30 60 Z" />
                </svg>
              </Link>
            </div>

            {/* Desktop Navigation Links (hidden on mobile) */}
            <NavLink to= "/" className="hidden sm:block text-gray-700  font-medium transition text-sm lg:text-base ">
              <p>Home</p>
              <hr className="w-2/4 border-none h-[1.0px] bg-gray-700 center hidden" />
            </NavLink>

            <NavLink to= "/book" className="hidden sm:block text-gray-700  font-medium transition text-sm lg:text-base ">
              <p>Book</p>
              <hr className="w-2/4 border-none h-[1.0px] bg-gray-700 center hidden" />
            </NavLink>

            <NavLink to= "/about" className="hidden sm:block text-gray-700  font-medium transition text-sm lg:text-base ">
              <p>About</p>
              <hr className="w-2/4 border-none h-[1.0px] bg-gray-700 center hidden" />
            </NavLink>

            <NavLink to= "/contact" className="hidden sm:block text-gray-700  font-medium transition text-sm lg:text-base ">
              <p>Contact</p>
              <hr className="w-2/4 border-none h-[1.0px] bg-gray-700 center hidden" />
            </NavLink>
          </div>

          {/* Right side: Search, User icon, Cart, Mobile menu button */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">

            {/* Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="text-gray-600 hover:text-indigo-600 transition cursor-pointer">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Icon  */}
            <div className="group relative">
                    <img onClick={() => token ? null : navigate('/login')} src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" alt="" className="w-5 cursor-pointer"/>
                    
                    {/* Dropdown Menu */}
                    { token && 
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                          <p onClick={() => navigate('/profile')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer">My Profile</p>
                          <p onClick={() => navigate('/orders')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer">Orders</p>
                          <p onClick={logout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer">
                            Logout
                          </p>
                        </div>
                    </div>
                    }
            </div>

            {/* Cart Button with item count */}
            <Link to="/cart">
            <button className="text-gray-600 hover:text-indigo-600 transition relative cursor-pointer">
              <img src="https://cdn-icons-png.flaticon.com/128/3737/3737372.png" alt="" className='w-5 h-5 sm:w-6 sm:h-5 mt-1' />

              {/* Cart item count circle */}
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">{getCartCount()}</span>
            </button>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden text-gray-600 hover:text-indigo-600 transition relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white w-full absolute">
            <div className="px-4 py-2 space-y-1">

              {/* Mobile navigation links */}
              <NavLink onClick={() => setIsMenuOpen(false)} to= "/" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg font-medium transition">Home</NavLink>
              <NavLink onClick={() => setIsMenuOpen(false)} to= "/book" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg font-medium transition">Book</NavLink>
              <NavLink onClick={() => setIsMenuOpen(false)} to= "/about" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg font-medium transition">About</NavLink>
              <NavLink onClick={() => setIsMenuOpen(false)} to= "/contact" className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg font-medium transition">Contact</NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
