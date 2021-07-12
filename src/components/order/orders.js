import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row , Col, Container, Alert, Spinner } from 'react-bootstrap';

import { orderActions } from '../../actions';
import { Header } from '../base/serachHeader';
import { OrderSearch } from './search'
import { Order } from './order';
import { Delivery } from './delivery'
import { CancelOrder } from './cancelOrder'

export const Orders = () => {

    let alertMessage = useSelector(state => state.alert.message)
    let alerType = useSelector(state => state.alert.type)
    const [modalShow, setModalShow] = useState(false)
    const [deliveryShow, setDeliveryShow] = useState(false)
    const [cancelOrderShow, setCancelOrderShow] = useState(false)
    const [activeOrder, setActiveOrder] = useState({})
    const dispatch = useDispatch()
    const orders = useSelector(state => state.getOrders.orders)
    let orderLoading = useSelector(state => state.getOrders.loading)

    useEffect(() => {
        !cancelOrderShow && dispatch(orderActions.getOrders())
    }, [dispatch, cancelOrderShow])


    return (
        <div className="product-page orders ">
            <Header title="سفارش ها" modalShow={modalShow} setModalShow={setModalShow}/>
            <Container className="m-auto">
                {
                orderLoading &&
                    <Row>
                        <Col className="col-3 mt-2 m-auto ">
                            <Spinner className="m-auto d-block" animation="border" />
                        </Col>
                    </Row>
                }
                { 
                    (orders.length === 0 && !orderLoading) ? (
                        <Row className="justify-content-center align-items-center no-result-filter">
                            <Col className="col-8 text-center">
                                هیج نتیجه ای یافت نشد!
                            </Col>
                        </Row>
                    ) : null 
                }
                {(orders.length > 0) ? 
                    (orders.map((order, index) => <Order key={index} order={order} deliveryShow={deliveryShow} setDeliveryShow={setDeliveryShow} cancelOrderShow={cancelOrderShow} setCancelOrderShow={setCancelOrderShow} setActiveOrder={setActiveOrder} />))    
                    
                    : null}
                
                <OrderSearch show={modalShow} onHide={() => setModalShow(false)} />        
                <Delivery show={deliveryShow} onHide={() => setDeliveryShow(false)} />    
                <CancelOrder show={cancelOrderShow} onHide={() => setCancelOrderShow(false)} order={activeOrder} />    
            </Container>
        </div>
    )
}
