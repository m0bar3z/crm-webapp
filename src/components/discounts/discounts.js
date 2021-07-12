import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { discountActions } from '../../actions/discountActions';
import { Container } from 'react-bootstrap';
import { Header } from '../base/productHeader';

// components
import { Discount } from './discount'
import { AddDiscount } from './addDiscount';

export const Discounts = () => {

    const [modalShow, setModalShow] = useState(false)
    let discounts = useSelector(state => state.getDiscounts.discounts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(discountActions.getDiscounts());   
        
    }, [dispatch])


    return(
        <>
        <div className="product-page orders">
            <Header title="تخفیفات"  modalShow={modalShow} setModalShow={setModalShow} />
            <Container fluid className="m-auto">
                {
                    discounts
                    ? (discounts.map((discount, index) => <Discount key={index} discount={discount}/>))   
                    : null
                }
                {discounts?console.log(discounts):null   }
                <AddDiscount show={modalShow} onHide={() => setModalShow(false)} />    
            </Container>
        </div>
        </>
    )
}

