import React, { Component } from 'react';
import Item from '../../Items/Item/Item';
import LinkError from '../../ErrorHandling/LinkError';
import { connect } from 'react-redux';
import FetchErrors from '../../ErrorHandling/FetchErrors';
import { selectedCategoryFunc } from '../../../Redux/actionCreators';
import Spinner from '../../Spinner/Spinner';

const mapStateToProps = state => {
    return {
        selectedCategory: state.selectedCategory,
        items: state.items,
        categories: state.categories,
        categoryErr: state.categoryErr,
        categoryLoading: state.categoryLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectedCategoryFunc: category => dispatch(selectedCategoryFunc(category)),
    }
};

class CategoryItems extends Component {
    componentDidMount() {
        this.getItemIdFromHistory();


    }

    componentDidUpdate() {
        if (this.props.selectedCategory === null) {
            this.setSelectedCategory();
        }
    }

    setSelectedCategory = () => {
        this.props.categories.forEach(category => {
            if (this.state.lastPartOfUrl === category.title) {
                this.props.selectedCategoryFunc(category);
            }
        });
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

    render() {
        let categoryItem = null, loadItems;
        let categoryName = "";

        if (this.props.categoryLoading === false) {
            if (this.props.selectedCategory === null) {
                return (
                    <LinkError errText="Category" />
                )
            } else {
                categoryName = this.props.selectedCategory.title + " Category :";
                document.title = this.props.selectedCategory.title + " Category - React Assignment";
                loadItems = this.props.items.map(item => {
                    if (item.categoryName === this.props.selectedCategory.title) {
                        categoryItem = item.categoryName;
                        return <Item item={item} key={item.id} />
                    }
                    return (<div key={Math.random()}></div>)
                })
                if (categoryItem === null) {
                    loadItems = (
                        <div>
                            <FetchErrors errText="Sorry! This Category Is Empty. Use Below Links To Browse Items, Categories Or Reload/Refresh After Sometime!" />
                        </div>
                    )
                }
            }
        } else {
            loadItems = (<div><Spinner /></div>)
        }

        return (
            <div>
                <h4 style={{ textAlign: "center", margin: "5px" }}>{categoryName}</h4>
                <div className="d-flex justify-content-center mr-auto flex-wrap">
                    {loadItems}
                </div >
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItems);