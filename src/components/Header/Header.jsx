import React from 'react';
import { HeaderContainer } from './styles';
import RomanFlagSVG from '../../assets/roman_flag.svg';
import MainLogo from '../../assets/mainLogo.svg';
import NoteSVG from '../../assets/note.svg';
import BookmarkSVG from '../../assets/bookmark.svg';
import HelpIconSVG from '../../assets/help_icon.svg';

const languages = {
  roman: { flagSVG: RomanFlagSVG, code: 'RO' }
};

const Header = ({ language = 'roman' }) => {
  return (
    <HeaderContainer>
      <div className="lang-block header-block">
        <img src={languages[language].flagSVG} alt="Language flag" />
        <span>{languages[language].code}</span>
      </div>
      <div className="logo-container header-block">
        <img src={MainLogo} alt="Logotype" />
      </div>
      <div className="header-button-panel header-block">
        <button className="toggle-mute">
          <img src={NoteSVG} alt="Note" />
        </button>
        <button className="toggle-bookmark">
          <img src={BookmarkSVG} alt="Bookmark" />
        </button>
        <button className="toggle-help">
          <img src={HelpIconSVG} alt="Help" />
        </button>
      </div>
    </HeaderContainer>
  );
};

export default Header;
