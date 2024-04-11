import React, { Component } from 'react';
import Comments from '../Comments/Comments';
import LinkError from '../../ErrorHandling/LinkError';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderItem, selectedItemFunc } from '../../../Redux/actionCreators';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { checkoutUrl, itemsUrl } from '../../../Redux/dataBase';
import Spinner from '../../Spinner/Spinner';
import dateFormat from "dateformat";


const mapStateToProps = state => {
    return {
        comments: state.comments,
        selectedItem: state.selectedItem,
        orderData: state.orderData,
        itemLoading: state.itemLoading,
        items: state.items,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderItem: orderData => dispatch(orderItem(orderData)),
        selectedItemFunc: item => dispatch(selectedItemFunc(item))
    }
}

class ItemDetails extends Component {
    state = {
        orderData: {}
    }

    goBack = () => {
        window.history.back();
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    viewImageFullScreen = () => {
        this.setState({
            isModalOpen: true
        })
    }

    inputChangerHandler = (e) => {
        this.setState({
            values: {
                ...this.state.orderData,
                [e.target.name]: e.target.value,
            }
        });
    }

    submitHandler = () => {
        this.setState({
            isLoading: true,
        });
    }

    increaseQuantity = () => {
        if (this.state.orderData.quantity < this.props.selectedItem.remainAmount) {
            this.setState({
                orderData: {
                    quantity: this.state.orderData.quantity + 1,
                    totalPayable: (this.state.orderData.quantity + 1) * this.props.selectedItem.price,
                    itemId: this.props.selectedItem.id
                }
            });
        }
    }

    decreaseQuantity = () => {
        if (this.state.orderData.quantity > 1) {
            this.setState({
                orderData: {
                    quantity: this.state.orderData.quantity - 1,
                    totalPayable: (this.state.orderData.quantity - 1) * this.props.selectedItem.price,
                    itemId: this.props.selectedItem.id
                }
            });
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
            if (this.state.lastPartOfUrl === item.id) {
                this.props.selectedItemFunc(item);
            }
        });
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
            if (this.props.token != null) {
                if (this.props.selectedItem.remainAmount !== 0) {
                    if (this.state.orderData.quantity <= 1) {
                        document.getElementById("decreaseButton").classList.add("disabled");
                    }
                    if (this.state.orderData.quantity > 1) {
                        document.getElementById("decreaseButton").classList.remove("disabled");
                    }
                    if (this.state.orderData.quantity === this.props.selectedItem.remainAmount) {
                        document.getElementById("increaseButton").classList.add("disabled");
                    }
                    if (this.state.orderData.quantity < this.props.selectedItem.remainAmount) {
                        document.getElementById("increaseButton").classList.remove("disabled");
                    }
                }
            }


        }
        else {
            this.setSelectedItem();
        }
    }

    render() {
        let itemDetails = null;
        let selectedItem = {
            title: "",
            image: ""
        };

        let sellOrOutOfStockOrLogin = null;

        if (this.props.itemLoading === false) {
            if (this.props.selectedItem == null) {
                return (
                    <LinkError errText="Item" />
                )
            } else {

                document.title = this.props.selectedItem.title + " - React Assignment";
                if (this.props.selectedItem.remainAmount !== 0) {
                    if (this.props.token != null) {
                        sellOrOutOfStockOrLogin = (
                            <div>
                                <div className='d-flex flex-wrap align-items-center'>
                                    <p style={{ fontWeight: "bold" }}>Quantity : </p>
                                    <Button id='decreaseButton' color='secondary' style={{ marginLeft: "10px" }} onClick={this.decreaseQuantity}>-</Button>
                                    <p className="border d-flex align-items-center justify-content-center " style={{ borderRadius: "5px", minWidth: "50px", height: "40px", textAlign: "center", margin: "0px 5px" }}>{this.state.orderData.quantity}</p>
                                    <Button id='increaseButton' color='secondary' onClick={this.increaseQuantity}>+</Button>
                                </div>
                                <br />
                                <Link to={itemsUrl + "/" + this.props.selectedItem.id + checkoutUrl}>
                                    <Button color='success mt-2 ms-2' style={{ width: "170px" }} onClick={this.submitHandler}>Buy Now</Button>
                                </Link>
                                <Button color='secondary' className='ms-2 mt-2' style={{ width: "170px" }} onClick={this.goBack}> Go Back</Button>
                            </div>
                        );
                    } else {
                        sellOrOutOfStockOrLogin = (
                            <div>
                                <Link to="/login">
                                    <Button className='ms-2 mt-2' style={{ width: "170px" }} color="danger">Login To Buy</Button>
                                </Link>
                                <Button color='secondary' className='ms-2 mt-2' style={{ width: "170px" }} onClick={this.goBack}> Go Back</Button>
                            </div>
                        )
                    }

                } else {
                    sellOrOutOfStockOrLogin = (
                        <div>
                            <p className='bg-danger p-2 text-white' style={{ fontWeight: 'bold', fontSize: "25px", display: 'inline', border: "1px solid gray", borderRadius: "5px" }}>Out Of Stock!</p>
                            <br />
                            <br />
                            <Link to={itemsUrl}>
                                <Button color='success' className='ms-2 mt-2' style={{ width: "170px" }} >Browse Other Items</Button>
                            </Link>
                            <Button color='secondary' className='ms-2 mt-2' style={{ width: "170px" }} onClick={this.goBack}>Back</Button>
                        </div>
                    );
                }


                itemDetails = (
                    <div style={{ minHeight: "580px" }}>
                        <div className='d-flex justify-content-center mr-auto flex-wrap'>
                            <div className='p-2 col-12 col-md-6'>
                                <div className='p-2 w-100 h-100 d-flex flex-column fgColor textColor' style={{ border: "1px solid gray" }}>
                                    <div className='p-2 w-100'>
                                        <img className='img-fluid'
                                            alt="Item"
                                            src={this.props.selectedItem.image}
                                            style={{ maxHeight: "500px", height: "100%", aspectRatio: "16/9", objectFit: 'cover', borderRadius: "5px" }}
                                        />
                                    </div>
                                    <Button onClick={this.viewImageFullScreen} color='primary' className='m-2'>View Image Fullscreen</Button>
                                </div>
                            </div>

                            <div className='p-2 col-12 col-md-6'>
                                <div className='p-2 w-100 h-100 fgColor textColor' style={{ border: "1px solid gray" }}>
                                    <h4><span style={{ fontWeight: 'bold' }}>Title : </span>{this.props.selectedItem.title}</h4>
                                    <p><span style={{ fontWeight: 'bold' }}>Category :   </span>{this.props.selectedItem.categoryName}</p>
                                    <p>
                                        <span style={{ fontWeight: 'bold' }}>Details : </span>{this.props.selectedItem.details}
                                    </p>
                                    <p>
                                        <span className='me-2'><span style={{ fontWeight: 'bold' }}>Stock : </span>{this.props.selectedItem.remainAmount}</span>
                                        <span><span style={{ fontWeight: 'bold' }}>Sold : </span>{this.props.selectedItem.totalAmount - this.props.selectedItem.remainAmount}</span>
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: 'bold' }}>Price : </span>{this.props.selectedItem.price} <span style={{ fontSize: "22px" }}>&#2547;</span> X {this.state.orderData.quantity} = <span style={{ fontWeight: "bold" }}>{this.state.orderData.totalPayable}</span> <span style={{ fontSize: "22px" }}>&#2547;</span>
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: 'bold' }}>Last Sold : </span> {dateFormat(this.props.selectedItem.updatedTime, "dS mmmm yyyy, h:MM TT")}
                                    </p>

                                    {sellOrOutOfStockOrLogin}


                                </div>
                            </div>
                        </div>
                        <div className='pe-2 ps-2 mt-2'>
                            <div className='p-2 h-100 w-100 fgColor textColor' style={{ border: "1px solid gray" }}>
                                <h5 style={{ fontWeight: 'bold' }}>Descriptions : </h5>
                                {this.props.selectedItem.desc}
                            </div>
                        </div>

                        <div className='pe-2 ps-2 mt-3 mb-3'>
                            <div className='p-2 w-100 h-100 fgColor textColor' style={{ border: "1px solid gray" }}>
                                <Comments comments={this.props.comments} item={this.props.selectedItem} />
                            </div>
                        </div>
                    </div>
                )
                selectedItem = this.props.selectedItem
            }
        } else {
            itemDetails = (<div><Spinner /> </div>)
        }

        return (
            <div>
                {itemDetails}
                <Modal isOpen={this.state.isModalOpen} fullscreen>
                    <ModalHeader toggle={this.closeModal}>{selectedItem.title}</ModalHeader>
                    <ModalBody>
                        <img className='img-fluid'
                            alt="Item"
                            src={selectedItem.image}
                            style={{ width: "100%" }}
                        />
                    </ModalBody>
                </Modal>
            </div >
        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
