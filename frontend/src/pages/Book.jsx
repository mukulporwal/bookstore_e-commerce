import {useContext, useEffect, useState} from 'react';
import {ShopContext}  from '../context/ShopContext';
import Title from '../components/Title';
import BookItem from '../components/BookItem';

function Book() {

    const {books, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterBooks, setFilterBooks] = useState([]);
    const [category, setCategory] = useState([]);
    const [sortType, setSortType] = useState('sort')

    const toggleCategory = (e) => {
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let booksCopy = books.slice();
        
        if(showSearch && search) {
            booksCopy = booksCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0){
            booksCopy = booksCopy.filter(item => category.includes(item.category))
        }
        setFilterBooks(booksCopy)
    }

    const sortBook = () => {
        let fpCopy = filterBooks.slice();
        switch (sortType){
            case 'low-high':
                setFilterBooks(fpCopy.sort((a,b) => (a.price - b.price)));
                break;

            case 'high-low':
                setFilterBooks(fpCopy.sort((a,b) => (b.price - a.price)));
                break;
            
            default:
                applyFilter();
                break;
        }
    }

    

    useEffect(() => {
        applyFilter();
    }, [category, search, showSearch, books])

    useEffect(() => {
        sortBook();
    }, [sortType])

    // useEffect(()=>{
    //     console.log(category)
    // }, [category])

    return (
        <div>
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-blue-400'>

            {/* Filter Options */}
            <div className="min-w-60">
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src="https://cdn-icons-png.flaticon.com/128/892/892498.png" width="10px"  alt="" />
                </p>
                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className="flex gap-2" >
                            <input className='w-3' type="checkbox" value={"Biography / History"} onChange={toggleCategory} /> Biography / History
                        </p>
                        <p className="flex gap-2" >
                            <input className='w-3' type="checkbox" value={'Science / Fantasy'} onChange={toggleCategory}  /> Science / Fantasy
                        </p>
                        <p className="flex gap-2" >
                            <input className='w-3' type="checkbox" value={'Mystery'} onChange={toggleCategory} /> Mystery
                        </p>
                        <p className="flex gap-2" >
                            <input className='w-3' type="checkbox" value={'Historical Fiction'} onChange={toggleCategory} /> Historical Fiction
                        </p>
                        <p className="flex gap-2" >
                            <input className='w-3' type="checkbox" value={'Romance'} onChange={toggleCategory} /> Romance
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'All Books'} />
                    {/* Book Sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-200 text-sm px-2">
                        <option value="sort">Sort by--</option>
                        <option value="low-high">Low to High</option>
                        <option value="high-low">High to Low</option>
                    </select>
                </div>

                {/* Map Books */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterBooks.map((item, index) => (
                            <BookItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    }
                </div>
            </div>

        </div>
        </div>
        
    )
}

export default Book
