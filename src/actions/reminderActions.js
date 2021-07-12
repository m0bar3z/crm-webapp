import { reminderConstants } from '../constants';
import { reminderService } from '../services';
import { alertActions } from './alertActions';

export const reminderActions = {
    getReminders
};

function getReminders() {
    return dispatch => {
        dispatch(request(reminderConstants.GET_REMINDERS_REQUEST))
        reminderService.getReminders()
            .then(
                res => {
                    dispatch(success(reminderConstants.GET_REMINDERS_SUCCESS, res));
                    console.log("*********reminders received**********")
                    console.log(res)
                    dispatch(alertActions.success(res));
                },
                error => {
                    dispatch(failure(reminderConstants.GET_REMINDERS_FAILURE, error.toString()));
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