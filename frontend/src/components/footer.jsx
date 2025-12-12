
function Footer() {
    return (
       <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
                <div>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20 30 Q 50 10, 80 30 L 70 40 Q 50 25, 30 40 Z" />
                    <path d="M20 50 Q 50 70, 80 50 L 70 60 Q 50 75, 30 60 Z" />
                    </svg>

                    <p className='w-full  md:2/3 text-gray-600 text-sm'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque illum <br /> numquam tempore atque nulla cupiditate.
                        Esse earum, sequi facere <br /> officiis deserunt  delectus repellendus cupiditate commodi quod <br /> sapiente,  nemo, quis atque.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5 '>Brand Story</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5 '>Get in Touch</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91 968-888-1111</li>
                        <li>bookstore@gmail.com</li>
                    </ul>
                </div>

            </div>

            <div>
                <hr className='text-blue-300' />
                <p className='py-5 text-sm text-center'>Copyright 2025@ - Mukul Porwal</p>
            </div>
       </div> 
    )
}

export default Footer
