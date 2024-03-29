import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions/userActions';
import { Container, Button, Form, Row, Col, Image, Alert, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap';

import logo from './../assets/images/crm.svg'
import userLogo from './../assets/images/user.svg'
import mobileLogo from './../assets/images/phone.svg'
import emailLogo from './../assets/images/emaill.svg'
import companyLogo from './../assets/images/company-name.svg'
import passwordLogo from './../assets/images/password.svg'
import notSeenIcon from '../assets/images/Not-seen.svg'
import beSeenIcon from '../assets/images/be-seen.svg'
import persianJs from 'persianjs/persian.min';


export const EmployeeRegister = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    let registerLoading = useSelector(state => state.register.loading)
    let verificationCode = useSelector(state => state.verificationCode)
    
    const [showPassword, setShowPassword] = useState(false)
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({ username: '', password: '', position: 2 });
    const { name, family, password, email, mobile, position, code, employerMobile } = inputs;
    const dispatch = useDispatch()

    const mobileHandler = (value) => {
        let res = value.length === 11 && value[0] === "0" && value[1] === "9"
        if(res)
            return value
        else
            return false
    }

    const emailHandler = (value) => {
        let res = value.indexOf('@') > 2
        if(res)
            return value
        if(!value.length)
            return undefined
        else
            return false
    }

    const passwordHandler = (value) => {
        let res = value.length > 3 
        if(res)
            return value
        else 
            return false
    }

    const handleChange = (e) => {
        let { id, value } = e.target;
        if(id === "email")
            value = emailHandler(value)
        if(id === "mobile" || id === "employerMobile")
            value = mobileHandler(value)
        if(id === "password")
            value = passwordHandler(value)

        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    const codeHandler = (e) => {
        e.preventDefault()
        mobile && dispatch(userActions.verificationCode(mobile))
    }

    const formHandeler = e => {
        e.preventDefault();
         
        let user = { family, password, email, employerMobile, position, mobile, code };
        
        if(email != false && family && password && mobile && code && employerMobile)
            dispatch(userActions.register(user));
        else 
            setValidated(true);
    }

    return (
        <div className="form-page">
            <div id="triangle-up"></div>
            <Container fluid className="p-0 d-flex flex-column">
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
                <Row className="p-0 m-0 mzLogo">
                    <Col className="">
                        <img className="logo" src={logo} alt="logo" width="168px"/>
                    </Col>
                </Row>
                <Row className="ms-0 registerForm mt-5">
                    <Col>
                        <Form className="d-flex flex-column" noValidate onSubmit={formHandeler}>
                            <Row className="w-100 me-2 pe-2 form-label ">
                                <Col>
                                    <Form.Group controlId="family" >
                                        <Image src={userLogo} width="17px" className="mx-2"/>
                                        <Form.Label>نام و نام خانوادگی</Form.Label>
                                        <Form.Control className="form-input w-100 login-input" type="text" 
                                        onChange={handleChange} 
                                        isValid={inputs.family && validated && true}
                                        isInvalid={!inputs.family && validated && true}
                                        required 
                                        />
                                    <Form.Control.Feedback className="me-2" type="invalid">نام و نام خانوادگی خود را وارد کنید!</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="mobile" >
                                        <Image src={mobileLogo} width="17px" className="mx-2"/>
                                        <Form.Label>موبایل</Form.Label>
                                        <Form.Control className="form-input w-100 login-input" type="number" 
                                        onChange={handleChange}  
                                        isValid={inputs.mobile && inputs.mobile != false && validated && true}
                                        isInvalid={!inputs.mobile && validated && true}
                                        required/>
                                    <Form.Control.Feedback className="me-2" type="invalid">شماره موبایل صحیح نیست!</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="w-100 me-2 pe-2 form-label mt-2">
                                <Col >
                                    <Form.Group controlId="email">
                                        <Image src={emailLogo} width="17px" className="mx-2"/>
                                        <Form.Label>ایمیل</Form.Label>
                                        <Form.Control className="form-input w-100 login-input" type="email" 
                                        isValid={inputs.email && inputs.email != false && validated && true}
                                        isInvalid={inputs.email === false && validated && true} 
                                        onChange={handleChange} 
                                        />
                                        <Form.Control.Feedback className="me-2" type="invalid">ایمیل بدرستی وارد نشده است!</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Row className="w-100 me-2 pe-2 form-label mt-2">
                                <Col className="col-8">
                                    <Form.Group controlId="code">
                                        <Image src={passwordLogo} width="17px" className="mx-2"/>
                                        <Form.Label>کد تایید</Form.Label>
                                        <Form.Control className= "form-input w-100 login-input" type="number"
                                        isValid={code && validated && true}
                                        isInvalid={!code && validated && true}
                                        onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-auto col-3">
                                    <Button className="verification-btn" onClick={codeHandler}>{verificationCode.loading ?  <Spinner animation="border" size="sm" /> : "ارسال کد"}</Button>
                                </Col>
                            </Row>

                            <Row className="w-100 me-2 pe-2 form-label mt-2">
                                <Col className="col-6">
                                    <Form.Group controlId="employerMobile" >
                                        <Image src={mobileLogo} width="17px" className="mx-2"/>
                                        <Form.Label>موبایل کارفرما</Form.Label>
                                        <Form.Control className="form-input w-100 login-input" type="number" 
                                        isValid={employerMobile && validated && true}
                                        isInvalid={!employerMobile && validated && true}
                                        onChange={handleChange}
                                        required
                                        />
                                    </Form.Group>
                                </Col>
                                
                                <Col>
                                    <Form.Group className="inputWithButton w-100 login-input" controlId="password" >
                                        <Image src={passwordLogo} width="17px" className="mx-2"/>
                                        <Form.Label >رمز عبور</Form.Label>
                                        <img src={showPassword ? beSeenIcon : notSeenIcon} onClick={(e) => setShowPassword(!showPassword)} height="25px" className="eye-button" />
                                        <Form.Control className="w-100 eye-input form-input login-input" type={`${showPassword ? "text" : "password"}`}  
                                        isValid={inputs.password && inputs.password != false && validated && true}
                                        isInvalid = {!inputs.password && validated && true}
                                        onChange={handleChange}  
                                        required
                                        />
                                        <Form.Control.Feedback className="me-2" type="invalid">رمز عبور طولانی تری انتخاب کنید!</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="w-100 me-0">
                                <Col className="mt-4 employee-register-link">
                                    <a href="/">قبلا ثبت نام شده اید؟</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button className="employee-register-submit-btn m-auto d-block" type="submit">{registerLoading ?  <Spinner animation="border" /> : "ثبت نام"}</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
            <div id="triangle-down"></div>
        </div>
    )
}

