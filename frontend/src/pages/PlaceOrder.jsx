import { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

function PlaceOrder() {
    
    const [method, setMethod] = useState('cod');
    const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, books} = useContext(ShopContext)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({...data, [name]: value}))
    }
    
    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            
            let orderItems = []

            for (const itemId in cartItems) {
                const quantity = cartItems[itemId];

                if (quantity > 0) {
                    const itemInfo = structuredClone(
                        books.find(book => String(book._id) === String(itemId))
                    );

                    if (itemInfo) {
                        itemInfo.quantity = quantity;
                        orderItems.push(itemInfo);
                    }
                }
            }

            let orderData = {
                address : formData,
                items: orderItems,
                amount: getCartAmount() +  delivery_fee
            }

            switch(method) {

                // Api Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}})
                    console.log(response)
                    if(response.data.success){
                        setCartItems({})
                        navigate('/orders')
                    } else{
                        toast.error(response.data.message)
                    }
                    break;

                default: 
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left Side */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'Delivery Information'} /> 
                </div>
                <div className="flex gap-3">
                    <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-blue-300 px-3.5 py-1.5 rounded w-full' type="text" placeholder='First Name' />
                    <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-blue-300 px-3.5 py-1.5 rounded w-full' type="text" placeholder='Last Name' />
                </div>
                <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-blue-300 px-3.5 py-1.5 rounded w-full' type="email" placeholder='Email' />
                <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-blue-300 px-3.5 py-1.5 rounded w-full' type="text" placeholder='Address' />
                <div className="flex gap-3">
                    <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-blue-300 px-3.5 py-1.5 rounded w-full' type="text" placeholder="City" />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-blue-300 px-3.5 py-1.5 rounded w-full' type="text" placeholder="State" />
                </div>
                <div className="flex gap-3">
                    <input onChange={onChangeHandler} name='pincode' value={formData.pincode} className='border border-blue-300 px-3.5 py-1.5 rounded w-full' type="number" placeholder="Pincode" />
                    <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-blue-300 px-3.5 py-1.5 rounded w-full' type="text" placeholder="Country" />
                </div>
                <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-blue-300 px-3.5 py-1.5 rounded w-full' type="number" placeholder='Phone ' />

            </div>

            {/* Right Side */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>
                <div className="mt-12">
                    <Title  text1={'Payment Method'} />
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border border-gray-300 p-2 px-3  cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border border-blue-300 rounded-full ${method === 'stripe' ? 'bg-blue-300' : ''}`}></p>
                            <img className='h-8 mx-5 ' src="https://cdn-icons-png.flaticon.com/128/5968/5968382.png" alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border border-gray-300 p-2 px-3  cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border border-blue-300 rounded-full ${method === 'razorpay' ? 'bg-blue-300' : ''}`}></p>
                            <img className='h-8 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQm61y_1zYU15YuP51hPr52IgbM35xwCc3YOyl0L4Jw5xkdHeWQ1If78_nF1l6_pUIDI&usqp=CAU" alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border border-gray-300 p-2 px-3  cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border border-blue-300 rounded-full ${method === 'cod' ? 'bg-blue-300' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>

                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit'  className='bg-black text-white px-16 py-3 text-sm cursor-pointer'>Place Order</button>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default PlaceOrder
