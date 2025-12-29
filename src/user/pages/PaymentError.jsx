import React from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'

function PaymentError() {
    return (
        <>
            <div>
                <Header />
                <div className='grid grid-cols-2 py-20 px-40 justify-centeritems-center'>
                    <div>
                        <h1 className='text-6xl text-red-700'>Sorry! YourPayment is Unsuccessfull ...</h1>
                        <p className='mt-5 mb-10'>We appologize fot theinconvience caused and appreciate your visit toBookStore .</p>
                        <Link to={"/UserDashboard"}><p className='text-2xl bg-blue-400 p-3 w-70 border border-blue-800 rounded-xl text-white font-bold hover:text-blue-500 hover:bg-white  ' >Explore More Books ...</p></Link>
                    </div>
                    <div>
                        <img src="https://png.pngtree.com/png-clipart/20250516/original/pngtree-payment-error-icon-png-image_20994702.png" className='w-3/4 ms-30' alt="" />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PaymentError