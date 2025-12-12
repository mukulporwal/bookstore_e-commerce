import React from 'react'

function Hero() {
    return (
        <div className="flex flex-col sm:flex-row">
            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 border border-blue-400">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2 px-2">
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                        <p className="text-md md:text-base">Stories begin quietly</p>
                    </div>
                    <h1 className='prata-regular text-xl sm:py-1 px-2 lg:text-2xl leading-relaxed'>But become storms inside your mind</h1>
                    {/* <div claassName="flex items-center gap-2"> */}
                        <p className="font-italic text-md md:text-base px-2">And stay with you forever</p>
                    {/* </div> */}
                </div>
            </div>

            {/* Hero Right Side */}
            <img src="https://media.istockphoto.com/id/1354989842/photo/banner-with-books-business-and-education-background-back-to-school-concept.jpg?s=612x612&w=0&k=20&c=HI-geEWN-ugepkQ0MQ785qnLxSKk1TsRtUY1SfWbp6g=" alt="" className='w-full sm:w-1/2 ' />
        </div>
    )
}

export default Hero
