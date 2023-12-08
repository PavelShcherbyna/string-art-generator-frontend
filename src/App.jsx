import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import GeneratorMainBlock from './components/GeneratorMainBlock/GeneratorMainBlock';
import LoginWithCode from './components/LoginWithCode';
import Toast from './components/shared/Toast';
import { removeSessionStorageItem } from './helpers/sessionStorage';
import { access_token } from './constants';
import { AppLayout } from './components/RoutesComponents/AppLayout';
import SavedProjectsContainer from './components/SavedProjectsContainer';
import StepsPlayer from './components/StepsPlayer';
import Footer from './components/Footer';
import styled from 'styled-components';
import MusicPlayer from './components/MusicPlayer';

const AppWrap = styled.div`
  padding: 0 clamp(20px, 10vw, 160px);

  @media (max-width: 480px) {
    padding: 0 20px 60px;
  }
`;

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
      <AppWrap>
        <Header />
        <Routes>
          <Route path="/" element={<LoginWithCode />} />
          <Route path="/app" element={<AppLayout />}>
            <Route path="/app" element={<GeneratorMainBlock />} />
            <Route path="/app/saved" element={<SavedProjectsContainer />} />
            <Route path="/app/player" element={<StepsPlayer />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
        <MusicPlayer />
      </AppWrap>
      <Footer />
    </>
  );
}

export default App;
