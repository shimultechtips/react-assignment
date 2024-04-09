import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { baseUrl, categoriesUrl, extensionFormat, itemsUrl, ordersUrl } from '../../../Redux/dataBase';

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading
    }
}

class ItemForm extends Component {
    state = {
        values: {
            categoryName: "",
            title: "",
            image: "",
            desc: "",
            details: "",
            price: "",
            remainAmount: "",
            totalAmount: "",
            addTime: new Date(),
            updatedTime: new Date()
        }
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        })
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
        this.setState({
            isLoading: true
        })

        axios.post(baseUrl + itemsUrl + extensionFormat, this.state.values)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Item Created Successfully!",
                        values: {
                            categoryName: "",
                            title: "",
                            image: "",
                            desc: "",
                            details: "",
                            price: "",
                            remainAmount: "",
                            totalAmount: "",
                            addTime: new Date(),
                            updatedTime: new Date(),
                        }
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! Submit Again!"
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something Went Wrong! Submit Again!"
                })
            });
    }

    render() {
        let form = (
            <div className='textColor'>
                <h4 style={{ textAlign: "center", margin: "5px" }}>Create Item As You Need :</h4>
                <div className='m-2 p-2 fgColor' style={{ minWidth: "350px", border: "1px solid gray" }}>
                    <form style={{ padding: "5px" }}>
                        <input name='title' className='form-control' value={this.state.values.title} placeholder='Title' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <input name='image' className='form-control' value={this.state.values.image} placeholder='Image URL' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <input name='details' className='form-control' value={this.state.values.details} placeholder='Details' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <input name='categoryName' className='form-control' value={this.state.values.categoryName} placeholder='Category Name' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <input name='price' className='form-control' value={this.state.values.price} placeholder='Price' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <input name='remainAmount' className='form-control' value={this.state.values.remainAmount} placeholder='Remaining Amount' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <input name='totalAmount' className='form-control' value={this.state.values.totalAmount} placeholder='Total Amount' onChange={(e) => this.inputChangerHandler(e)} />


                        {/* <select name="paymentType" className='form-control' value={this.state.values.paymentType} onChange={(e) => this.inputChangerHandler(e)} >
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Bkash">Bkash</option>
                        </select> */}
                        <br />
                        <textarea className='border p-2' style={{ width: "100%" }} name='desc' value={this.state.values.desc} placeholder='Description' onChange={(e) => this.inputChangerHandler(e)}>
                        </textarea>
                        <br />
                        <br />
                        <Button color='success' className='me-auto' onClick={this.submitHandler}>Submit Item</Button>
                        <Link to="/">
                            <Button color='secondary' className='ms-1'>Cancel</Button>
                        </Link>
                    </form>
                </div>
            </div >
        )

        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p style={{ textAlign: 'center' }}>{this.state.modalMsg}</p>
                        <div className='d-flex justify-content-center mr-auto flex-wrap'>
                            <Link to={ordersUrl}>
                                <Button color='secondary' className='m-1' >Orders</Button>
                            </Link>
                            <Link to={itemsUrl}>
                                <Button color='secondary' className='m-1' >Items</Button>
                            </Link>
                            <Link to={categoriesUrl}>
                                <Button color='secondary' className='m-1' >Categories</Button>
                            </Link>
                            <Button color='secondary' className='m-1' onClick={this.closeModal}>Close</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ItemForm);