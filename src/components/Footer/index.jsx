import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import HomeSVG from '../../assets/Home.svg';
import ShadedHomeSVG from '../../assets/Shaded_home.svg';
import BookmarkSVG from '../../assets/bookmark.svg';
import ShadedBookmarkSVG from '../../assets/Shaded_bookmark.svg';
import HelpIconSVG from '../../assets/help_icon.svg';
import { FooterWrapper } from './styles';

const Footer = () => {
  const location = useLocation();
  const urlStr = location?.pathname || '';
  const showComponent = urlStr.includes('/app');

  return (
    <>
      {showComponent ? (
        <FooterWrapper>
          <NavLink end to="/app" className={'nav-item-footer'}>
            {({ isActive }) => {
              return isActive ? (
                <img src={ShadedHomeSVG} alt="Shaded home icon" />
              ) : (
                <img src={HomeSVG} alt="Home icon" />
              );
            }}
          </NavLink>
          <NavLink to="/app/saved" className={'nav-item-footer'}>
            {({ isActive }) => {
              return isActive ? (
                <img src={ShadedBookmarkSVG} alt="Shaded bookmark icon" />
              ) : (
                <img src={BookmarkSVG} alt="Bookmark icon" />
              );
            }}
          </NavLink>
          <div className={'nav-item-footer'}>
            <img src={HelpIconSVG} alt="Help" />
          </div>
        </FooterWrapper>
      ) : null}
    </>
  );
};

export default Footer;
