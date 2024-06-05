import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/Main/CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

const Subcription = () => {
   
  
    console.log(stripePromise);

 
    return (
        <div>

        <div className='p-10 m-5 rounded-lg text-center bg-blue-500'>
            <h2 className='font-bold text-5xl'>Checkout page</h2>
        </div>

        <div className='section-container py-28'>
            <Elements stripe={stripePromise}>
                <CheckoutForm  />
            </Elements>
        </div>


        



    </div>
    );
};

export default Subcription;