import React from 'react';
import { useFormik } from 'formik';
import { AuthFormContainer } from '../reusableStyles';

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    // validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <AuthFormContainer>
      <h2>Signup</h2>
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
        <div className={'input-wrap'}>
          <label htmlFor="confirmPassword">Repeat password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <button type="submit" className={'form-submit-btn'}>
          Signup
        </button>

        <div className={'btm-link-wrap'}>
          <span>Already have an account? </span>
          <span className={'link'}>Login</span>
        </div>
      </form>
    </AuthFormContainer>
  );
};

export default Signup;
