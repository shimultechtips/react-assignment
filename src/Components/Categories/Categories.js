import React, { Component } from 'react';
import Category from './Category/Category';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { fetchCategories } from '../../Redux/actionCreators';
import FetchErrors from '../ErrorHandling/FetchErrors';

const mapStateToProps = state => {
    return {
        items: state.items,
        comments: state.comments,
        categories: state.categories,
        categoryErr: state.categoryErr,
        categoryLoading: state.categoryLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    }
}

class Categories extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        let categories = null;
        if (this.props.categoryErr) {
            categories = <FetchErrors errText="Sorry! Failed To Load Categories. Use Below Links To Browse Items, Categories Or Reload/Refresh After Sometime!" />
        } else if (this.props.categories.length === 0) {
            categories = <FetchErrors errText="Sorry! Failed To Load Categories. Use Below Links To Browse Items, Categories Or Reload/Refresh After Sometime!" />
        } else {
            categories = this.props.categories.map(category => {
                return <Category category={category} key={category.id} />;
            })
        }

        return (
            <div>
                <h4 style={{ textAlign: "center", margin: "5px" }}>All Categories :</h4>
                <div className="d-flex justify-content-center mr-auto flex-wrap" >
                    {this.props.categoryLoading ? <Spinner /> : categories}
                </div>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);