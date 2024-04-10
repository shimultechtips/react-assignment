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

export const fetchOrders = (token, userId) => dispatch => {
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get(baseUrl + ordersUrl + extensionFormat + '?auth=' + token + queryParams)
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


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    let authUrl = null;

    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }

    const API_KEY = "AIzaSyAX73ADh6G0j60KS4mDimCKGE9LkqnCNbE";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            dispatch(authLoading(false));
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("userId", response.data.localId);
            const expirationTime = new Date((new Date().getTime() + (response.data.expiresIn * 1000)));
            localStorage.setItem("expirationTime", expirationTime);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
            dispatch(authLoading(false));
            dispatch(authFailed(err.response.data.error.message));
        })
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout())

    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if (expirationTime <= new Date()) {
            dispatch(logout())
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}

export const submitComment = (userName, userComment, itemId) => dispatch => {
    dispatch(commentSubmitLoading(true));
    const comment = {
        itemId: itemId,
        userName: userName,
        comment: userComment,
        addTime: new Date(),
    }

    axios.post(baseUrl + commentsUrl + extensionFormat, comment)
        .then(response => {
            if (response.status === 200) {
                dispatch(commentSubmitLoading(false));
                dispatch(fetchComments());
                dispatch(commentSubmitSuccess("Comment Submitted Successfully!"));
                setTimeout(() => dispatch(commentSubmitSuccess(null)), 3000);
                setTimeout(() => dispatch(commentSubmitFailed(null)), 3000);
            }
        })
        .catch(err => {
            dispatch(commentSubmitSuccess(null));
            dispatch(commentSubmitLoading(false));
            dispatch(commentSubmitFailed(err.message));
            setTimeout(() => dispatch(commentSubmitSuccess(null)), 3000);
            setTimeout(() => dispatch(commentSubmitFailed(null)), 3000);
        });

}

export const commentSubmitLoading = isLoading => {
    return {
        type: actionTypes.COMMENT_SUBMIT_LOADING,
        payload: isLoading,
    }
}

export const commentSubmitFailed = errMsg => {
    return {
        type: actionTypes.COMMENT_SUBMIT_FAILED,
        payload: errMsg
    }
}
export const commentSubmitSuccess = successMsg => {
    return {
        type: actionTypes.COMMENT_SUBMIT_SUCCESS,
        payload: successMsg
    }
}

export const checkOut = (order, token, selectedItem) => dispatch => {
    dispatch(checkoutLoading(true));

    axios.post(baseUrl + ordersUrl + extensionFormat + "?auth=" + token, order)
        .then(response => {
            if (response.status === 200) {
                const newItem = {
                    ...selectedItem,
                    remainAmount: selectedItem.remainAmount - order.item.quantity,
                    updatedTime: new Date()
                }
                axios.put(baseUrl + itemsUrl + "/" + selectedItem.id + extensionFormat, newItem)
                    .then(response => {
                        dispatch(fetchItems());
                        dispatch(fetchOrders());
                        dispatch(checkoutLoading(false));
                        dispatch(checkoutSuccess("Order Placed And Item Has Been Updated. Redirecting To Homepage!"));
                        setTimeout(() => dispatch(checkoutSuccess(null)), 3000);
                        setTimeout(() => dispatch(checkoutFailed(null)), 3000);
                        setTimeout(() => window.location.reload(false), 3000);
                    })
                    .catch(err => {
                        dispatch(checkoutSuccess(null));
                        dispatch(checkoutLoading(false));
                        dispatch(checkoutFailed(err.message));
                        setTimeout(() => dispatch(checkoutSuccess(null)), 3000);
                        setTimeout(() => dispatch(checkoutFailed(null)), 3000);
                        console.log("Something Went Wrong! Order Again!");
                    });
            } else {
                console.log("Something Went Wrong! Order Again!");
            }
        })
        .catch(err => {
            dispatch(checkoutSuccess(null));
            dispatch(checkoutLoading(false));
            dispatch(checkoutFailed(err.message));
            setTimeout(() => dispatch(checkoutSuccess(null)), 3000);
            setTimeout(() => dispatch(checkoutFailed(null)), 3000);
            console.log("Something Went Wrong! Order Again!");
        });
}

export const checkoutLoading = isLoading => {
    return {
        type: actionTypes.CHECKOUT_LOADING,
        payload: isLoading,
    }
}

export const checkoutFailed = errMsg => {
    return {
        type: actionTypes.CHECKOUT_FAILED,
        payload: errMsg
    }
}
export const checkoutSuccess = successMsg => {
    return {
        type: actionTypes.CHECKOUT_SUCCESS,
        payload: successMsg
    }
}

