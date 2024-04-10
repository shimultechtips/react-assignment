import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    items: [],
    itemLoading: true,
    itemErr: false,
    selectedItem: null,

    comments: [],
    commentLoading: true,
    commentErr: false,

    categories: [],
    categoryLoading: true,
    categoryErr: false,
    selectedCategory: null,

    orders: [],
    orderLoading: true,
    orderErr: false,
    orderData: {
        quantity: 1,
        totalPayable: 1
    },

    purchaseable: false,
    onClickCheckout: false,

    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,

    commentSubmitFailedMsg: null,
    commentSubmitSuccess: null,
    commentSubmitLoading: false,

    checkoutLoading: false,
    checkoutSuccess: null,
    checkoutFailed: null
}

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.LOAD_ITEMS:
            let items = [];
            for (let key in action.payload) {
                items.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                items: items,
                itemLoading: false,
            }
        case actionTypes.ITEM_LOAD_FAILED:
            return {
                ...state,
                itemErr: true,
                itemLoading: false,
            }

        case actionTypes.LOAD_COMMENTS:
            let comments = [];
            for (let key in action.payload) {
                comments.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                comments: comments,
                commentLoading: false,
            }
        case actionTypes.COMMENT_LOAD_FAILED:
            return {
                ...state,
                commentErr: true,
                commentLoading: false,
            }

        case actionTypes.LOAD_CATEGORIES:
            let categories = [];
            for (let key in action.payload) {
                categories.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                categories: categories,
                categoryLoading: false,
            }
        case actionTypes.CATEGORY_LOAD_FAILED:
            return {
                ...state,
                categoryErr: true,
                categoryLoading: false,
            }

        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key,
                })
            }

            return {
                ...state,
                orders: orders,
                orderLoading: false,
            }
        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderErr: true,
                orderLoading: false,
            }

        case actionTypes.SELECTED_ITEM:
            return {
                ...state,
                selectedItem: action.payload
            }
        case actionTypes.SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            }
        case actionTypes.ORDER_ITEM:
            return {
                ...state,
                orderData: action.payload,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                authFailedMsg: null,
            }
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload,
            }
        case actionTypes.COMMENT_SUBMIT_FAILED:
            return {
                ...state,
                commentSubmitFailedMsg: action.payload,
            }
        case actionTypes.COMMENT_SUBMIT_SUCCESS:
            return {
                ...state,
                commentSubmitSuccess: action.payload
            }
        case actionTypes.COMMENT_SUBMIT_LOADING:
            return {
                ...state,
                commentSubmitLoading: action.payload,
            }
        case actionTypes.CHECKOUT_FAILED:
            return {
                ...state,
                checkoutFailed: action.payload,
            }
        case actionTypes.CHECKOUT_SUCCESS:
            return {
                ...state,
                checkoutSuccess: action.payload
            }
        case actionTypes.CHECKOUT_LOADING:
            return {
                ...state,
                checkoutLoading: action.payload,
            }
        default:
            return state;
    }
}