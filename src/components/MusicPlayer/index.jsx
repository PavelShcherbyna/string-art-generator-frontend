import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useLocation } from 'react-router-dom';
import MusicPlayerContainer from './MusicPlayerContainer';

// TODO for now FadeIn animate component and react-spring in general is redundant. Re-check and delete it if it stay like this.
const FadeIn = ({ children }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 }
  });

  return <animated.div style={styles}>{children}</animated.div>;
};

export default function MusicPlayer() {
  const location = useLocation();
  const urlStr = location?.pathname || '';
  const allowedPage = urlStr.includes('/app');

  return (
    <>
      {allowedPage && (
        <FadeIn>
          <MusicPlayerContainer />
        </FadeIn>
      )}
    </>
  );
}
