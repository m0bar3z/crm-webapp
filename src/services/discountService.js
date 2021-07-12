
import axios from 'axios';
import { SERVER_URL } from '../config';
import { authHeader } from '../helpers';
import { handleResponse, handleError } from '../helpers'

let baseRoute = SERVER_URL;

export const discountService = {
    getDiscounts,
    addDiscount,
};


function getDiscounts() {
    console.log("into discountService");

    const requestOptions = {
        headers: authHeader()
    };
    
    return axios
        .get(`${baseRoute}/discount`, requestOptions)
        .then(res => {
            console.log("res.user >> "); console.log(res.data.data);
            return handleResponse(res)
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status)
            }
        });
}


function addDiscount(discount) {
    console.log("into discountService");

    const requestOptions = {
        headers: authHeader()
    };

    return axios
        .post(`${baseRoute}/discount`, discount,{headers: requestOptions.headers} )
        .then(res => {
            console.log("res.user >> "); 
            console.log(res.data);
            return handleResponse(res)
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                handleError(error.response.status)
            }
        });
}

