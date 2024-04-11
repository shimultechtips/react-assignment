import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkError from '../../ErrorHandling/LinkError';
import { Button, Alert } from 'reactstrap';
import { checkOut, orderItem, selectedItemFunc } from '../../../Redux/actionCreators';
import { Formik } from 'formik';
import Spinner from '../../Spinner/Spinner';

const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem,
        orderData: state.orderData,
        items: state.items,
        userId: state.userId,
        token: state.token,
        checkoutSuccess: state.checkoutSuccess,
        checkoutLoading: state.checkoutLoading,
        checkoutFailed: state.checkoutFailed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectedItemFunc: item => dispatch(selectedItemFunc(item)),
        orderItem: orderData => dispatch(orderItem(orderData)),
        checkOut: (order, token, selectedItem) => dispatch(checkOut(order, token, selectedItem))
    }
};

class CheckOutForm extends Component {
    state = {
        orderData: {}
    }

    goBack = () => {
        window.history.back();
    }

    componentDidMount() {

        if (this.props.selectedItem != null) {
            if (this.props.orderData.totalPayable === 1) {
                this.setState({
                    orderData: {
                        quantity: this.props.orderData.quantity,
                        totalPayable: this.props.selectedItem.price,
                        itemId: this.props.selectedItem.id
                    }
                });
            }
            else if (this.props.selectedItem.id === this.props.orderData.itemId) {
                this.setState({
                    orderData: {
                        quantity: this.props.orderData.quantity,
                        totalPayable: this.props.orderData.totalPayable,
                        itemId: this.props.selectedItem.id
                    }
                });
            }
            else {
                this.setState({
                    orderData: {
                        quantity: 1,
                        totalPayable: this.props.selectedItem.price,
                        itemId: this.props.selectedItem.id
                    }
                });
            }
        }
    }

    componentDidUpdate() {
        if (this.props.selectedItem != null) {
            const { orderData } = this.state;
            this.props.orderItem(orderData);

            if (Object.keys(this.state.orderData).length === 0) {
                this.setState({
                    orderData: {
                        quantity: 1,
                        totalPayable: this.props.selectedItem.price,
                        itemId: this.props.selectedItem.id
                    }
                })
            }
        }
    }


    render() {

        document.title = "Checkout - React Assignment";

        let checkout = null;
        let msg = null;
        if (this.props.checkoutFailed != null) {
            msg = <Alert color="danger">{this.props.checkoutFailed}</Alert>
        }

        if (this.props.checkoutSuccess != null) {
            msg = <Alert color="success">{this.props.checkoutSuccess}</Alert>
        }

        let form = (<Formik
            initialValues={{
                deliveryAddress: "",
                phone: "",
                paymentType: "Cash On Delivery"
            }}
            onSubmit={
                (values, { resetForm }) => {
                    const order = {
                        customer: {
                            deliveryAddress: values.deliveryAddress,
                            phone: values.phone,
                            paymentType: values.paymentType
                        },
                        orderTime: new Date(),
                        item: {
                            id: this.props.selectedItem.id,
                            categoryName: this.props.selectedItem.categoryName,
                            title: this.props.selectedItem.title,
                            image: this.props.selectedItem.image,
                            details: this.props.selectedItem.details,
                            totalPayable: this.props.orderData.totalPayable,
                            quantity: this.props.orderData.quantity,
                        },
                        userId: this.props.userId,
                    }

                    this.props.checkOut(order, this.props.token, this.props.selectedItem);
                    resetForm();
                }}

            validate={(values) => {
                const errors = {};

                if (!values.deliveryAddress) {
                    errors.deliveryAddress = "Required"
                } else if (values.deliveryAddress.length < 10) {
                    errors.deliveryAddress = "Must Be 10 Or More Characters!"
                }

                if (!values.phone) {
                    errors.phone = "Required"
                } else if (values.phone.length < 11) {
                    errors.phone = "Must Be 11 Or More Characters!"
                } else if (!/^(\+)?(88)?01[0-9]{9}$/.test(values.phone)) {
                    errors.phone = "Invalid Phone Number!"
                }

                if (!values.paymentType) {
                    errors.paymentType = "Required"
                }

                return errors;
            }}
        >
            {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                <div >
                    <form onSubmit={handleSubmit}>
                        <textarea className='border p-2' style={{ width: "100%", borderRadius: "5px" }} name='deliveryAddress' placeholder='Enter Your Address!' value={values.deliveryAddress} onChange={handleChange} onBlur={handleBlur} />
                        <br />
                        {touched.deliveryAddress && errors.deliveryAddress ? <span style={{ color: "red" }}>{errors.deliveryAddress}</span> : null}
                        <br />
                        <input className='border p-2' style={{ width: "100%", borderRadius: "5px" }} name='phone' placeholder='Enter Your Phone Number!' value={values.phone} onChange={handleChange} onBlur={handleBlur}
                        />
                        <br />
                        {touched.phone && errors.phone ? <span style={{ color: "red" }}>{errors.phone}</span> : null}
                        <br />

                        <select name="paymentType" className='form-control'>
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Bkash">Bkash</option>
                        </select>
                        <br />
                        <Button style={{ width: "150px" }} type='submit' className='btn btn-success'>Place Order</Button>
                        <Button style={{ width: "155px" }} type='button' onClick={this.goBack} color='secondary' className='ms-1'>Go Back</Button>
                    </form>
                </div>
            )}
        </Formik>)

