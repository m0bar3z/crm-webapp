import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderActions, customerActions  } from '../../actions';
import { Header } from '../base/header2';
import { Basket } from './basket';
import { Container , Form , Button , Row , Col, Alert, Spinner } from 'react-bootstrap';
import DatePicker from "react-multi-date-picker";
import moment from 'jalali-moment';
import "react-multi-date-picker/styles/layouts/mobile.css"

import downloadIcon from '../../assets/images/download.svg'

export const AddOrder = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    
    const [validated, setValidated] = useState(false);
    const [mobileValidated, setMobileValidated] = useState(false);
    const [order, insertOrder] = useState([])
    const [customer, setCustomer] = useState({})
    const dispatch = useDispatch()
    let oldCustomer = useSelector(state => state.getCustomer.customer)
    let addOrderLoading = useSelector(state => state.addOrder.loading)

    let mobileHandler = (value) => {
        let res = value.length === 11 && value[0] === "0" && value[1] === "9"
        if(res) {
            dispatch(customerActions.getCustomer(value))
            setMobileValidated(false)
            return value
        }
        else
            return undefined
    }

    let handleOldCustomer = (e) => {
        e.preventDefault()
        if(oldCustomer && Object.keys(oldCustomer).length !== 0) {
            setCustomer(oldCustomer)
            setMobileValidated(false);
        }
        else if(!customer.name && !customer.length) {
            setMobileValidated(true);
        }
    }

    let handleChange = (e) => {
        e.preventDefault()
        let value = e.target.value
        let name = e.target.name
        if(name === "mobile") {
            value = mobileHandler(value)
        } 
        setCustomer({...customer, [name]: value})
    }

    let formHandler = (e) => {
        e.preventDefault()
        if(order.length && customer.family && customer.mobile && customer.address && customer.duration) {
            dispatch(orderActions.addOrder(order, customer))
        } else {
            console.log('empty order can not be sent')
            setValidated(true);
        }
    }

    const submitCalendar = (value, name) => {
        let birthDate = `${value.year}/${value.month.number}/${value.day}`
        birthDate =  moment.from(birthDate, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD');
        setCustomer({...customer, [name]: birthDate})
    }

    useEffect(() => {
        if(addOrderLoading)
            insertOrder([])
    }, [addOrderLoading])

    return (
        <div className="order-page">
            <Header title="ثبت سفارش" backLink="/dashboard"/>
            <Container fluid className="pt-3 px-3 m-0">
                <Form onSubmit={formHandler} noValidate >
                    {console.log(addOrderLoading)}
                    {console.log(alerType)}
                    <Row className="m-0 p-0 order-inputs">
                        <Col className="p-0 col-5 add-order-input">
                            <Form.Group>
                                <Form.Label className="pe-2">موبایل</Form.Label>
                                <Form.Control className="order-input" type="number" name="mobile" 
                                isInvalid={((!customer.mobile && validated) || (mobileValidated) && true) } 
                                isValid={((customer.mobile && validated) || (mobileValidated && customer.mobile) && true)} 
                                onChange={handleChange}
                                value={customer.mobile} 
                                required
                                />
                            </Form.Group>
                        </Col>
                        <Col className="col-4 align-self-end">
                            <img src={downloadIcon} className="add-order-download-btn p-1" onClick={(e) => handleOldCustomer(e)} height="33vh" width="50vw" alt="down-icon"/>
                        </Col>
                    </Row>
                    <Row className="m-0 p-0 mt-2 order-inputs">
                        <Col className="p-0 col-5 add-order-input">
                            <Form.Group >
                                <Form.Label className="pe-2">نام</Form.Label>
                                <Form.Control className="order-input" type="text" name="family" 
                                onChange={handleChange} 
                                isInvalid={!customer.family && validated && true} 
                                isValid={customer.family && validated && true} 
                                value={customer.family} 
                                required
                            />
                            </Form.Group>
                        </Col> 
                        <Col className="p-0 col-5 me-auto add-order-input">
                            <Form.Group controlId="birthday">
                                <Form.Label className="pe-2">تاریخ تولد</Form.Label>
                                <DatePicker 
                                    style = {{
                                        width: "100%"
                                    }}
                                    inputClass="search-input"
                                    className="rmdp-mobile" 
                                    calendar="persian" 
                                    locale="fa" 
                                    value={customer.birthday !== "1900-01-01T05:42:13.845Z" && customer.birthday ? moment(customer.birthday, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD') : null}
                                    calendarPosition="auto-right" 
                                    editable={false} 
                                    animation
                                    maxDate={new Date()}
                                    onChange={value => submitCalendar(value, 'birthday')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="m-0 p-0 mt-2 order-inputs">
                        <Col className="p-0 col-5 add-order-input">
                            <Form.Group >
                                <Form.Label className="pe-2">آدرس</Form.Label>
                                <Form.Control className="order-input" type="text" name="address" 
                                onChange={handleChange} 
                                isInvalid={!customer.address && validated && true} 
                                isValid={customer.address && validated && true} 
                                value={customer.address} 
                            />
                            </Form.Group>
                        </Col> 
                        <Col className="p-0 col-5 add-order-input me-3">
                            <Form.Group >
                                <Form.Label className="pe-3"> آماده سازی:</Form.Label>
                                <Form.Control className="order-input me-2" type="number" min="0" name="duration" 
                                onChange={handleChange} 
                                isInvalid={!customer.duration && validated && true} 
                                isValid={customer.duration && validated && true} 
                                value={customer.duration}
                                required
                            />
                            </Form.Group>
                        </Col> 
                    </Row>

                    <Row className="m-0 mt-4 basketContainer">
                        <Col>
                            <Basket order={order} insertOrder={insertOrder} />
                        </Col>
                    </Row>

                    <Row className="m-0 order-input align-self-start me-3 flex-row">
                        <Form.Group controlId="reminder">
                            <Row>
                                <Col className="p-0 mt-3 col-3 order-inputs">
                                    <Form.Label className="pe-1">تاریخ یادآوری</Form.Label>
                                    <Form.Control className="text-center order-input" type="number" name="reminder" min="0" 
                                        onChange={handleChange} 
                                        isInvalid={false} 
                                        isValid={false} 
                                        value={customer.reminder}
                                    />
                                </Col>
                                <Col className="align-self-end mt-3 col-2">
                                    <span className="reminder-span" >روز دیگر</span>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Row>
                    
                    <Row className="m-0 mt-4 justify-content-center w-100">
                        <Col className="col-12">
                            {
                                addOrderLoading ? (
                                    <Button className="fw-bold order-submit border-0 w-100" size="lg" type="submit"  disabled>
                                        <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        در حال ثبت سفارش...
                                    </Button>
                                ) : (
                                    <Button className="fw-bold order-submit border-0 w-100" size="lg" type="submit" block>
                                        ثبت
                                    </Button>
                                )
                            }
                        </Col>
                    </Row>
                    {
                        alertMessage && 
                        <>
                        <div className="modal-backdrop show"></div>
                            <Row className="justify-content-center text-center ">
                                <Alert variant={alerType}>
                                    {alertMessage}
                                </Alert> 
                            </Row>
                        </>
                    }
                </Form>
            </Container>
        </div>
    )
}
