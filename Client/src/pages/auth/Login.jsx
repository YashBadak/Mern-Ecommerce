import CommonForm from '@/components/common/CommonForm';
import { loginFormControl, registerFormControl } from '@/config';
import { loginUser } from '@/store/AuthSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';


const initialState={
  email: '',
  password: '',
}
function Login() {
    const [formData, setFormData]=useState(initialState);
    const dispatch=useDispatch();

    const onsubmit=(event)=>{
      event.preventDefault();
      dispatch(loginUser(formData)).then((data)=>{
         if(data?.payload?.success){ 
        toast(data?.payload?.message)
      }else{
        toast("Incorrect Data")
      }
      })



}

  return (
   <div className='mx-auto w-full mx-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign In To Your Account</h1>
        <p className='mt-2'>Create New Account
          <Link className='text-primary ml-2 font-medium hover:underline' to='/auth/register'>Register</Link>
        </p>

      </div>
      <CommonForm
      formControls={loginFormControl}
      buttonText='Sign in'
      formData={formData}
      setFormData={setFormData}
      onSubmit={onsubmit}

      />

    </div>
  )
}

export default Login