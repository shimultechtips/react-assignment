import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { fetchOrders } from '../../Redux/actionCreators';
import FetchErrors from '../ErrorHandling/FetchErrors';
import Order from './Order/Order';


const mapStateToProps = state => {
    return {
        items: state.items,
        orders: state.orders,
        orderErr: state.orderErr,
        orderLoading: state.orderLoading,
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    }
}

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        document.title = "Orders - React Assignment";

        let orders = null;
        if (this.props.orderErr) {
            orders = <FetchErrors errText="Sorry! Failed To Load Orders. Use Below Links To Browse Items, Categories Or Reload/Refresh After Sometime!" />
        } else if (this.props.orders.length === 0) {
            orders = <FetchErrors errText="Sorry! Failed To Load Orders Or You Haven't Order Anything. Use Below Links To Browse Items, Categories Or Reload/Refresh After Sometime!" />
        } else {
            orders = this.props.orders.map(order => {
                return <Order order={order} key={order.id} />
            })
        }

        return (
            <div>
                <h4 style={{ textAlign: "center", margin: "5px" }}>Your Orders :</h4>
                <div className="d-flex justify-content-center mr-auto flex-wrap">
                    {this.props.orderLoading ? <Spinner /> : orders}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);