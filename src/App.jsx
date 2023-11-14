import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import GeneratorMainBlock from './components/GeneratorMainBlock/GeneratorMainBlock';
import LoginWithCode from './components/LoginWithCode';
import Toast from './components/shared/Toast';
import { removeSessionStorageItem } from './helpers/sessionStorage';
import { access_token } from './constants';
import { AppLayout } from './components/RoutesComponents/AppLayout';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      removeSessionStorageItem(access_token);
      navigate('/');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Toast />
      <Header />
      <Routes>
        <Route path="/" element={<LoginWithCode />} />
        <Route path="/app" element={<AppLayout />}>
          <Route path="/app" element={<GeneratorMainBlock />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
}

export default App;
