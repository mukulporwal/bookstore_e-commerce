import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

function Cart() {

    const { books, currency, cartItems, updateQuantity, navigate, backendUrl} = useContext(ShopContext)

    const [ cartData, setCartData] = useState([]);

    useEffect(() => {

        if(books.length > 0){
            const tempData = []
            for(const itemId in cartItems){
                tempData.push({
                    _id: itemId,
                    quantity: cartItems[itemId]
                })
            }
            setCartData(tempData);
        }

    }, [cartItems, books])

    return (
        <div className='border-t pt-14'>

            <div className="text-2xl mb-3">
                <Title text1={'Your Cart'} />
            </div>

            <div>
                {
                    cartData.map((item, index) => {

                        const bookData = books.find((book) => book._id === item._id);

                        return (
                            <div key={index} className='py-4 border-t border-b text-blue-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 '>
                                <div className='flex items-start gap-6'>
                                    <img className='w-16 sm:w-20' src={backendUrl + `${bookData.image}`} alt="" />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{bookData.name}</p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>{currency}{bookData.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                                <img onClick={() => updateQuantity(item._id,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src="https://cdn-icons-png.flaticon.com/128/13617/13617213.png" alt="" />
                            </div>
                        )
                    })
                }
            </div>

            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className="w-full text-end">
                        <button onClick={() => navigate('/placeOrder')} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'>Proceed to Checkout</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart
