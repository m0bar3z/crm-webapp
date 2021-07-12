import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Modal, Button, Row, Col, Form , Dropdown } from 'react-bootstrap'
import { discountActions } from '../../actions/discountActions';


import closeIcon from '../../assets/images/close.svg'
import spinnerIcon from './../../assets/images/sppiner.svg'

export const AddDiscount = (props) => {

    const [dimStatus, setDimStatus] = useState(false)
    const [filters, setFilters] = useState({"sms": false})
    const [selectedItem, setItem] = useState(-1)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        if(e.target.type === 'checkbox')
            setFilters({...filters, [e.target.name]: e.target.checked})
        else 
            setFilters({...filters, [e.target.name]: e.target.value})
        console.log(filters)
    }

    const handleDropdown = (n) => {
        setItem(n)
        setFilters({...filters, "type": n})
    }

    const formHandler = (e) => {
        e.preventDefault();
        setFilters({...filters, type: selectedItem})
        dispatch(discountActions.addDiscount(filters))
        props.onHide(false) 
    }


    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered className="mx-3 order-serach-modal"
        >
            <Modal.Body className="order-filter-body add-discount">
                <Button className="border-0 customer-modal-close" type="button"  onClick={e => props.onHide(false)}>
                    <img className="d-flex m-auto customer-modal-close-svg" src={closeIcon} alt="close-btn" />
                </Button>
                <Form onSubmit={formHandler} >
                    <Row className="my-3 justify-content-between">
                        <Col className="col-6 order-filter-input">
                            <Form.Group className="ms-2">
                                <Form.Label className="pe-2">نام تخفیف</Form.Label>
                                <Form.Control style={{"width":"94%"}} className="order-input h-100" type="text" name="name" min="0" value={filters.totalFrom} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col className="col-6 order-filter-input">
                            <Row>
                                <Col>
                                    <Form.Label className="pe-2">نوع </Form.Label>
                                </Col>
                                <Col className="ps-4 pt-1 text-start">
                                    <img className="me-auto" src={spinnerIcon} height="13px" alt="spinner-icon"/>
                                </Col>
                            </Row>
                            <Dropdown onToggle={(e) => setDimStatus(!dimStatus)} >
                                <Dropdown.Toggle className="d-flex order-filter-input">
                                    {selectedItem !== -1 ? <span>{selectedItem ? 'تولد' : 'فرد'}</span> : null}
                                </Dropdown.Toggle> 
                                <Dropdown.Menu className={`${dimStatus ? "dim" : ""} dropdownProductMenu`}>
                                    <Dropdown.Item onClick={() => handleDropdown(0)} >
                                        <Col className="text-end pe-1 order-filter-input">فرد</Col> 
                                    </Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item onClick={() => handleDropdown(1)} >
                                        <Col className="text-end pe-1 order-filter-input">تولد</Col>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                    </Row>
                    <Row className="my-3 justify-content-between">
                        {
                            !selectedItem 
                            ?<Col className="col-6 order-filter-input">
                                <Form.Group>
                                        <Form.Label className="pe-2">مشتری</Form.Label>
                                        <Form.Control style={{"width":"94%"}} className="order-input h-100" type="number" name="customer" value={filters.family} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            : null
                        }
                        <Col className="col-6 order-filter-input">
                            <Form.Group>
                                    <Form.Label className="pe-2">درصد تخفیف</Form.Label>
                                    <Form.Control style={{"width":"94%"}} className="order-input h-100" type="number" name="percentage" min="0" max="100" value={filters.family} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-6 order-filter-input mt-1 pe-4">
                            <Form.Group>
                                <Form.Check.Input name="sms" id="sms" defaultChecked={filters.sms} type="checkbox" className="border-1" onChange={handleChange}/>
                                <Form.Check.Label className="pe-2" htmlFor="sms">فرستادن sms</Form.Check.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="px-2 mt-4">
                        <Button className="order-filter-button" type="submit">اضافه</Button>
                    </Row>
                </Form> 
            </Modal.Body>
        </Modal>
    );
}