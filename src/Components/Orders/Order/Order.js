import React from 'react';
import dateFormat from 'dateformat';

const Order = ({ order }) => {
    return (
        <div>
            <div style={{ maxWidth: "1300px" }} className='textColor d-flex justify-content-center'>
                <div className='fgColor m-2 d-flex justify-content-center mr-auto flex-wrap' style={{ border: "1px solid gray" }}>
                    <div className='m-2 d-flex align-items-center'>
                        <img className='img-fluid' style={{ borderRadius: "5px", maxWidth: "350px", height: "100%", aspectRatio: "16/9", objectFit: 'cover' }} src={order.item.image} alt='Item' />
                    </div>
                    <div className='m-2 p-2 b' style={{ borderRadius: "5px", maxWidth: "350px", minWidth: "350px", border: "1px solid gray" }}>
                        <h5><span style={{ fontWeight: 'bold' }}>Item Details :</span></h5>
                        <p><span style={{ fontWeight: 'bold' }}>ID : </span>{order.item.id}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Title : </span>{order.item.title}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Details : </span>{order.item.details}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Quantity : </span>{order.item.quantity} </p>
                        <p><span style={{ fontWeight: 'bold' }}>Total Payable : </span>{order.item.totalPayable} <span style={{ fontSize: "22px" }}>&#2547;</span></p>
                    </div>

                    <div className='m-2 p-2' style={{ borderRadius: "5px", maxWidth: "350px", minWidth: "350px", border: "1px solid gray" }}>
                        <h5><span style={{ fontWeight: 'bold' }}>Order Details :</span></h5>
                        <p><span style={{ fontWeight: 'bold' }}>ID : </span>{order.id}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Address : </span>{order.customer.deliveryAddress}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Phone : </span>{order.customer.phone}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Payment Type : </span>{order.customer.paymentType}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Order Time : </span>{dateFormat(order.orderTime, "dS mmmm yyyy, h:MM TT")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Order;