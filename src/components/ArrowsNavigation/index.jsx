import React from 'react';
import { ArrowsNavContainer } from './styles';
import IconLeftNavArrow from '../../assets/IconLeftNavArrow';
import IconRightNavArrow from '../../assets/IconRightNavArrow';
import { FormattedMessage } from 'react-intl';

export default function ArrowsNavigation({ backHandler, forwardHandler }) {
  return (
    <ArrowsNavContainer>
      <button className={'back-nav-btn'} onClick={backHandler}>
        <IconLeftNavArrow />
        <span>
          <FormattedMessage id="nav.btn.back" defaultMessage="Back" />
        </span>
      </button>
      {forwardHandler && (
        <button className={'forward-nav-btn'} onClick={forwardHandler}>
          <span>
            <FormattedMessage id="nav.btn.forward" defaultMessage="Forward" />
          </span>
          <IconRightNavArrow />
        </button>
      )}
    </ArrowsNavContainer>
  );
}
