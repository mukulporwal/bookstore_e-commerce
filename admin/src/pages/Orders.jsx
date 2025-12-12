import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import { backendUrl, currency } from "../App"
import { toast } from "react-toastify"
import { assets } from "../assets/assets"

function Orders({token}) {

    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {

        if(!token){
            return null;
        }

        try {
            
            const response = await axios.post(backendUrl + '/api/order/list', {}, {headers:{token}})
            if(response.data.success){
                setOrders(response.data.orders)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const statusHandler = async (event, orderId) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/order/status', {orderId, status : event.target.value}, {headers: {token}})
            if (response.data.success){
                await fetchAllOrders()
            }


        } catch (error) {
           console.log(error)
           toast.error(response.data.message) 
        }
    }

    useEffect(() => {
        fetchAllOrders();
    },[token])

    return (
        <div className="p-2">
            <p className='mb-2'>All Orders List</p>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border text-sm">
                <thead className="bg-blue-50">
                    <tr>
                    <th className="p-3 border">Image</th>
                    <th className="p-3 border">Items</th>
                    <th className="p-3 border">Customer</th>
                    <th className="p-3 border">Address</th>
                    <th className="p-3 border">Phone</th>
                    <th className="p-3 border">Details</th>
                    <th className="p-3 border">Amount</th>
                    <th className="p-3 border">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                    <tr key={index} className="border-t">
                        <td className="p-3 border text-center">
                        <img
                            className="w-10 mx-auto"
                            src={assets.parcel}
                            alt="Parcel"
                        />
                        </td>

                        {/* Items */}
                        <td className="p-3 border">
                        {order.items && order.items.length > 0 ? (
                            order.items.map((item, i) => (
                            <p key={i}>
                                {item.name} x {item.quantity}{" "}
                                <span>{item.size}</span>
                                {i < order.items.length - 1 && ","}
                            </p>
                            ))
                        ) : (
                            <p>No items</p>
                        )}
                        </td>

                        {/* Customer */}
                        <td className="p-3 border font-medium">
                        {order.address.firstName}  {order.address.lastName}
                        </td>

                        {/* Address */}
                        <td className="p-3 border">
                        <p>{order.address.street},
                            {order.address.city}, {order.address.state},{" "}
                            {order.address.pincode}
                        </p>
                        </td>

                        <td className="p-3 border">{order.address.phone}</td>

                        {/* Details */}
                        <td className="p-3 border">
                        <p>Items: {order.items.length}</p>
                        <p>Method: {order.paymentMethod}</p>
                        <p>Payment: {order.payment ? "Paid" : "Not Paid"}</p>
                        <p>Date: 
                            {new Date(order.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            })}
                        </p>
                        </td>

                        {/* Amount */}
                        <td className="p-3 border font-semibold">
                        {currency}
                        {order.amount}
                        </td>

                        {/* Status Dropdown */}
                        <td className="p-3 border">
                        <select
                            className="p-2 border rounded w-full" 
                            onChange={(event) =>statusHandler(event, order._id)}
                            value={order.status}
                        >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Order Shipped">Order Shipped</option>
                            <option value="Order Delivered">Order Delivered</option>
                            <option value="Out for delivery">Out for delivery</option>
                        </select>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

    )
}

export default Orders
