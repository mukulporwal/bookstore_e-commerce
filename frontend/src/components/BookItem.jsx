import {useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

function BookItem({id, image, name, price}) {

    const {currency, backendUrl} = useContext(ShopContext);

    return (
        <Link className='text-blue-600 cursor-pointer' to={`/book/${id}`}>
            <div className='overflow-hidden'>
                <img src={backendUrl + `${image}`} alt="" className='hover:scale-110 transition ease-in-out w-50 h-80' />
            </div>
            <p className='pt-3 pb-1 text-md w-50'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    )
}

export default BookItem
// {backendUrl + `${item.image}`}