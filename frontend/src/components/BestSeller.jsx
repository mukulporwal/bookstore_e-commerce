import { useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import BookItem from './BookItem';

function BestSeller() {

    const {books} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestBook = books.filter((item) => (item.bestseller));
        setBestSeller(bestBook.slice(0,10));
    }, [books])

    return (
        <div className='my-10'>
            <div className="text-center py-8 text-3xl">
                <Title text1={'BestSeller Book'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <BookItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
