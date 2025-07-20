import CommonForm from '@/components/common/CommonForm';
import { registerFormControl } from '@/config';
import { registerUser } from '@/store/AuthSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

const initialState={
  userName: '',
  email: '',
  password: '',
}
function Register() {
  const [formData, setFormData]=useState(initialState);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const onSubmit=(event)=>{
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload?.success){ 
        toast(data?.payload?.message)
        navigate('/auth/login')
      }else{
        toast(data?.payload?.message)
      }
    })

}

  return (
    <div className='mx-auto w-full mx-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
        <p className='mt-2'>Already Have An Account
          <Link className='text-primary ml-2 font-medium hover:underline' to='/auth/login'>Login</Link>
        </p>

      </div>
      <CommonForm
      formControls={registerFormControl}
      buttonText='SignUp'
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}

      />

    </div>
  )
}

export default Register