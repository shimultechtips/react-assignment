import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { baseUrl, categoriesUrl, extensionFormat } from '../../../Redux/dataBase';

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading
    }
}

class CategoryForm extends Component {
    state = {
        values: {
            title: "",
            details: "",
            image: "",
            addTime: new Date(),
        }
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
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

        axios.post(baseUrl + categoriesUrl + extensionFormat, this.state.values)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Category Created Successfully!",
                        values: {
                            title: "",
                            details: "",
                            image: "",
                            addTime: new Date(),
                        }
                    });
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
        document.title = "Category Form - React Assignment";
        let form = (
            <div className='textColor'>
                <h4 style={{ textAlign: "center", margin: "5px" }}>Create Category As You Need :</h4>
                <div className='m-2 p-2 fgColor' style={{ minWidth: "350px", border: "1px solid gray" }}>
                    <form style={{ padding: "5px" }}>


                        <input name='title' className='form-control' value={this.state.values.title} placeholder='Title' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <input name='image' className='form-control' value={this.state.values.image} placeholder='Image URL' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <input name='details' className='form-control' value={this.state.values.details} placeholder='Details' onChange={(e) => this.inputChangerHandler(e)} />
                        <br />
                        <br />
                        <Button color='success' className='me-auto' onClick={this.submitHandler} disabled={this.props.purchaseble}>Submit Category</Button>
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
                            <Link to="/orders">
                                <Button color='secondary' className='m-1' >Orders</Button>
                            </Link>
                            <Link to="/items">
                                <Button color='secondary' className='m-1' >Items</Button>
                            </Link>
                            <Link to="/categories">
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

export default connect(mapStateToProps)(CategoryForm);