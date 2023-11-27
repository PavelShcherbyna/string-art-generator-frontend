import React from 'react';
import { ArrowsNavContainer } from './styles';
import IconLeftNavArrow from '../../assets/IconLeftNavArrow';
import IconRightNavArrow from '../../assets/IconRightNavArrow';

export default function ArrowsNavigation({ backHandler, forwardHandler }) {
  return (
    <ArrowsNavContainer>
      <button className={'back-nav-btn'} onClick={backHandler}>
        <IconLeftNavArrow />
        <span>Назад</span>
      </button>
      {forwardHandler && (
        <button className={'forward-nav-btn'} onClick={forwardHandler}>
          <span>Далее</span>
          <IconRightNavArrow />
        </button>
      )}
    </ArrowsNavContainer>
  );
}
