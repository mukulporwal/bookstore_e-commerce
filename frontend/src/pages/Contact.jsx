import Title from '../components/Title';

function Contact() {
    return (
        <div>

            <div className="text-center text-2xl pt-10 border-t">
                <Title text1={'Contact Us'} />
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-24'>
                <img className='w-full md:max-w-[400px]' src="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym9va3N0b3JlfGVufDB8fDB8fHww" alt="" />
                <div className='flex flex-col justify-center items-start gap-4'>
                    <p className='font-semibold text-xl text-gray-700 prata-regular'>Our Store:</p>
                    <p className='text-blue-500'>B-001, Main Road, Shivaji Nagar, Baran, Rajasthan</p>
                    <p className='font-semibold text-xl text-gray-700 prata-regular'>Call Us:</p>
                    <p className='text-blue-500'>+91-999-999-9999</p>
                    <p className='font-semibold text-xl text-gray-700 prata-regular'>E-mail:</p>
                    <p className='text-blue-500'>book@gmail.com</p>
                </div>
            </div>

        </div>
    )
}

export default Contact
