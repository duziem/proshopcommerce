import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { addToWishlist, removeFromWishlist } from '../actions/wishlistActions'

const WishlistScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);
  const {wishlistItems} = wishlist;

  useEffect(() => {
    if (productId) {
      dispatch(addToWishlist(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id))
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Saved Items</h1>
        {wishlistItems.length === 0 ? (
          <Message>
            You have no saved item <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {wishlistItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromWishlistHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button
                      type='button'
                      variant='dark'
                      disabled={item.countInStock === 0}
                      onClick={() => {
                        dispatch(
                          addToCart(item.product, item.qty)
                        )
                        removeFromWishlistHandler(item.product)
                      }}
                    >
                      Add To Cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

    </Row>
  )
}

export default WishlistScreen
