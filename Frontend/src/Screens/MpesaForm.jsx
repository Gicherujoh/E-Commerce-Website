import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import './MpesaForm.css'
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const schema = yup.object().shape({
    phone: yup.number().min(10).required(),
    amount: yup.number().required().min(1)
})
const MpesaForm = () => {
    const { register,handleSubmit,formState:{errors}} = useForm({
        resolver:yupResolver(schema)
    })
    const [phone,setPhone] = useState();
    const [total,setTotal] = useState();
  let result = "Result Cancelled by the User";
  let response = "Payment SucessFull";
    const { amount,product } = useSelector((store) => store.products)
    console.log(amount)
    const HandleSubmit = async(data) => {
      const { phone, amount } = data;
      try {
        const response = await axios.post('http://localhost:3770/callback', {
          phone,
          amount
        });
        if (response?.data) {
          console.log(response);
          }
      } catch (err) {
          console.log(err)
        }
    }
  return (
    <Container className='justify-content-center mt-5'>
      <Row>
        <p className='mpesa-response'>{ result}</p>
          </Row>
          <Row>
                <p className='mb-3 amount-header'>Amount to be Deposited Ksh <span className='amount'>{ amount}</span></p>
          </Row>
        <Form className='custom-form'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='form-label'>Phone Number</Form.Label>
        <Form.Control type="email" placeholder="Enter Phone" name='phone' autocomplete='off' {...register('phone')}onChange={(e)=>setTotal(e.target.value)}/>
      </Form.Group>
         <p className='main__errors'>{errors.phone && 'Enter a valid Phone Number'}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='form-label'>Amount</Form.Label>
        <Form.Control type="text" placeholder=" Enter Amount" name='amount' autocomplete='off' {...register('amount')} onChange={(e)=>setTotal(e.target.value)}/>
              </Form.Group> 
               <p className='main__errors'>{errors.amount && 'Amount cannot be 0'}</p>
              <div>
                  <Button variant='success' className='form-button text-center mt-2' onClick={handleSubmit(HandleSubmit)}>Deposit</Button>
              </div>
    </Form>       
    </Container>
  )
}

export default MpesaForm