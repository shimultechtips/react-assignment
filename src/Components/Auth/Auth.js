import { Formik } from 'formik'
import React, { Component } from 'react';
import { auth } from '../../Redux/actionCreators';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert, Button } from 'reactstrap';

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}

class Auth extends Component {
    state = {
        mode: "Login"
    }

    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"
        })
    }

    render() {

        let err = null;
        if (this.props.authFailedMsg != null) {
            err = <Alert color="danger">{this.props.authFailedMsg}</Alert>
        }

        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (<Formik
                initialValues={{
                    email: "",
                    password: "",
                    passwordConfirm: ""
                }}
                onSubmit={
                    (values) => {
                        this.props.auth(values.email, values.password, this.state.mode)
                    }}

                validate={(values) => {
                    const errors = {};

                    if (!values.email) {
                        errors.email = "Required"
                    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
                        errors.email = "Invalid Email Address!"
                    }

                    if (!values.email) {
                        errors.email = "Required"
                    } else if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(values.email)) {
                        errors.email = "Invalid Email Address!"
                    }

                    if (!values.password) {
                        errors.password = "Required"
                    } else if (values.password.length < 6) {
                        errors.password = "Password Must Be 6 Characters!"
                    }

                    if (this.state.mode === "Sign Up") {
                        if (!values.passwordConfirm) {
                            errors.passwordConfirm = "Required"
                        } else if (values.passwordConfirm !== values.password) {
                            errors.passwordConfirm = "Password Does Not Match!"
                        }
                    }
                    return errors;
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (<div style={{
                    border: "1px solid gray",
                    padding: "15px",
                    borderRadius: "5px"
                }}>
                    <Button style={{
                        width: "100%",
                    }}
                        color='primary'
                        className='btn btn-lg'
                        onClick={this.switchModeHandler}
                    >Switch To {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</Button>
                    <br />
                    <br />

                    <form onSubmit={handleSubmit}>
                        <input className='border p-2' style={{ width: "100%", borderRadius: "5px" }} name='email' placeholder='Enter Your Email' value={values.email} onChange={handleChange} onBlur={handleBlur}
                        />
                        <br />
                        {touched.email && errors.email ? <span style={{ color: "red" }}>{errors.email}</span> : null}
                        <br />
                        <input className='border p-2' style={{ width: "100%", borderRadius: "5px" }} name='password' placeholder='Enter Your Password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                        <br />
                        {touched.password && errors.password ? <span style={{ color: "red" }}>{errors.password}</span> : null}
                        <br />
                        {this.state.mode === "Sign Up" ? (<div>
                            <input className='border p-2' style={{ width: "100%", borderRadius: "5px" }} name='passwordConfirm' placeholder='Renter Your Password' value={values.passwordConfirm} onChange={handleChange} onBlur={handleBlur} />
                            <br />
                            {touched.passwordConfirm && errors.passwordConfirm ? <span style={{ color: "red" }}>{errors.passwordConfirm}</span> : null} <br />
                        </div>) : null}

                        <Button style={{ width: "170px" }} type='submit' className='btn btn-success'>{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</Button>
                    </form>
                </div>)}
            </Formik>)
        }

        return (
            <div className='d-flex justify-content-center'>
                <div style={{ width: "480px" }}>
                    {err}
                    {form}
                </div>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 