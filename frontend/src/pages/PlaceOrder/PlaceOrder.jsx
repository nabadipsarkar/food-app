import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function PlaceOrder() {

    const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        zipCode: "",
        phone: "",
        country: "",
        state: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItem[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItem[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2
        }

        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        console.log(response)
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("Please log in");
        }
        // const navigate = useNavigate();
        // useEffect(()=>{
        //     if(!token || getTotalCartAmount() === 0){
        //         navigate("/cart")
        //     }
        // },[token])
    }

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input required onChange={onChangeHandler} name="firstName" value={data.firstName} type='text' placeholder='First Name' />
                    <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type='text' placeholder='Last Name' />
                </div>

                <input required onChange={onChangeHandler} name="email" value={data.email} type='email' placeholder='Email Address' />
                <input required onChange={onChangeHandler} name="street" value={data.street} type='text' placeholder='Street' />

                <div className="multi-field">
                    <input required onChange={onChangeHandler} name="city" value={data.city} type='text' placeholder='City' />
                    <input required onChange={onChangeHandler} name="state" value={data.state} type='text' placeholder='State' />
                </div>
                <div className="multi-field">
                    <input required onChange={onChangeHandler} name="zipCode" value={data.zipCode} type='text' placeholder='Zip code' />
                    <input required onChange={onChangeHandler} name="country" value={data.country} type='text' placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name="phone" value={data.phone} type='text' placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>devivary fees</p>
                            <p>${2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}