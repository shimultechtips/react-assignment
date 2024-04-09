import axios from 'axios';
import * as actionTypes from './actionTypes';
import { baseUrl, categoriesUrl, commentsUrl, extensionFormat, itemsUrl, ordersUrl } from './dataBase';

export const loadItems = items => {
    return {
        type: actionTypes.LOAD_ITEMS,
        payload: items
    }
}

export const itemLoadFailed = () => {
    return {
        type: actionTypes.ITEM_LOAD_FAILED
    }
}

export const fetchItems = () => dispatch => {
    axios.get(baseUrl + itemsUrl + extensionFormat)
        .then(response => {
            dispatch(loadItems(response.data));
        })
        .catch(err => {
            dispatch(itemLoadFailed());
        })
}

export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED
    }
}

export const fetchOrders = () => dispatch => {
    axios.get(baseUrl + ordersUrl + extensionFormat)
        .then(response => {
            dispatch(loadOrders(response.data));
        })
        .catch(err => {
            dispatch(orderLoadFailed());
        })
}

export const loadComments = comments => {
    return {
        type: actionTypes.LOAD_COMMENTS,
        payload: comments
    }
}

export const commentLoadFailed = () => {
    return {
        type: actionTypes.COMMENT_LOAD_FAILED
    }
}

export const fetchComments = () => dispatch => {
    axios.get(baseUrl + commentsUrl + extensionFormat)
        .then(response => {
            dispatch(loadComments(response.data));
        })
        .catch(err => {
            dispatch(commentLoadFailed());
        })
}


export const loadCategories = categories => {
    return {
        type: actionTypes.LOAD_CATEGORIES,
        payload: categories
    }
}

export const categoryLoadFailed = () => {
    return {
        type: actionTypes.CATEGORY_LOAD_FAILED
    }
}

export const fetchCategories = () => dispatch => {
    axios.get(baseUrl + categoriesUrl + extensionFormat)
        .then(response => {
            dispatch(loadCategories(response.data));
        })
        .catch(err => {
            dispatch(categoryLoadFailed());
        })
}

export const selectedItemFunc = item => {
    return {
        type: actionTypes.SELECTED_ITEM,
        payload: item
    }
}

export const selectedCategoryFunc = category => {
    return {
        type: actionTypes.SELECTED_CATEGORY,
        payload: category
    }
}

export const orderItem = orderData => {
    return {
        type: actionTypes.ORDER_ITEM,
        payload: orderData
    }
}