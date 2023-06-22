import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/css/signup.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    role: Yup.string().required('Role is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const action = await dispatch(signup(values));
        if (signup.fulfilled.match(action)) {
          const response = action.payload;
          if (response.success === true) {
            toast.success('User signed up successfully!', {
              onClose: () => navigate('/login')
            });
          } else {
            toast.error(response.message || 'Failed to sign up. Please try again.');
          }
        }
      } catch (error) {
        toast.error(error.message || 'Failed to sign up. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    
    
  });

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <FaArrowLeft onClick={() => navigate('/login')} />
          <h2 style={{ display: 'inline-block', paddingLeft: '20px' }}>Create Account</h2>
        </div>
        <div className={styles.signupBody}>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className={styles.error}>{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
              >
                <option disabled value="">
                  Select your Role
                </option>
                <option value="Student">Student</option>
                <option value="Tutor">Tutor</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className={styles.error}>{formik.errors.role}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
            </div>
            <button type="submit" className={styles.registerBtn} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
