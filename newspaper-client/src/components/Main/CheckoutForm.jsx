import React, { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axiosSecure from '../../api';
import useAuth from '../../hooks/useAuth';
import { updateUser } from '../../api/Auth';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im'

const CheckoutForm = () => {
    const { user } = useAuth()

    const [userData,refetch,isLoading] = useUser();
     const [price,setPrice] = useState(100);
   
      let [miliSec,setMilisec] = useState(60000);
     
     const handlePeriod = (e) =>{
       setPrice(parseInt(e)*100)
       if(parseInt(e) === 1 ){
         setMilisec(60000)
       }
       else{
        setMilisec(parseInt(e)*86400000);
       }
     }

     console.log(miliSec);
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState("");


  
    useEffect(() => {
        if (typeof price !== 'number' || price < 1) {
            console.log('price is not a number')
            return;
        }
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [price])

    const handleSubmit = async (event) => {

        console.log('hello');
        event.preventDefault();
        const form = event.target;
    
        
        
        const updatedUserData = {
            isPremium: true,
            expiryDate : Date.now() + miliSec
        }

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // create card element
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            toast.error(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'unknown'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError)
        }
        if (paymentIntent.status === 'succeeded') {
        
          

            // payment info data 
    

            try {
                // save payment information to the server
                await updateUser(userData?._id,updatedUserData)
                const text = `Payment Successful! ${paymentIntent.id}`
                toast.success(text)
            } catch (err) {
                console.log(err)
                toast.error(err.message)
            } finally {
                setProcessing(false)
            }

            setProcessing(false)


        }
    }

   

    return (
        <div className='mx-auto w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 text-center px-4 py-8'>
        <h3 className='text-lg  font-semibold'>Process Your Payments</h3>

        <form onSubmit={handleSubmit}  className='space-y-3'>
            <div className='space-y-1 text-sm'>
                <input
                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                    name='name'
                    id='name'
                    type='text'
                    placeholder='Name'
                    defaultValue={userData?.name}
                    required
                />
            </div>
            <div className="space-y-1 text-sm">
          <select
            required
            className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
            name="publisher" onChange={(e)=>handlePeriod(e.target.value)}
          >
            
             <option value="1">1 Min</option>
             <option value="5">5 Day</option>
             <option value="10">10 Day</option>
          </select>
        </div>
            <div className='space-y-1 text-sm'>
                <p>Price : ${price}</p>
            </div>
           
            <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button type="submit" disabled={!stripe || !clientSecret || processing} className='btn btn-sm bg-orange-200'>
                        {processing ? (
                            <ImSpinner9 className='m-auto animate-spin' size={24} />
                        ) : (
                            `Pay ${price}$`
                        )}
                    </button>
           
        </form>
    </div>
    );
};

export default CheckoutForm;