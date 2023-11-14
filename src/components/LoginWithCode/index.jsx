import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AuthWithCodePageWrap } from './styles';
import { ButtonWithBorder } from '../reusableStyles';
import HelpIconSVG from '../../assets/help_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSessionStorageItem } from '../../helpers/sessionStorage';
import { access_token } from '../../constants';
import { loginUser } from '../../store/userData/slice';
import { Progress } from '../Progress/Progress';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Слишком короткий код!')
    .max(6, 'Слишком длинный код!')
    .required('Введите код!')
});

const EnterBlock = ({ setStep }) => {
  return (
    <div className={'enter-block-wrap'}>
      <ButtonWithBorder
        className={'font18 hover-black'}
        onClick={() => setStep(1)}
      >
        Войти
      </ButtonWithBorder>
      <div className={'instruction'}>
        <img src={HelpIconSVG} alt="question mark" />
        <span>ИНСТРУКЦИЯ</span>
      </div>
    </div>
  );
};

const LoginWithCode = () => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const paramsCode = searchParams.get('code');

  const navigate = useNavigate();
  const { isLoggedIn, loginLoading } = useSelector((state) => state.userData);
  const token = getSessionStorageItem(access_token);

  useEffect(() => {
    if (paramsCode && paramsCode.replace(/\D/g, '').length === 6) {
      console.log('GOT CODE FROM URL!');
      dispatch(loginUser({ password: paramsCode }));
    }
  }, [dispatch, paramsCode]);

  useEffect(() => {
    if (isLoggedIn || token) {
      navigate('/app');
    }
  }, [isLoggedIn, navigate, token]);

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    }
  });

  function onChangeFormat(value) {
    return value.replace(/\D/g, '').slice(0, 6);
  }

  function valueFormat(value) {
    return value.length > 3 ? `${value.slice(0, 3)}-${value.slice(3)}` : value;
  }

  return (
    <AuthWithCodePageWrap>
      {loginLoading && <Progress />}
      {!loginLoading && step === 1 && (
        <form onSubmit={formik.handleSubmit}>
          <div className={'input-wrap'}>
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Внести код"
              onChange={(e) =>
                formik.setFieldValue('password', onChangeFormat(e.target.value))
              }
              value={valueFormat(formik.values.password)}
            />
            {/*{formik.errors.password ? <span className={'err-msg'}>{formik.errors.password}</span> : null}*/}
          </div>

          <ButtonWithBorder type="submit" className={'font18 hover-black'}>
            Далее
          </ButtonWithBorder>
        </form>
      )}
      {!loginLoading && step !== 1 && <EnterBlock setStep={setStep} />}
    </AuthWithCodePageWrap>
  );
};

export default LoginWithCode;
