import React from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { history } from '../../helpers';

//icons
import addOrderIcon from '../../assets/images/main/add-order.svg';


export const EmployeeApp = () => {
    return (
        <>
        <Row className="mb-3 pe-3 justify-content-center mt-4">
            <Col xs={10} className="me-4 ms-auto mt-3">
                <Card className="border-0 lh-lg main-card me-2 py-2" >
                    <Card.Body className="fs-6 fw-bold me-2">
                        <Row>
                            <Card.Text>
                                در انتظار قبول درخواست توسط آقا/خانم با شماره 
                            </Card.Text>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row className="my-3 pe-3 justify-content-center">
                <Col  xs={10}  className="">
                    <Button  className="no-product-main-button w-100 me-auto d-block p-2 px-0"  type="submit"  onClick={e  => history.push('/products')}>
                        <Row>
                            <Col xs={3} className="ms-4 pe-4"><img src={addOrderIcon}  alt="add-order-icon"  width="35px"/></Col>
                            <Col className="fs-6 me-0 text-end pt-1 pe-4">لغو درخواست</Col>
                        </Row>
                    </Button>
                </Col>
        </Row>
        </>
    )
}