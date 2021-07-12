
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';


let baseRoute = SERVER_URL;
const requestOptions = {
    headers: authHeader()
};

export const financeService = {
    getFinanceSummary,
    getBills,
    addBill
};


function getFinanceSummary() {
    console.log("into financeService");
    return axios
        .get(`${baseRoute}/finance/summary`, requestOptions)
        .then(res => {
            console.log("res.finance >> "); console.log(res.data.data);
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });
}

function getBills() {
    console.log("into financeService");
    return axios
        .get(`${baseRoute}/finance/bill`, requestOptions)
        .then(res => {
            console.log("res.bills >> "); console.log(res.data.data);
            return res.data.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });
}

function addBill(bill) {
    console.log("into financeService");

    return axios
        .post(`${baseRoute}/finance/bill`, bill , {headers: requestOptions.headers})
        .then(res => {
            return res.data.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });
}

