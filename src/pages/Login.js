import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import instance from '../axios/instance';
import { useNavigate } from 'react-router-dom';


const Login = props => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const {

      mutate,

    } = useMutation({
        mutationFn: async (payload) => {
        const response = await instance.post('/auth/login', payload)
        
        return response;
      },
    });



    
    const onSubmit = ({email, password}) => {
      mutate(
        { email, password },
        {
          onSuccess: (variables) => {
            const { data } = variables;
            if (data) {
              const { jwtToken } = data;

              localStorage.setItem("JWT_TOKEN", jwtToken);
              navigate('/home')
            }
          }
        }
      );
    }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Enter your email address' {...register("email")} />

        <input placeholder='Enter your password' {...register("password")} />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

Login.propTypes = {}

export default Login