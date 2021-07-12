import { employeeConstants } from '../constants'

const initialState = {
    loading: false,
    employees: [],
    employee: {},
    editEmployee: {},
    permissions: {},
    applications: [],
    application: {}
}

export function getEmployees(state = initialState, action) {
    switch (action.type) {
        case employeeConstants.GET_EMPLOYEES_REQUEST:
            return {
                ...state, 
                loading: true,
            }
        case employeeConstants.GET_EMPLOYEES_SUCCESS: 
            return {
                ...state,
                loading: false,
                employees: action.data
            }
        case employeeConstants.GET_EMPLOYEES_FAILURE:
            return {
                err: action.err
            }
        default:
            return state;
    }
}

export function addEmployee(state = initialState, action) {
    switch (action.type) {
        case employeeConstants.ADD_EMPLOYEE_REQUEST:
            return {
                ...state, 
                loading: true,
            }
        case employeeConstants.ADD_EMPLOYEE_SUCCESS: 
            return {
                ...state,
                loading: false,
                employee: action.data
            }
        case employeeConstants.ADD_EMPLOYEE_FAILURE:
            return {
                loading: false,
                err: action.error
            }
        default:
            return state;
    }
}

export function editEmployee(state = initialState, action) {
    switch (action.type) {
        case employeeConstants.EDIT_EMPLOYEE_REQUEST:
            return {
                ...state, 
                loading: true,
            }
        case employeeConstants.EDIT_EMPLOYEE_SUCCESS: 
            return {
                ...state,
                loading: false,
                editEmployee: action.data
            }
        case employeeConstants.EDIT_EMPLOYEE_FAILURE:
            return {
                loading: false,
                err: action.error
            }
        default:
            return state;
    }
}

export function deleteEmployee(state = initialState, action) {
    switch (action.type) {
        case employeeConstants.DELETE_EMPLOYEE_REQUEST:
            return {
                ...state, 
                loading: true,
            }
        case employeeConstants.DELETE_EMPLOYEE_SUCCESS: 
            return {
                ...state,
                loading: false
            }
        case employeeConstants.DELETE_EMPLOYEE_FAILURE:
            return {
                loading: false,
                err: action.error
            }
        default:
            return state;
    }
}

export function getPermissions(state = initialState, action) {
    switch (action.type) {
        case employeeConstants.GET_PERMISSIONS_REQUEST:
            return {
                ...state, 
                loading: true,
            }
        case employeeConstants.GET_PERMISSIONS_SUCCESS: 
            return {
                ...state,
                loading: false,
                permissions: action.data
            }
        case employeeConstants.GET_PERMISSIONS_FAILURE:
            return {
                err: action.err
            }
        default:
            return state;
    }
}

export function getApplications(state = initialState, action) {
    switch (action.type) {
        case employeeConstants.GET_APPLICATIONS_REQUEST:
            return {
                ...state, 
                loading: true,
            }
        case employeeConstants.GET_APPLICATIONS_SUCCESS: 
            return {
                ...state,
                loading: false,
                applications: action.data
            }
        case employeeConstants.GET_APPLICATIONS_FAILURE:
            return {
                err: action.err
            }
        default:
            return state;
    }
}

export function editApplications(state = initialState, action) {
    switch (action.type) {
        case employeeConstants.EDIT_APPLICATIONS_REQUEST:
            return {
                ...state, 
                loading: true,
            }
        case employeeConstants.EDIT_APPLICATIONS_SUCCESS: 
            return {
                ...state,
                loading: false,
                application: action.data
            }
        case employeeConstants.EDIT_APPLICATIONS_FAILURE:
            return {
                err: action.err
            }
        default:
            return state;
    }
}