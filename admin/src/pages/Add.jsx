import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Add = ({token}) => {

    const [image, setImage] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [publisher, setPublisher] = useState('');
    const [author, setAuthor] = useState('');
    const [edition, setEdition] = useState('');
    const [category, setCategory] = useState('Biography / History');
    const [language, setLanguage] = useState('English');
    const [price, setPrice] = useState('')
    const [bestseller, setBestseller] = useState(false);
    
    const onSubmitHandler = async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData()

        formData.append("name", name)
        formData.append("description", description)
        formData.append("publisher", publisher)
        formData.append("author", author)
        formData.append("edition", edition)
        formData.append("category", category)
        formData.append("language", language)
        formData.append("price", price)
        formData.append("bestseller", bestseller)
        
        formData.append("image", image)

        const response = await axios.post(backendUrl + "/api/book/add", formData, {headers: {token} } )

        if (response) {
          toast.success(response.data.message)
          setName("")
          setDescription("")
          setPublisher("")
          setAuthor("")
          setEdition("")
          setImage(false)
          setPrice("")
        } else{
          toast.error(response.data.message)
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>


        <div className='flex gap-2'>
            <label htmlFor="image">
                <img className='w-25 px-1 py-1 border border-dotted' src={!image ? assets.upload_logo : URL.createObjectURL(image)} alt="" />
                <input onChange={(e) => setImage(e.target.files[0])} type="file"  id="image" hidden/>
            </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Book Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-3' type="text" placeholder='Type your book name' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-3' type="text" placeholder='Type your book description' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Publisher</p>
        <input onChange={(e) => setPublisher(e.target.value)} value={publisher} className='w-full max-w-[500px] px-3 py-3' type="text" placeholder='Type your book publisher' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        
        <div >
            <p className='mb-2'>Author</p>
            <input onChange={(e) => setAuthor(e.target.value)} value={author} className='w-full px-3 py-3' type="text" placeholder='Type your book author' required/>
        </div>

        <div >
            <p className='mb-2'>Edition</p>
            <input onChange={(e) => setEdition(e.target.value)} value={edition} className='w-full px-3 py-3' type="text" placeholder='Type your book edition' required/>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div >
            <p className='mb-2'>Category</p>
            <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                <option value="Biography / History">Biography / History</option>
                <option value="Science / Fantasy">Science / Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Romance">Romance</option>
            </select>
        </div>

        <div >
            <p className='mb-2'>Language</p>
            <select onChange={(e) => setLanguage(e.target.value)} className='w-full px-3 py-2'>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
            </select>
        </div>

        <div>
            <p className='mb-2'>Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[160px]' type="Number" placeholder='Price' required/>
        </div>

      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox"  id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white cursor-pointer'>ADD</button>

    </form>
  )
}

export default Add
