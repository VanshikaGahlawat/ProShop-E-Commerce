import {PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_SUCCESS, 
    PRODUCT_DETAIL_FAIL, 
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL} from '../constants'
import axios from 'axios'

export const listProducts =() => async dispatch => {
    try {

        dispatch({
            type:PRODUCT_LIST_REQUEST
        })

        const {data} = await axios.get('/api/products')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const listProductDetail =(id) => async dispatch => {
    try {

        dispatch({
            type:PRODUCT_DETAIL_REQUEST
        })

        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type:PRODUCT_DETAIL_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const deleteProduct =(id) => async (dispatch, getState) => {
    try {

        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
    } catch (err) {
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}