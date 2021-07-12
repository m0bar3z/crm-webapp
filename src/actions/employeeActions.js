import { employeeConstants } from '../constants';
import { history } from '../helpers';
import { employeeService } from '../services';
import { alertActions } from './alertActions';


export const employeeActions = {
    getEmployees,
    addEmployee,
    editEmployee,
    getPermissions,
    getApplications,
    editApplication
};

function getEmployees() {
    return dispatch => {
        dispatch(request(employeeConstants.GET_EMPLOYEES_REQUEST))
        employeeService.getEmployees()
            .then(
                res => {
                    if(res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if(res.success){
                        console.log("employees received")
                        dispatch(success(employeeConstants.GET_EMPLOYEES_SUCCESS, res.data));
                    }
                        
                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(employeeConstants.GET_EMPLOYEES_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function addEmployee(employee) {
    return dispatch => {
        dispatch(request(employeeConstants.ADD_EMPLOYEE_REQUEST))
        employeeService.addEmployee(employee)
            .then(
                res => {
                    console.log(res)
                    
                    if(res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست.عملیات ناموفق'));
                    else if(res.success){
                        console.log("employee added")
                        dispatch(success(employeeConstants.ADD_EMPLOYEE_SUCCESS, employee));
                        dispatch(alertActions.success(res.message));
                        //history.go(0)
                    } else if (res.success === false) {
                        dispatch(alertActions.error(res.message));
                        dispatch(success(employeeConstants.ADD_EMPLOYEE_SUCCESS, employee));
                    }

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(employeeConstants.ADD_EMPLOYEE_FAILURE, error.toString()));
                }
            );
    }
}

function editEmployee(employee) {
    return dispatch => {
        dispatch(request(employeeConstants.EDIT_EMPLOYEE_REQUEST))
        employeeService.editEmployee(employee)
            .then(
                res => {
                    console.log(res)
                    
                    if(res === undefined) {
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست.عملیات ناموفق'));
                        dispatch(failure(employeeConstants.EDIT_EMPLOYEE_FAILURE, "bad loading"))
                    }
                    else if(res.success){
                        console.log("employee edited")
                        dispatch(success(employeeConstants.EDIT_EMPLOYEE_SUCCESS, employee));
                        dispatch(alertActions.success(res.message));
                       //history.go(0)
                    } else if (res.success === false)
                        dispatch(alertActions.error(res.message));

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(employeeConstants.EDIT_EMPLOYEE_FAILURE, error.toString()));
                }
            );
    }

}

function deleteEmployee(employee) {
    return dispatch => {
        dispatch(request(employeeConstants.DELETE_EMPLOYEE_REQUEST))
        employeeService.deleteEmployee(employee)
            .then(
                res => {
                    console.log(res)
                    
                    if(res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست.عملیات انجام نشد'));
                    else if(res.success){
                        console.log("employee deleted")
                        dispatch(success(employeeConstants.DELETE_EMPLOYEE_SUCCESS, employee));
                        dispatch(alertActions.success(res.message));
                       //history.go(0)
                    } else if (res.success === false)
                        dispatch(alertActions.error(res.message));

                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(employeeConstants.DELETE_EMPLOYEE_FAILURE, error.toString()));
                }
            );
    }
}

function getPermissions() {
    return dispatch => {
        dispatch(request(employeeConstants.GET_PERMISSIONS_REQUEST))
        employeeService.getPermissions()
            .then(
                res => {
                    if(res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if(res.success){
                        console.log("permissions received")
                        dispatch(success(employeeConstants.GET_PERMISSIONS_SUCCESS, res.data.permission));
                    }
                        
                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(employeeConstants.GET_PERMISSIONS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function getApplications() {
    return dispatch => {
        dispatch(request(employeeConstants.GET_APPLICATIONS_REQUEST))
        employeeService.getApplications()
            .then(
                res => {
                    if(res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if(res.success){
                        console.log("applications received")
                        dispatch(success(employeeConstants.GET_APPLICATIONS_SUCCESS, res.data));
                    }
                        
                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(employeeConstants.GET_APPLICATIONS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}


function editApplication(application) {
    return dispatch => {
        dispatch(request(employeeConstants.EDIT_APPLICATIONS_REQUEST))
        employeeService.editApplication(application)
            .then(
                res => {
                    if(res === undefined)
                        dispatch(alertActions.error('ارتباط با سرور برقرار نیست'));
                    else if(res.success){
                        console.log("applications received")
                        dispatch(success(employeeConstants.EDIT_APPLICATIONS_SUCCESS, res.data));
                        history.go(0)
                    }
                        
                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 1500);
                },
                error => {
                    dispatch(failure(employeeConstants.EDIT_APPLICATIONS_FAILURE, error.toString()));
                    console.log("occure error");
                    console.log(error.toString());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}


function request(type) {
    return { type: type }
}

function success(type, data) {
    return { type: type, data }
}

function failure(type, error) {
    return { type: type, error }
}