import React, { useContext } from 'react';
import { HeaderContainer } from './styles';
import RomanFlagSVG from '../../assets/roman_flag.svg';
import HelpIconSVG from '../../assets/help_icon.svg';
import HomeSVG from '../../assets/Home.svg';
import ShadedHomeSVG from '../../assets/Shaded_home.svg';
import BookmarkSVG from '../../assets/bookmark.svg';
import ShadedBookmarkSVG from '../../assets/Shaded_bookmark.svg';
import { NavLink, useLocation } from 'react-router-dom';
import logoPng from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { openMusicPlayer } from '../../store/audioData/slice';
import shadedNoteSVG from '../../assets/Shaded_note.svg';
import noteSVG from '../../assets/note.svg';
import { availableLanguages, LocaleContext } from '../LocaleWrapper';
import flag_UK from '../../assets/flag_UK.png';
import flag_DE from '../../assets/flag_DE.png';
import flag_IT from '../../assets/flag_IT.png';
import flag_RO from '../../assets/flag_RO.png';
import flag_RU from '../../assets/flag_RU.png';

const languages = {
  'ru-RU': { iconSrc: flag_RU },
  'de-DE': { iconSrc: flag_DE },
  'it-IT': { iconSrc: flag_IT },
  'ro-RO': { iconSrc: flag_RO },
  'en-US': { iconSrc: flag_UK }
};

const Header = () => {
  const location = useLocation();
  const urlStr = location?.pathname || '';
  const showNavigation =
    urlStr.includes('/app') || urlStr.includes('/instruction');
  const dispatch = useDispatch();
  const { showMusicPlayer } = useSelector((state) => state.audioData);

  const localeContext = useContext(LocaleContext);

  return (
    <HeaderContainer>
      <div className="lang-block header-block">
        <img
          src={languages[localeContext.locale].iconSrc}
          alt="Language flag"
        />
        {/*<span>{languages[language].code}</span>*/}
        <select
          value={localeContext.locale}
          onChange={localeContext.selectLang}
        >
          {Object.keys(availableLanguages).map((lang, index) => {
            return (
              <option value={lang} key={index}>
                {lang.slice(0, 2).toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      <div className="logo-container header-block">
        <img src={logoPng} alt="Logotype" />
      </div>

      <div className="header-button-panel header-block">
        {showNavigation && (
          <>
            <button
              className="toggle-mute"
              onClick={() => dispatch(openMusicPlayer())}
            >
              {showMusicPlayer ? (
                <img src={shadedNoteSVG} alt="Shaded note" />
              ) : (
                <img src={noteSVG} alt="Note" />
              )}
            </button>
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
            <NavLink to="/instruction">
              <img src={HelpIconSVG} alt="Help" />
            </NavLink>
          </>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
