import React, { useState } from 'react'
import { Modal, Row, Col, Button, Form } from 'react-bootstrap'

import closeIcon from '../../assets/images/close.svg'

export const Delivery = (props) => {

    const [deliveryMobile, setDeliveryMobile] = useState(false)    
    const handleChange = (e) => {
        e.preventDefault()
        setDeliveryMobile({...deliveryMobile, [e.target.name]: e.target.value})
    }


    const formHandler = (e) => {
        e.preventDefault()
    }

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
                
                <Form onSubmit={formHandler} >
                    <Row className="mt-3">
                        <Col className="order-filter-input">
                            <Form.Group controlId="mobile">
                                <Form.Label className="pe-3">شماره موبایل را وارد کنید:</Form.Label>
                                <Form.Control className="order-input" type="number" name="mobile" onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col className="col-6 m-auto">
                        <Button className="fw-bold order-submit border-0 w-100 mt-4" size="lg" type="submit" block>
                            ارسال پیامک
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