        if (this.props.selectedItem == null || this.props.orderData == null) {
            return (
                <div><LinkError errText={"Item"} /></div>
            )
        } else {
            if (this.props.checkoutLoading) {
                checkout = <Spinner />
            } else {
                checkout = (
                    <div className='textColor'>
                        <div style={{ maxWidth: "1300px" }} className='d-flex justify-content-center'>
                            {msg}
                        </div>

                        <h4 style={{ textAlign: "center", margin: "5px" }}>Item Is Ready To Place Order :</h4>
                        <div style={{ maxWidth: "1300px" }} className='d-flex justify-content-center'>
                            <div className='fgColor m-2 d-flex justify-content-center mr-auto flex-wrap' style={{ border: "1px solid gray" }}>
                                <div className='m-2 d-flex align-items-center'>
                                    <img alt='Item' className='img-fluid' style={{ maxWidth: "350px", height: "100%", aspectRatio: "16/9", objectFit: 'cover', borderRadius: "5px" }} src={this.props.selectedItem.image} />
                                </div>
                                <div className='m-2 p-2' style={{ borderRadius: "5px", maxWidth: "350px", minWidth: "350px", border: "1px solid gray" }}>
                                    <h5><span style={{ fontWeight: 'bold' }}>Title : </span>{this.props.selectedItem.title}</h5>
                                    <p><span style={{ fontWeight: 'bold' }}>ID : </span>{this.props.selectedItem.id}</p>
                                    <p><span style={{ fontWeight: 'bold' }}>Details : </span>{this.props.selectedItem.details}</p>
                                    <p><span style={{ fontWeight: 'bold' }}>Quantity : </span> <span className='text-success' style={{ fontWeight: "bold" }}> {this.props.orderData.quantity} </span></p>
                                    <p><span style={{ fontWeight: 'bold' }}>Total Price : </span> <span className='text-success' style={{ fontWeight: "bold" }}> {this.props.orderData.totalPayable} </span> <span style={{ fontSize: "22px" }}>&#2547;</span></p>
                                    <p className="bg-warning" style={{ fontWeight: "bold", textAlign: "center", padding: "5px", border: "1px solid gray", borderRadius: "5px" }}>Before Placing Order, Please Recheck The Quantity And Total Price!</p>
                                </div >
                                <div className='m-2 p-2' style={{ borderRadius: "5px", maxWidth: "350px", minWidth: "350px", border: "1px solid gray" }}>

                                    {form}
                                </div>
                            </div >
                        </div >
                    </div >
                )
            }

        }

        return (
            <div>
                {checkout}

            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutForm);