import axios from 'axios'
import {useEffect, useState} from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/book/list')
            if (response.data.success) {
                setList(response.data.books);
            }
            else {
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const removeBook = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/book/remove', {id}, {headers: {token}})

            if(response.data.success) {
                toast.success(response.data.message)
                await fetchList();  // again the new list after delete the data
            } else{
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    useEffect(() => {
        fetchList()
    }, [])

  return (
    <>
      <p className='mb-2'>All Books List</p>
      <div className='w-full overflow-x-auto'>
        {/* List Table Title */}
        <table className='w-full border-collapse border text-sm'>
    
            {/* Table Header */}
            <thead className='bg-blue-50'>
            <tr>
                <th className='border p-2 text-left'>Image</th>
                <th className='border p-2 text-left'>Name</th>
                <th className='border p-2 text-left'>Category</th>
                <th className='border p-2 text-left'>Price</th>
                <th className='border p-2 text-center'>Action</th>
            </tr>
            </thead>

            {/* Table Body */}
            <tbody>
            {list?.map((item, index) => (
                <tr key={index} className='hover:bg-blue-100'>
                
                <td className='border p-2 '>
                    <img src={backendUrl + `${item.image}`}  className='w-15 h-15 object-cover ' alt={item.name} />
                </td>

                <td className='border p-2'>{item.name}</td>

                <td className='border p-2'>{item.category}</td>

                <td className='border p-2'>
                    {currency}{item.price}
                </td>

                <td className='border p-2 text-center text-2xl cursor-pointer' onClick={() => removeBook(item._id)}>
                    &#128936;
                </td>

                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </>
  )
}

export default List

