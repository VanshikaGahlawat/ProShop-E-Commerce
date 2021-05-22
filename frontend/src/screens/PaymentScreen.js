import React, {useState}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = ({history }) => {

    const dispatch = useDispatch()
    const cart = useSelector( state => state.cart)
    const {shippingAddress} =cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod]=useState('PayPal')

    const submitHandler= (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
        <CheckOutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='paymentMethod'>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Col>
                    <Form.Check type='radio' value='PayPal' id='PayPal'
                    name='paymentMethod' label='PayPal or Credit card' 
                    checked onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
                    {/* <Form.Check type='radio' value='Stripe' id='Stripe'
                    name='paymentMethod' label='Stripe' 
                    checked onChange={e => setPaymentMethod(e.target.value)}></Form.Check> */}
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary' >Continue</Button>
        </Form>

        </FormContainer>
    )
}

export default PaymentScreen