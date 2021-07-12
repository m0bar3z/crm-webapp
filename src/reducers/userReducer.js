import { userConstants } from '../constants'

const initialState = {}

export function getUserInfo(state = initialState, action) {
    switch (action.type) {
        case userConstants.USER_INFO_REQUEST:
            return {
                ...state,
                user: {}
            }
        case userConstants.USER_INFO_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        case userConstants.USER_INFO_FAILURE:
            return {
                ...state,
                user: {}
            }
    
        default:
            return state;
    }
}