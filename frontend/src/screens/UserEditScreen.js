import React, {useState, useEffect}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getUserDetails, updateUser} from '../actions/userActions'
import {Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {USER_UPDATE_RESET} from '../constants'

const UserEditScreen = ({match, history}) => {

    const userId= match.params.id

    const [name, setName] = useState('')
    const [email, setEmail]= useState('')
    const [isAdmin, setIsAdmin]= useState(false)


    const dispatch = useDispatch()
    const userDetails = useSelector( state => state.userDetails)
    const {loading, user, error} = userDetails

    const userUpdate = useSelector( state => state.userUpdate)
    const {loading: loadingUpdate, success:successUpdate, error:errorUpdate} = userUpdate
    
    const submitHandler= (e) =>{
        e.preventDefault()
        dispatch(updateUser({_id:userId, name, email, isAdmin}))
    }

    useEffect(() =>{

        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        } else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            } else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

        
    },[dispatch, user, userId, successUpdate, history])
    
    return (
        < >
        <Link to='/admin/userlist' className='btn btn-light my-3'>
            Go back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loadingUpdate && <Loader />}
            {loading ? <Loader />: error ? <Message variant='danger'>{error}</Message>: (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={ e => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={ e => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='isAdmin'>
                    <Form.Control type='checkbox' label='Is Admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}></Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='primary'>Update</Button>
                </Form>
            )}
        </FormContainer>
        </>
        
    )
}

export default UserEditScreen
