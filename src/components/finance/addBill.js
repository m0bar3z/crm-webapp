import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form , Button , Row , Col, Modal } from 'react-bootstrap';
import closeIcon from '../../assets/images/close.svg'



//actions
import { financeActions } from '../../actions'

export const AddBill = (props) => {

    const [inputs, setInputs] = useState({});
    const { name, cost } = inputs
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputs(inputs => ({ ...inputs, [id]: value }));
    }

    const formHandler = e => {
        e.preventDefault();
        name && cost && dispatch(financeActions.addBill(inputs)); 
        props.onHide(false)       
    } 

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="mx-3 order-serach-modal"
            >
            <Modal.Body className="add-product px-3">
                <Button className="border-0 customer-modal-close" type="button"  onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                <Form onSubmit={formHandler} >
                    <Row className="">
                        <Col xs={9} className="order-filter-input">
                            <Form.Group controlId="name">
                                <Form.Label className="pe-3">نام هزینه</Form.Label>
                                <Form.Control className="order-input" type="text" onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={9} className="order-filter-input">
                            <Form.Group controlId="cost">
                                <Form.Label className="pe-3">میزان هزینه</Form.Label>
                                <Form.Control className="order-input" type="number" min="0" onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col>
                            <Button className="add-product-btn mt-4 w-100 h-75 p-1" type="submit" >ثبت</Button>
                        </Col>
                    </Row>
                </Form>
                
            </Modal.Body>
            
        </Modal>
    )
}