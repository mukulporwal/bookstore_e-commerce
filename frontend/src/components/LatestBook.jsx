import {useContext, useState, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import BookItem from './BookItem';

function LatestBook() {

    const { books } = useContext(ShopContext);
    const [latestBooks, setLastestBooks] = useState([]);

    useEffect(() => {
        setLastestBooks(books.slice(0,10));
    }, [books])

    // console.log(books);

    return (
        <div className='my-10'>
            <div className="text-center py-8 text-3xl">
                <Title text1={'Latest Book'}/>
            </div>
        

            {/* Render products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestBooks.map((item, index) => (
                        <BookItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                    ))
                }
            </div>
        </div>
    )
}

export default LatestBook
