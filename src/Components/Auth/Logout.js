import React, { Component } from 'react'
import { logout } from '../../Redux/actionCreators';
import { connect } from 'react-redux';
import { Route, Navigate, Routes } from 'react-router-dom';

const mapDispatchToProps = disptch => {
    return {
        logout: () => disptch(logout())
    }
}

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Navigate to="/" replace />
        )
    }
}

export default connect(null, mapDispatchToProps)(Logout);