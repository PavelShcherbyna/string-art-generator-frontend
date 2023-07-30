import React from 'react';
import { useFormik } from 'formik';
import { AuthFormContainer } from '../reusableStyles';
import Checkbox from '@mui/material/Checkbox';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    // validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <AuthFormContainer>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={'input-wrap'}>
          <label htmlFor="email">User Name</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>

        <div className={'input-wrap'}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <div className={'add-control-wrap'}>
          <div>
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              disableRipple
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <span>Forgot Password?</span>
        </div>

        <button type="submit" className={'form-submit-btn'}>
          Login
        </button>

        <div className={'btm-link-wrap'}>
          <span>New User? </span>
          <span className={'link'}>Signup</span>
        </div>
      </form>
    </AuthFormContainer>
  );
};

export default Login;
