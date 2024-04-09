import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl, categoriesUrl, commentsUrl, extensionFormat, itemsUrl, ordersUrl } from '../../../Redux/dataBase';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { fetchComments } from '../../../Redux/actionCreators';

const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem,
        isLoading: state.isLoading,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchComments: () => dispatch(fetchComments())
    }
}

class CommentForm extends Component {
    state = {
        values: {
            userName: "",
            comment: ""
        }
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
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
        this.setState({
            isLoading: true
        })

        const comment = {
            itemId: this.props.selectedItem.id,
            userName: this.state.values.userName,
            comment: this.state.values.comment,
            addTime: new Date(),
        }

        axios.post(baseUrl + commentsUrl + extensionFormat, comment)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Comment Submitted Successfully!",
                        values: {
                            userName: "",
                            comment: ""
                        }
                    });

                    this.props.fetchComments();
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

    cancelComment = () => {
        this.setState({
            values: {
                userName: "",
                comment: ""
            }
        })
    }

    render() {
        let form = (
            <div>
                <div className='m-2 p-2' style={{ minWidth: "350px", border: "1px solid gray", borderRadius: "5px" }}>
                    <input name='userName' className='form-control' value={this.state.values.userName} placeholder='Your Name' onChange={(e) => this.inputChangerHandler(e)} />
                    <br />
                    <textarea className='border p-2' style={{ width: "100%" }} name='comment' value={this.state.values.comment} placeholder='Your Comment' onChange={(e) => this.inputChangerHandler(e)}>
                    </textarea>
                    <br />
                    <br />
                    <Button color='success' style={{ width: "170px" }} className='ms-2 mt-2' onClick={this.submitHandler}>Submit Comment</Button>
                    <Button color='secondary' style={{ width: "170px", minWidth: "120px" }} className='ms-2 mt-2' onClick={this.cancelComment}>Clear Fields</Button>
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
                                <Button color='secondary' className='m-1' onClick={this.closeModal}>Orders</Button>
                            </Link>
                            <Link to={itemsUrl}>
                                <Button color='secondary' className='m-1' onClick={this.closeModal}>Items</Button>
                            </Link>
                            <Link to={categoriesUrl}>
                                <Button color='secondary' className='m-1' onClick={this.closeModal}>Categories</Button>
                            </Link>
                            <Button color='secondary' className='m-1' onClick={this.closeModal}>Close</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);