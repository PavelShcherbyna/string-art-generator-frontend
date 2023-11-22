import React from 'react';
import { HeaderContainer } from './styles';
import RomanFlagSVG from '../../assets/roman_flag.svg';
import MainLogo from '../../assets/mainLogo.svg';
import mainLogoSVG from '../../assets/main_logo_diy.svg';
import NoteSVG from '../../assets/note.svg';
import HelpIconSVG from '../../assets/help_icon.svg';
import HomeSVG from '../../assets/Home.svg';
import ShadedHomeSVG from '../../assets/Shaded_home.svg';
import BookmarkSVG from '../../assets/bookmark.svg';
import ShadedBookmarkSVG from '../../assets/Shaded_bookmark.svg';
import { NavLink, useLocation } from 'react-router-dom';

const languages = {
  roman: { flagSVG: RomanFlagSVG, code: 'RO' }
};

const Header = ({ language = 'roman' }) => {
  const location = useLocation();
  const urlStr = location?.pathname || '';
  const showNavigation = urlStr.includes('/app');

  return (
    <HeaderContainer>
      <div className="lang-block header-block">
        <img src={languages[language].flagSVG} alt="Language flag" />
        <span>{languages[language].code}</span>
      </div>
      <div className="logo-container header-block">
        <img src={mainLogoSVG} alt="Logotype" />
      </div>

      <div className="header-button-panel header-block">
        {showNavigation && (
          <>
            {/*<button className="toggle-mute">*/}
            {/*  <img src={NoteSVG} alt="Note" />*/}
            {/*</button>*/}
            <NavLink end to="/app">
              {({ isActive }) => {
                return isActive ? (
                  <img src={ShadedHomeSVG} alt="Shaded home icon" />
                ) : (
                  <img src={HomeSVG} alt="Home icon" />
                );
              }}
            </NavLink>
            <NavLink to="/app/saved">
              {({ isActive }) => {
                return isActive ? (
                  <img src={ShadedBookmarkSVG} alt="Shaded bookmark icon" />
                ) : (
                  <img src={BookmarkSVG} alt="Bookmark icon" />
                );
              }}
            </NavLink>
            <div>
              <img src={HelpIconSVG} alt="Help" />
            </div>
          </>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
