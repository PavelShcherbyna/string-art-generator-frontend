import React from 'react';

export const TranslucentStep = ({ stepNum, stepVal }) => {
  return (
    <div className={'translucent-step'}>
      <span className={'step-num'}>Шаг {stepNum > 0 ? stepNum : null}</span>
      <span className={'step-val'}>{stepNum > 0 ? stepVal : null}</span>
    </div>
  );
};

export const NormalStep = ({ stepNum, stepVal }) => {
  return (
    <div className={'normal-step'}>
      <span className={'step-num'}>Шаг {stepNum > 0 ? stepNum : null}</span>
      <span className={'step-val'}>{stepNum > 0 ? stepVal : null}</span>
    </div>
  );
};

export const BoldStep = ({ stepNum, stepVal }) => {
  return (
    <div className={'bold-step'}>
      <span className={'step-num'}>Шаг {stepNum > 0 ? stepNum : null}</span>
      <span className={'step-val'}>{stepNum > 0 ? stepVal : null}</span>
    </div>
  );
};
