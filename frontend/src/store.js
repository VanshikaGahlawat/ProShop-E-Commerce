import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {productList, productDetail} from './reducers/productListReducers'
import {cart} from './reducers/cartReducers'

const reducers = combineReducers({
    productList,
    productDetail,
    cart
})

const cartItemsFromStorage= localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState= {
    cart: {cartItems: cartItemsFromStorage}
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store