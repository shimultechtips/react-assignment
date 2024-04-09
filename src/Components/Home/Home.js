import React, { Component } from 'react'
import { connect } from 'react-redux';
import FetchErrors from '../ErrorHandling/FetchErrors';
import Spinner from '../Spinner/Spinner';
import { success } from "../../notify";

const mapStateToProps = state => {
    return {
        items: state.items,
        itemLoading: state.itemLoading,
        itemErr: state.itemErr,
        selectedItem: state.selectedItem,
        selectedCategory: state.selectedCategory,
        comments: state.comments,
        commentLoading: state.commentLoading,
        categoryLoading: state.categoryLoading,
        commentErr: state.commentErr,
        categoryErr: state.categoryErr
    }
}

class Home extends Component {
    componentDidUpdate() {
        if (!this.props.itemLoading && !this.props.commentLoading && !this.props.categoryLoading && !this.props.categoryErr && !this.props.itemErr && !this.props.commentErr) {
            success("Database Updated...", true);
        }
    }
    render() {

        let home = null;
        if (this.props.itemErr) {
            home = <FetchErrors errText="Sorry! Failed To Load Items. Use Below Links To Browse Items, Categories Or Reload/Refresh After Sometime!" />
        } else if (this.props.items.length === 0) {
            home = <FetchErrors errText="Sorry! Failed To Load Items. Use Below Links To Browse Items, Categories Or Reload/Refresh After Sometime!" />
        } else {
            return (
                <div>
                    Home
                </div>
            )
        }

        return (
            <div className="d-flex justify-content-center mr-auto flex-wrap" >
                {this.props.itemLoading && this.props.commentLoading && this.props.categoryLoading ? <Spinner /> : home}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home);