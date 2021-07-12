import React, { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../actions';
import { Form , Button , Row , Col, Modal, Spinner, Alert } from 'react-bootstrap';
import persianJs from 'persianjs/persian.min';

import closeIcon from '../../assets/images/close.svg'


export const AddProduct = (props) => {
    
    const [product, setProduct] = useState({})
    const addProductLoading = useSelector(state => state.addProduct.loading)
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()

    let handleChange = (e) => {
        if(e.target.id === 'sellingPrice' && e.target.value.length)
            e.target.value = persianJs(e.target.value).toEnglishNumber().toString();
        setProduct({...product, [e.target.id]: e.target.value})
    }

    let formHandler = (e) => {
        e.preventDefault()
        dispatch(productActions.addProduct(product))
    }

    useEffect(() => {
        setProduct()
    }, [])


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal"
            >
            <Modal.Body className="add-product px-4">
                <Button className="border-0 customer-modal-close" type="button"  onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                {
                    alert.message && 
                    <>
                        <div className="modal-backdrop show"></div>
                        <Row className="justify-content-center text-center ">
                            <Alert variant={alert.type}>
                                {alert.message}
                            </Alert> 
                        </Row>
                    </>
                }
                <Form onSubmit={formHandler} >
                    <Row className="mt-3">
                        <Col className="col-12 order-filter-input">
                            <Form.Group controlId="name">
                                <Form.Label className="pe-3">نام محصول</Form.Label>
                                <Form.Control className="order-input" type="text" value={addProductLoading ? "" : null} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="col-12 order-filter-input">
                            <Form.Group controlId="sellingPrice">
                                <Form.Label className="pe-3">قیمت (تومان)</Form.Label>
                                <Form.Control className="order-input" type="number" min="0" value={addProductLoading ? "" : null} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="description" className="order-filter-input mt-3">
                                <Form.Label className="pe-3">توضیحات</Form.Label>
                                <Form.Control className="order-input border-0 h-100" as="textarea" rows={6} value={addProductLoading ? "" : null} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                addProductLoading ? (
                                    <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit"  disabled>
                                        <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        در حال انجام عملیات...
                                    </Button>
                                ) : (
                                    <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit" block>
                                        ثبت
                                    </Button>
                                )
                            }
                        </Col>
                    </Row>
                </Form>
                
            </Modal.Body>
            
        </Modal>
    )
}
