import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {productList, productDetail, productDelete, productCreate, productUpdate, productReviewCreate} from './reducers/productListReducers'
import {cart} from './reducers/cartReducers'
import {userLogin, userRegister, userDetails, userUpdateProfile, userList, userDelete, userUpdate} from './reducers/userReducers'
import {orderCreate, orderDetails, orderPay, orderListMy, orderList, orderDeliver} from './reducers/orderReducers'

const reducers = combineReducers({
    productList,
    productDetail,
    cart,
    userLogin,
    userRegister,
    userDetails,
    userUpdateProfile,
    orderCreate,
    orderDetails,
    orderPay,
    orderListMy,
    userList,
    userDelete,
    userUpdate,
    productDelete,
    productCreate,
    productUpdate,
    orderList,
    orderDeliver,
    productReviewCreate
})

const cartItemsFromStorage= localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState= {
    cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin:{userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store