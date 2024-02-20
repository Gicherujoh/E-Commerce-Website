import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import {useNavigate,Link} from 'react-router-dom'
import * as yup from 'yup';
import axios from 'axios';
import {yupResolver} from '@hookform/resolvers/yup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import './Register.css';
const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone:yup.number().min(10).required(),
  setPassword: yup.string().min(4).max(15).required(),
  confirmPassword:yup.string().oneOf([yup.ref('setPassword'),null])
})
const Register = () => {
   const {register,handleSubmit,formState:{errors}} = useForm({
         resolver:yupResolver(schema)
   })
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]= useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState(null);
  const [show,setShow] = useState(true)
  const HandleSubmit =async(data) => {
    const { name, email, setPassword, phone } = data;
    try {
      const response = await axios.post('http://localhost:3770/register', {
          name,
          email,
          phone,
          setPassword
         })
      const delay = 2000;
      if (response.data) {
           setData(response.data);
           setShow(true)
           const timerId = setTimeout(() => {
              navigate('/')
           }, delay)
            return ()=>clearTimeout(timerId)
      }
    } catch (error) {
        console.log(error)
     }
  }
  return (
        <Container className='justify-content-center mt-5'>
      <Form className='justify-content-center mt-3 custom-form'>
        <h2 className='text-center mb-2'> Register Form</h2>
        {data?.email && <p className=' text-center register'>Registered Successfully</p>}
      
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className='color:black font-weight-bold'>Name</Form.Label>
          <Form.Control type="text" placeholder="e.g John Doe" name='name' autocomplete='off'  {...register('name')} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
        <p className='main__errors'>{errors.name && 'Name is a required field'}</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className='color:black font-weight-bold'>Email address</Form.Label>
          <Form.Control type="email" placeholder="e.g name@example.com" autocomplete='off'  name='email'{...register('email')} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <p className='main__errors'>{errors.email && 'Enter a valid Email'}</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className='color:black font-weight-bold'>Phone</Form.Label>
          <Form.Control type="number" placeholder="e.g name@example.com" autocomplete='off'  name='phone' {...register('phone')} onChange={(e)=>setPhone(e.target.value)}/>
        </Form.Group>
        <p className='main__errors'>{errors.phone && 'Enter a valid Phone Number'}</p>
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className='color:black font-weight-bold'>Set Password</Form.Label>
          <Form.Control type="password" placeholder="e.g Johndoe123" autocomplete='off'  name='setPassword' {...register('setPassword')} onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <p className='main__errors'>{errors.setPassword && 'Password Should be more than 4 Characters' }</p>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className='color:black font-weight-bold'>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="e.g Johndoe123" autocomplete='off'  name='confirmPassword' {...register('confirmPassword')} onChange={(e)=>setConfirmPassword(e.target.value)} />
        </Form.Group>
        <p className='main__errors'>{errors.confir && 'is a required field and should match'}</p>
        <div className='text-center form-button'>
          <Button variant='success' className='form-button text-center mt-2' onClick={handleSubmit(HandleSubmit)}>Register</Button>
          <div className='login-account'>
            <p>Have an account?</p>
            <Link to='/login' className='login-link'>Login</Link>
          </div>
        </div>
        
      </Form>
    </Container>
  )
}

export default Register