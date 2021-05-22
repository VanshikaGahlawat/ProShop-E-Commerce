import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {productList, productDetail} from './reducers/productListReducers'
import {cart} from './reducers/cartReducers'
import {userLogin, userRegister, userDetails, userUpdateProfile} from './reducers/userReducers'

const reducers = combineReducers({
    productList,
    productDetail,
    cart,
    userLogin,
    userRegister,
    userDetails,
    userUpdateProfile
})

const cartItemsFromStorage= localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState= {
    cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin:{userinfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store