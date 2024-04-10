import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinkError from '../../ErrorHandling/LinkError';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl, categoriesUrl, extensionFormat, itemsUrl, ordersUrl } from '../../../Redux/dataBase';
import axios from 'axios';
import { orderItem, selectedItemFunc } from '../../../Redux/actionCreators';
import Spinner from '../../Spinner/Spinner';

const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem,
        itemLoading: state.itemLoading,
        orderData: state.orderData,
        items: state.items,
        userId: state.userId,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectedItemFunc: item => dispatch(selectedItemFunc(item)),
        orderItem: orderData => dispatch(orderItem(orderData)),
    }
};

class CheckOutForm extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery"
        },
        orderData: {},
        validationErr: ""
    }

    goBack = () => {
        window.history.back();
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
        });

        this.props.selectedItemFunc(null);
        this.props.orderItem({
            quantity: 1,
            totalPayable: 1
        });
    }

    inputChangerHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () => {
        let numberExp = /^(\+)?(88)?01[0-9]{9}$/;
        if (this.state.values.deliveryAddress !== "" && numberExp.test(this.state.values.phone)) {

            this.setState({
                isLoading: true,
                validationErr: ""
            })
            const order = {
                customer: this.state.values,
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

            axios.post(baseUrl + ordersUrl + extensionFormat + "?auth=" + this.props.token, order)
                .then(response => {
                    if (response.status === 200) {
                        const newItem = {
                            ...this.props.selectedItem,
                            remainAmount: this.props.selectedItem.remainAmount - this.props.orderData.quantity,
                            updatedTime: new Date()
                        }
                        axios.put(baseUrl + itemsUrl + "/" + this.props.selectedItem.id + extensionFormat, newItem)
                            .then(response => {
                                if (response.status === 200) {
                                    this.setState({
                                        isLoading: false,
                                        isModalOpen: true,
                                        modalMsg: "Order Placed Successfully And Item Has Been Updated!",
                                        values: {
                                            deliveryAddress: "",
                                            phone: "",
                                            paymentType: "Cash On Delivery"
                                        }
                                    })
                                }
                            })
                            .catch(err => {
                                this.setState({
                                    isLoading: false,
                                    isModalOpen: true,
                                    modalMsg: "Something Went Wrong! Order Placed, But Item Isn't Updated."
                                })
                            });
                    } else {
                        this.setState({
                            isLoading: false,
                            isModalOpen: true,
                            modalMsg: "Something Went Wrong! Order Again!"
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! Order Again!"
                    })
                });
        } else {
            this.setState({
                validationErr: "Please Type Delivery Address And Valid Phone Number!"
            })
        }
    }

    componentDidMount() {
        this.getItemIdFromHistory();

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
        } else {
            this.setSelectedItem();
        }
    }

    getItemIdFromHistory = () => {
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        const startIndex = urlParts.indexOf('items') + 1;
        const endIndex = urlParts.indexOf('checkout');
        const middlePart = urlParts.slice(startIndex, endIndex).join('/');
        this.setState({ middlePartOfUrl: middlePart });
        this.setState({ lastPartOfUrl: lastPart });
    }

    setSelectedItem = () => {
        this.props.items.forEach(item => {
            if (this.state.middlePartOfUrl === item.id) {
                this.props.selectedItemFunc(item);
            }
        });
    }

    render() {

        let form = (<div></div>);

        if (this.props.itemLoading === false) {
            if (this.props.selectedItem == null || this.props.orderData == null) {
                return (
                    <div><LinkError errText={"Item"} /></div>
                )
            } else {
                if (this.props.selectedItem.remainAmount === 0) {
                    form = (
                        <div className="d-flex justify-content-center">
                            <div>
                                <p className='text-danger' style={{ fontWeight: 'bold', fontSize: "25px" }}>Out Of Stock</p>
                                <Link to={itemsUrl}>
                                    <Button color='secondary' className='ms-1'>Browse Other Items</Button>
                                </Link>
                                <Button color='secondary' className='ms-2' onClick={this.goBack}>Back</Button>
                            </div>
                        </div>)
                } else {
                    form = (
                        <div className='textColor'>
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
                                        <form style={{
                                            padding: "5px"
                                        }}>
                                            <textarea className='border' style={{ width: "100%" }} name='deliveryAddress' value={this.state.values.deliveryAddress} placeholder='Your Address' onChange={(e) => this.inputChangerHandler(e)}>

                                            </textarea>
                                            <br />
                                            <br />
                                            <input name='phone' className='form-control' value={this.state.values.phone} placeholder='Phone (+8801xxxxxxxxx)' onChange={(e) => this.inputChangerHandler(e)} />
                                            <br />
                                            <select name="paymentType" className='form-control' value={this.state.values.paymentType} onChange={(e) => this.inputChangerHandler(e)} >
                                                <option value="Cash On Delivery">Cash On Delivery</option>
                                                <option value="Bkash">Bkash</option>
                                            </select>
                                            <br />
                                            <Button color='success' style={{ width: "155px" }} className='me-auto' onClick={this.submitHandler} disabled={this.props.purchaseble}>Place Order</Button>

                                            <Button style={{ width: "155px" }} onClick={this.goBack} color='secondary' className='ms-1'>Go Back</Button>

                                        </form>
                                        <div style={{ textAlign: "center", fontWeight: 'bold', color: "orange" }}>
                                            {this.state.validationErr}
                                        </div>

                                    </div>
                                </div >
                            </div >
                        </div >
                    )
                }
            }
        } else {
            form = <div><Spinner /></div>
        }

        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}

                <Modal isOpen={this.state.isModalOpen}>
                    <ModalBody>
                        <p style={{ textAlign: 'center' }}>{this.state.modalMsg}</p>
                        <div className='d-flex justify-content-center mr-auto flex-wrap'>
                            <Link to={ordersUrl}>
                                <Button onClick={this.closeModal} color='success' className='m-1' >Orders</Button>
                            </Link>
                            <Link to={itemsUrl}>
                                <Button onClick={this.closeModal} color='secondary' className='m-1' >Items</Button>
                            </Link>
                            <Link to={categoriesUrl}>
                                <Button onClick={this.closeModal} color='secondary' className='m-1' >Categories</Button>
                            </Link>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutForm);