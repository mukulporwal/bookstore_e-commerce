import { createContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import {toast} from'react-toastify'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = 'Rs. ';
    const delivery_fee = 10;
    const binding = 'Paperback';
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [books, setBooks] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token") || "")
    const navigate = useNavigate();

    const addToCart = async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        if(token){
            try{
                await axios.post(
                    `${backendUrl}/api/cart/add`, 
                    {itemId}, 
                    {headers: {token} } 
                );
            }
            catch(error) {
                // rollback state
                setCartItems(prev => ({
                    ...prev,
                    [itemId]: prev[itemId] - 1
                }));

                console.log(error)
                toast.error(error.message)
            }
        }
    };
    

    const getCartCount = () => {
        let totalCount = 0;
            for (const itemId in cartItems) {
                totalCount += cartItems[itemId];
            }
        return totalCount;
    };

    const updateQuantity = async (itemId, quantity) => {


        setCartItems(prev => {
            const newCart = { ...prev };

            if (quantity <= 0) {
                delete newCart[itemId];
            } else {
                newCart[itemId] = quantity;
            }

            return newCart;
        });

        if(token){
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    {itemId, quantity},
                    {headers: {token}}
                );
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    };

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {

            const quantity = cartItems[itemId];

            if (quantity > 0) {
                const itemInfo = books.find(
                    (book) => String(book._id) === String(itemId)
                );

                if (itemInfo) {
                    totalAmount += itemInfo.price * quantity;
                }
            }
        }

        return totalAmount;
    }


    const getBooksData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/book/list')
            if(response.data.success){
                setBooks(response.data.books)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`, {} , {headers: {token}}
            )
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const loginUser = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };



    useEffect( () => {
        getBooksData()
    },[])
    
    useEffect( () => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    })
    

    const value ={
        books, currency, delivery_fee, binding,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate,
        backendUrl, setToken, token, loginUser
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
};
// export { ShopContext };
export default ShopContextProvider;