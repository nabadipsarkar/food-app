import React, { useEffect, useState } from 'react'
import "./Orders.css"
import axios from 'axios';
import { toast } from "react-toastify"
import { assets } from "../../assets/assets"

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async (req, res) => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async(event, orderId)=>{
    const response = await axios.post(url+"/api/order/status",{orderId, status:event.target.value});
    if(response.data.success){
      await fetchOrders();
    }
  }

  const completeOrder = async(event, orderId)=>{
    const response = await axios.post(url+"/api/order/delete",{orderId});
    if(response.data.success){
      await fetchOrders();
      toast.success(response.data.message)
    }
  }


  useEffect(() => {
    fetchOrders();
  }, [])
  return (
    <div className='order'>
      <h2>All Orders</h2>
      <div className="order-list">
        {orders.map((order, idx) => (
          <div key={idx} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>{
                order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity
                  } else {
                    return item.name + ' x ' + item.quantity + ", "
                  }
                })
              }</p>
              <p className="order-item-name"><i className="fa-regular fa-user"></i> {order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            
            <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for Delivery </option>
              <option value=" Delivered">Delivered</option>
            </select>
            <i onClick={(event)=>completeOrder(event, order._id)} className="fa-solid fa-trash del-btn"></i>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
