import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, FormControl, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetail, createProductReview} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants'


const ProductScreen = ({ match, history }) => {
  
  const [qty, setQty]= useState(1)
  const [rating, setRating]= useState(0)
  const [comment, setComment]= useState('')

  const dispatch= useDispatch()
  const productDetail= useSelector( state => state.productDetail)
  const {loading, error, product} = productDetail

  const productReviewCreate= useSelector( state => state.productReviewCreate)
  const {success: successReview, error: errorReview} = productReviewCreate

  const {userInfo} = useSelector(state => state.userLogin)

  useEffect(() =>{
    if(successReview){
      alert('Review Created!')
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    if(product._id !== match.params.id){
    dispatch(listProductDetail(match.params.id))
    }
  },[dispatch, match, product._id, successReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler= (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, {rating, comment}))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? <Loader /> : error? <Message variant='danger'>{error}</Message>: (
        <>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 &&(
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>
                    <FormControl as='select' value={qty} onChange= { e => setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map(x => (
                        <option key={x+1} value={x+1}>{x+1}</option>
                      ))}
                    </FormControl>
                    </Col>
                  </Row>
                </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}> 
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}/>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer Review</h2>
                  {errorReview && <Message variant='danger'>{errorReview}</Message>}
                  {userInfo ? (<Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as='select' value={rating} onChange={e => setRating(e.target.value)}>
                        <option value=''>Select</option>
                        <option value='1'>1- poor</option>
                        <option value='2'>2- fair</option>
                        <option value='3'>3- good</option>
                        <option value='4'>4- very good</option>
                        <option value='5'>5- excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                    <Form.Label>Rating</Form.Label>
                      <Form.Control as='textarea' value={comment} row={3} onChange={e => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Submit</Button>
                  </Form>): <Message>Please <Link to='/login'> sign in</Link> to write a review</Message>}
                </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
      )}
    </>
  )
}

export default ProductScreen
