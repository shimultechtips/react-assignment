import React, { Component } from 'react'
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Categories from './Categories/Categories';
import { Navigate, Route, Routes } from 'react-router-dom';
import ItemDetails from './Items/ItemDetails/ItemDetails';
import { connect } from 'react-redux';
import CategoryItems from './Categories/CategoryItems/CategoryItems';
import Items from './Items/Items';
import { authCheck, fetchCategories, fetchComments, fetchItems } from '../Redux/actionCreators';
import Home from './Home/Home';
import FeedBackForm from './Forms/FeedBackForm/FeedBackForm';
import Forms from './Forms/Forms';
import ItemForm from './Forms/ItemForm/ItemForm';
import CheckOutForm from './Forms/CheckOutForm/CheckOutForm';
import Orders from './Orders/Orders';
import CategoryForm from './Forms/CategoryForm/CategoryForm';
import Logout from './Auth/Logout';
import { categoriesUrl, categoryFormUrl, checkoutUrl, feedBackUrl, formsUrl, itemFormUrl, itemsUrl, loginUrl, logoutUrl, ordersUrl } from '../Redux/dataBase';
import Auth from './Auth/Auth';

const mapStateToProps = state => {
    return {
        items: state.items,
        selectedItem: state.selectedItem,
        selectedCategory: state.selectedCategory,
        comments: state.comments,
        categories: state.categories,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: () => dispatch(fetchItems()),
        fetchComments: () => dispatch(fetchComments()),
        fetchCategories: () => dispatch(fetchCategories()),
        authCheck: () => dispatch(authCheck())
    }
}

export class Main extends Component {
    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchComments();
        this.props.fetchItems();
        this.props.authCheck();
    }

    render() {
        let routes = null;

        if (this.props.token === null) {
            routes = (
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path={itemsUrl} element={<Items />}></Route>
                    <Route path={categoriesUrl} element={<Categories />}></Route>
                    <Route path={feedBackUrl} element={<FeedBackForm />}></Route>
                    <Route path={itemsUrl + '/:id'} element={<ItemDetails />}></Route>
                    <Route path={categoriesUrl + '/:id'} element={<CategoryItems />}></Route>
                    <Route path={loginUrl} element={<Auth />}></Route>
                    <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
            )
        } else {
            routes = (
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path={itemsUrl} element={<Items />}></Route>
                    <Route path={ordersUrl} element={<Orders />}></Route>
                    <Route path={formsUrl} element={<Forms />}></Route>
                    <Route path={itemFormUrl} element={<ItemForm />}></Route>
                    <Route path={categoryFormUrl} element={<CategoryForm />}></Route>
                    <Route path={categoriesUrl} element={<Categories />}></Route>
                    <Route path={feedBackUrl} element={<FeedBackForm />}></Route>
                    <Route path={itemsUrl + '/:id' + checkoutUrl} element={<CheckOutForm />}></Route>
                    <Route path={itemsUrl + '/:id'} element={<ItemDetails />}></Route>
                    <Route path={categoriesUrl + '/:id'} element={<CategoryItems />}></Route>
                    <Route path={logoutUrl} element={<Logout />}></Route>
                    <Route path="*" element={<Navigate to="/" />}></Route>
                </Routes>
            )
        }

        return (
            <div>
                <Header />
                <div>
                    <div className='container mb-2 mt-2' style={{ minHeight: "580px" }}>
                        {routes}
                    </div>
                </div>

                <Footer />
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);