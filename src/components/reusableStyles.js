import styled from 'styled-components';

export const SliderWrapper = styled.div`
  .MuiSlider-root {
    color: rgba(0, 0, 0, 0.34);

    .MuiSlider-thumb {
      color: white;
      border: 2px solid black;
      width: 16px;
      height: 16px;

      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }
  }

  .label-bottom {
    margin-bottom: 18px;
    .MuiSlider-valueLabelOpen {
      transform: translateY(100%) scale(1);
      color: rgba(0, 0, 0, 0.6);
      background-color: transparent;

      font-family: 'Inter', sans-serif;
    }
  }
`;

export const ButtonWithBorder = styled.button`
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  color: #000000;
  padding: 12px 40px;
  border: 2px solid black;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  &:focus {
    outline: none;
  }
`;

export const ButtonGray = styled.button`
  display: flex;
  //justify-content: center;
  align-items: center;
  gap: 12px;

  border: none;
  background: transparent;
  padding: 0;

  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.5);

  &:focus {
    outline: none;
  }
`;
