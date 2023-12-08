import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import HomeSVG from '../../assets/Home.svg';
import ShadedHomeSVG from '../../assets/Shaded_home.svg';
import BookmarkSVG from '../../assets/bookmark.svg';
import ShadedBookmarkSVG from '../../assets/Shaded_bookmark.svg';
import HelpIconSVG from '../../assets/help_icon.svg';
import noteSVG from '../../assets/note.svg';
import shadedNoteSVG from '../../assets/Shaded_note.svg';
import { FooterWrapper } from './styles';
import { openMusicPlayer } from '../../store/audioData/slice';

const Footer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { showMusicPlayer } = useSelector((state) => state.audioData);
  const urlStr = location?.pathname || '';
  const showComponent = urlStr.includes('/app');

  return (
    <>
      {showComponent ? (
        <FooterWrapper>
          <button
            className={cn('nav-item-footer', {
              active: showMusicPlayer
            })}
            onClick={() => dispatch(openMusicPlayer())}
          >
            {showMusicPlayer ? (
              <img src={shadedNoteSVG} alt="Shaded note" draggable={false} />
            ) : (
              <img src={noteSVG} alt="Note" draggable={false} />
            )}
          </button>
          <NavLink end to="/app" className={'nav-item-footer'}>
            {({ isActive }) => {
              return isActive ? (
                <img
                  src={ShadedHomeSVG}
                  alt="Shaded home icon"
                  draggable={false}
                />
              ) : (
                <img src={HomeSVG} alt="Home icon" draggable={false} />
              );
            }}
          </NavLink>
          <NavLink to="/app/saved" className={'nav-item-footer'}>
            {({ isActive }) => {
              return isActive ? (
                <img
                  src={ShadedBookmarkSVG}
                  alt="Shaded bookmark icon"
                  draggable={false}
                />
              ) : (
                <img src={BookmarkSVG} alt="Bookmark icon" draggable={false} />
              );
            }}
          </NavLink>
          <div className={'nav-item-footer'}>
            <img src={HelpIconSVG} alt="Help" draggable={false} />
          </div>
        </FooterWrapper>
      ) : null}
    </>
  );
};

export default Footer;
