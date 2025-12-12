import React from 'react'
import Title from '../components/Title'

function About() {
    return (
        <div>
            <div className="text-2xl text-center pt-8  border-t">
                <Title text1={'About Us'}/>
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-16" >
                <img className='w-full md:max-w-[450px]' src="https://media.istockphoto.com/id/1354989842/photo/banner-with-books-business-and-education-background-back-to-school-concept.jpg?s=612x612&w=0&k=20&c=HI-geEWN-ugepkQ0MQ785qnLxSKk1TsRtUY1SfWbp6g=" alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-blue-500">
                    <p>Welcome to Bookstore, your one-stop online destination for books across every genre and interest. 
                        We believe that reading has the power to inspire, educate, and transform lives — and our mission is to make quality 
                        books accessible to everyone, everywhere.
                    </p>
                    <p>We offer a curated collection ranging from best-selling novels, academic textbooks, 
                        and self-help guides to children’s books, competitive exam materials, and rare titles.
                    </p>
                    <b className='text-gray-700 prata-regular'>Our Mission</b>
                    <p>Our mission is to deliver a seamless online book-buying experience with diverse collections and reliable service.</p>
                </div>
            </div>
        </div>
    )
}

export default About
