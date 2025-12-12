import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import {ChevronRight, ChevronDown} from 'lucide-react';
import RelatedBooks from '../components/RelatedBooks';


function Product() {

    const {bookId} = useParams();
    const { books, currency, binding, addToCart, backendUrl } = useContext(ShopContext);
    const [bookData, setBookData] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const fetchProductData = async () => {

        books.map((item) => {
            if(item._id === bookId){
                setBookData(item)
                // console.log(item);
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData();
    }, [bookId])

    return bookData ? (
       <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Book Data */}
            <div className="grid lg:grid-cols-2 gap-8 p-8">
                { /* Book Image*/ }
                <div className="flex-1 ">
                    <div className='flex items-center justify-center '>
                        <img src={backendUrl + `${bookData.image}`} alt="" className='w-full max-w-md rounded-lg shadow-xl' style={{ display: "block", margin: "0 auto" }}/>
                    </div>
                </div>

                {/* Book Details */}
                <div className="flex flex-col ">
                    <h1 className="font-medium text-2xl mt-2 prata-regular"  >{bookData.name}</h1>
                    <p className='mt-4 text-xl font-weight-[400px] '>{currency}{bookData.price}</p>
                    <p className='mt-4 text-xl '>Binding : {binding}</p>
                    <div className=' mt-5 font-weight-[300px] text-xl mt-2 prata-regular'>
                        Description
                        <p className='mt-2 text-blue-500 text-[17px] md: w-4/5'>{bookData.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-2 my-8">
                        <button onClick={() => addToCart(bookData._id)} className='bg-black text-white px-5 py-3 text-sm active:bg-gray-700 cursor-pointer'>Add to Cart</button>
                    </div>

                    <hr className="mt-2 text-gray-500 " />
                    <div className="text-[17px] text-gray-500 mt-5 flex flex-col gap-1">
                        <p>Gentle Used </p>
                        <p>Cash on delivery available</p>
                        <p>Easy 7 days returns and exchanges</p>
                    </div>

                    <div>
                        <button
                        onClick={() => setDetailsOpen(!detailsOpen)}
                        className="w-full  flex items-center justify-between  transition"
                        >
                        <h2 className="mt-5 font-weight-[300px] text-xl mt-2 prata-regular">Other Details</h2>
                        {detailsOpen ? (
                            <ChevronDown size={24} className="text-gray-600" />
                        ) : (
                            <ChevronRight size={24} className="text-gray-600" />
                        )}
                        </button>
                        {detailsOpen && (
                            <div className="px-8 pb-6 pt-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border-b border-gray-200 pb-3">
                                    <span className="font-semibold text-gray-900">Author:</span>
                                    <span className="ml-2 text-blue-700">{bookData.author}</span>
                                </div>
                                <div className="border-b border-gray-200 pb-3">
                                    <span className="font-semibold text-gray-900">Publisher:</span>
                                    <span className="ml-2 text-blue-700">{bookData.publisher}</span>
                                </div>
                                <div className="border-b border-gray-200 pb-3">
                                    <span className="font-semibold text-gray-900">Language:</span>
                                    <span className="ml-2 text-blue-700">{bookData.language}</span>
                                </div>
                                <div className="border-b border-gray-200 pb-3">
                                    <span className="font-semibold text-gray-900">Edition:</span>
                                    <span className="ml-2 text-blue-700">Kindle Edition</span>
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
            
                </div>

            </div>

            {/* Related Books */}
            <RelatedBooks category={bookData.category} />
       </div> 
    ) : <div className='opacity-0'></div>
}

export default Product


