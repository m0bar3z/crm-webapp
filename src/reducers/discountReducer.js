import { discountConstants } from '../constants'

const initialState = {
    discount: [],
    discounts: []
}

export function getDiscounts(state = initialState, action) {
    switch (action.type) {
        case discountConstants.GET_DISCOUNTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case discountConstants.GET_DISCOUNTS_SUCCESS:
            return {
                ...state,
                loading: false,
                discounts: action.data
            }
        case discountConstants.GET_DISCOUNTS_FAILURE:
            return {
                err: action.error
            }
        default:
            return state
    }
}

export function addDiscount(state = initialState, action) {
    switch (action.type) {
        case discountConstants.ADD_DISCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case discountConstants.ADD_DISCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                discount: action.data
            }
        case discountConstants.ADD_DISCOUNT_FAILURE:
            return {
                err: action.err
            }
        default:
            return state
    }
}
