
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';

let baseRoute = SERVER_URL;

export const customerService = {
    getCustomers,
    getCustomer
};


function getCustomers(filter = {}) {
    console.log("into customerService");

    if(!filter.family)
        filter.family = " "
    if(!filter.mobile)
        filter.mobile = "0"
    if(!filter.createdAtFrom)
        filter.createdAtFrom = "1900-01-01T05:42:13.845Z"
    if(!filter.createdAtTo)
        filter.createdAtTo = "1900-01-01T05:42:13.845Z"
    if(!filter.lastBuyFrom)
        filter.lastBuyFrom = "1900-01-01T05:42:13.845Z"
    if(!filter.lastBuyTo)
        filter.lastBuyTo = "1900-01-01T05:42:13.845Z"
    if(!filter.orderFrom)
        filter.orderFrom = "0"
    if(!filter.orderTo)
        filter.orderTo = "0"
    if(!filter.totalFrom)
        filter.totalFrom = "0"
    if(!filter.totalTo)
        filter.totalTo = "0"

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .get(`${baseRoute}/customer/${encodeURI(filter.family)}/${encodeURI(filter.mobile)}/${encodeURI(filter.createdAtFrom)}/${encodeURI(filter.createdAtTo)}/${encodeURI(filter.lastBuyFrom)}/${encodeURI(filter.lastBuyTo)}/${encodeURI(filter.orderFrom)}/${encodeURI(filter.orderTo)}/${encodeURI(filter.totalFrom)}/${encodeURI(filter.totalTo)}`, requestOptions)
        .then(res => {
            console.log("res.customers >> "); console.log(res.data.data);
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });
}

function getCustomer(mobile) {
    console.log("into customerService");
    const requestOptions = {
        headers: authHeader()
    };
    return axios
        .get(`${baseRoute}/customer/${mobile}`, requestOptions)
        .then(res => {
            console.log("res.customer >> "); console.log(res.data.data);
            return res.data
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });
        
}