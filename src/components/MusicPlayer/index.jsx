import React from 'react';
import { useSelector } from 'react-redux';
import { useSpring, animated } from '@react-spring/web';
import { useLocation } from 'react-router-dom';
import MusicPlayerContainer from './MusicPlayerContainer';

const FadeIn = ({ children }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 }
  });

  return <animated.div style={styles}>{children}</animated.div>;
};

export default function MusicPlayer() {
  const { showMusicPlayer } = useSelector((state) => state.audioData);

  const location = useLocation();
  const urlStr = location?.pathname || '';
  const allowedPage = urlStr.includes('/app');

  return (
    <>
      {showMusicPlayer && allowedPage && (
        <FadeIn>
          <MusicPlayerContainer />
        </FadeIn>
      )}
    </>
  );
}
