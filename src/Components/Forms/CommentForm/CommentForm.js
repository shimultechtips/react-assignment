import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'reactstrap';
import Spinner from '../../Spinner/Spinner';
import { submitComment } from '../../../Redux/actionCreators';
import { Formik } from 'formik';

const mapStateToProps = state => {
    return {
        selectedItem: state.selectedItem,
        commentSubmitFailedMsg: state.commentSubmitFailedMsg,
        commentSubmitLoading: state.commentSubmitLoading,
        commentSubmitSuccess: state.commentSubmitSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitComment: (userName, userComment, itemId) => dispatch(submitComment(userName, userComment, itemId))
    }
}

class CommentForm extends Component {
    state = {
        isModalOpen: false,
        modalMsg: ""
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,

        });
    }

    render() {

        let msg = null;
        if (this.props.commentSubmitFailedMsg != null) {
            msg = <Alert color="danger">{this.props.commentSubmitFailedMsg}</Alert>
        }

        if (this.props.commentSubmitSuccess != null) {
            msg = <Alert color="success">{this.props.commentSubmitSuccess}</Alert>
        }

        let form = null;
        if (this.props.commentSubmitLoading) {
            form = <Spinner />
        } else {
            form = (<Formik
                initialValues={{
                    name: "",
                    comment: ""
                }}
                onSubmit={
                    (values) => {
                        this.props.submitComment(values.name, values.comment, this.props.selectedItem.id);

                    }}

                validate={(values) => {
                    const errors = {};

                    if (!values.name) {
                        errors.name = "Required"
                    } else if (values.name.length < 3) {
                        errors.name = "Must Be 3 Or More Characters!"
                    }

                    if (!values.comment) {
                        errors.comment = "Required"
                    } else if (values.comment.length < 15) {
                        errors.comment = "Must Be 15 Or More Characters!"
                    }

                    return errors;
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                    <div className='p-2' style={{
                        border: "1px solid gray",
                        padding: "15px",
                        borderRadius: "5px"
                    }}>
                        <form onSubmit={handleSubmit}>
                            <input className='border p-2' style={{ width: "100%", borderRadius: "5px" }} name='name' placeholder='Enter Your Name!' value={values.name} onChange={handleChange} onBlur={handleBlur}
                            />
                            <br />
                            {touched.name && errors.name ? <span style={{ color: "red" }}>{errors.name}</span> : null}
                            <br />
                            <textarea className='border p-2' style={{ width: "100%", borderRadius: "5px" }} name='comment' placeholder='Enter Your Comment!' value={values.comment} onChange={handleChange} onBlur={handleBlur} />
                            <br />
                            {touched.comment && errors.comment ? <span style={{ color: "red" }}>{errors.comment}</span> : null}
                            <br />
                            <Button style={{ width: "170px" }} type='submit' className='btn btn-success'>Submit Comment</Button>
                        </form>
                    </div>
                )}
            </Formik>)

            return (
                <div>
                    <div className='p-2'>
                        {msg}
                        {form}
                    </div>
                </div >
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);