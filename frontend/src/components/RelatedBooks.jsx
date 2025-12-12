import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import BookItem from "./BookItem";
import Title from "./Title";

function RelatedBooks({category}) {

    const { books } = useContext(ShopContext);
    const [ related, setRelated] = useState([]);

    useEffect(()=>{
        if(books.length > 0){
            let booksCopy = books.slice();
            booksCopy = booksCopy.filter((item) => category === item.category);

            setRelated(booksCopy.slice());
        }
    }, [books])

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Title text1= {'Related Books'} />
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:grid-cols-3'>
                {related.map((item, index) => (
                    <BookItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    )
}

export default RelatedBooks
