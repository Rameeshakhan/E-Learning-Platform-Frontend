import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, getSingleUser } from '../redux/slices/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "../assets/css/login.module.css";
import loginIcon from "../assets/images/login.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [loadingText, setLoadingText] = useState('Login');

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values) => {
    try {
      setLoadingText('Loading...');
      const response = await dispatch(login(values));
      
      if (response.payload.success === true) {
        const user = response.payload.user;
        localStorage.setItem('user', JSON.stringify(user));
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const userResponse = await dispatch(getSingleUser(parsedUser.id));
        if (userResponse) {
          const role = userResponse.payload.role;
          console.log(role)
          localStorage.setItem('role', role);
          toast.success(response.payload.message, {
            onClose: () => {
              navigate('/dashboard');
              location.reload()
            },
          });
        } else {
          // toast.error("Login Error");
          toast.error(userResponse.payload.message);
          setLoadingText('Login');
        }
      } else if (response.payload.success === false) {
        toast.error(response.payload.message);
        setLoadingText('Login');
      }
    } catch (error) {
      toast.error(error.message);
      setLoadingText('Login');
    }
  };
  
  
  
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <img className={styles.loginIcon} src={loginIcon} alt="Login" />
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className={styles.loginForm}>
            <h3 className={styles.loginHeading}>Login</h3>
            <hr />
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
                aria-describedby="emailHelp"
              />
              <ErrorMessage name="email" component="div" className={styles.errormsg}/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
              />
              <ErrorMessage name="password" component="div" className={styles.errormsg} />
            </div>
            <p className={styles.frgtPass}>Forgot Password?</p>
            <button type="submit" className={styles.lgnBtn} disabled={isLoading}>
              {loadingText}
            </button>
            {/* {error && <p className={styles.errorMessage}>{error}</p>} */}
            <p onClick={() => navigate('/signup')} className={styles.registerOption}>
              Or Create Account here
            </p>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
