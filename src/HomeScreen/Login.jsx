import React, { useState ,useContext} from 'react';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import {Link} from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import './Login.css';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  setPassword: yup.string().min(4).max(15).required(),
})

const Login = () => {
   const {register,handleSubmit,formState:{errors}} = useForm({
         resolver:yupResolver(schema)
   })
  const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null)
  const {setUser} = useContext(UserContext)
  const HandleSubmit = async (data) => {
    const { email, setPassword } = data;

      try {
        const response = await axios.post('http://localhost:3770/login', {
          email,
          setPassword
        });
        console.log(response.data)
        const delay = 2000;
        if (response.data.email) {
          setData(response.data);
          setUser(response.data)
          const timeId = setTimeout(() => {
             navigate('/')
          }, delay);
          return () => clearTimeout(timeId);
        } else {
          setData(response.data)
          navigate('/login')
        }
      } catch (error) {
        console.log(error);
      }
    
  }
  console.log(data)
  return (
    <Container className='justify-content-center mt-5'>
      <Form className='justify-content-center mt-3 custom-form'>
        <h2 className='text-center mb-2'> Login Form</h2>
        {data?.email ? <p className=' text-center login'>Login Successfully</p> : <p className='text-center login'>{ data}</p>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className='color:black font-weight-bold'>Email address</Form.Label>
          <Form.Control type="email" placeholder="e.g name@example.com" autocomplete='off'  name='email'{...register('email')} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <p className='main__errors'>{errors.email && 'Enter a valid Email'}</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className='color:black font-weight-bold'>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="e.g Johndoe123" autocomplete='off'  name='setPassword' {...register('setPassword')} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <p className='main__errors'>{errors.setPassword && 'Enter a valid password'}</p>
        <Row className='text-center'>
          <Button variant='success' className='form-button text-center mt-2' onClick={handleSubmit(HandleSubmit)}>Login</Button>
          <Row className='text-center mt-2'>
            <p>Dont have an account?</p>
            <Link to='/register' className='text-center'>Register</Link>
          </Row>
        </Row>
       </Form>
    </Container>
  )
}

export default Login