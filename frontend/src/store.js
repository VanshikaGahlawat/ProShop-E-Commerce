import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {productList, productDetail} from './reducers/productListReducers'

const reducers = combineReducers({
    productList,
    productDetail
})
const initialState= {}
const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store