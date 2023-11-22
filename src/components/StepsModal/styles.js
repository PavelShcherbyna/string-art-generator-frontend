import styled from 'styled-components';

export const StepsModalContainer = styled.div`
  //.MuiDialogActions-root {
  //  justify-content: center;
  //}
  //.MuiDialogContent-root {
  //min-width: 600px;
  //}
`;

export const StepText = styled.p`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 42px;
  color: #000000;
  padding: 40px 20px;
`;

export const PickStepText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 200%;
  text-align: center;
  color: #484848;
  //padding: 0 20px 0;

  span {
    font-weight: 800;
  }
`;

export const PickStepInputWrap = styled.div`
  //padding: 0 20px 40px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  //align-items: center;
  max-width: 275px;

  input {
    text-align: center;
    border-radius: 4px;
    border: 2px solid #e7e7e7;

    &:focus-visible {
      outline: none;
    }
  }

  .MuiInputBase-root {
    &:focus-visible {
      outline: none;
    }
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }
`;
