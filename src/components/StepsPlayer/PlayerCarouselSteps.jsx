import React from 'react';
import { FormattedMessage } from 'react-intl';

function StepText({ stepNum }) {
  return (
    <FormattedMessage
      id="steps.player.step"
      defaultMessage="Step {step}"
      values={{
        step: stepNum > 0 ? stepNum : null
      }}
    />
  );
}

export const TranslucentStep = ({ stepNum, stepVal }) => {
  return (
    <div className={'translucent-step'}>
      <span className={'step-num'}>
        <StepText stepNum={stepNum} />
      </span>
      <span className={'step-val'}>{stepNum > 0 ? stepVal : null}</span>
    </div>
  );
};

export const NormalStep = ({ stepNum, stepVal }) => {
  return (
    <div className={'normal-step'}>
      <span className={'step-num'}>
        <StepText stepNum={stepNum} />
      </span>
      <span className={'step-val'}>{stepNum > 0 ? stepVal : null}</span>
    </div>
  );
};

export const BoldStep = ({ stepNum, stepVal }) => {
  return (
    <div className={'bold-step'}>
      <span className={'step-num'}>
        <StepText stepNum={stepNum} />
      </span>
      <span className={'step-val'}>{stepNum > 0 ? stepVal : null}</span>
    </div>
  );
};
