import styled from 'styled-components';

export const SliderWrapper = styled.div`
  .MuiSlider-root {
    color: rgba(0, 0, 0, 0.34);
    padding: 0;

    .MuiSlider-thumb {
      color: white;
      border: 2px solid #484848;
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
      color: #484848;
      opacity: 0.6;
      background-color: transparent;
      font-size: clamp(13px, 2vw, 19px);

      font-family: 'Inter';
    }
  }
`;

export const ButtonWithBorder = styled.button`
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: clamp(18px, 2vw, 22px);
  line-height: 31px;
  color: #484848;
  padding: 12px 40px;
  border: 2px solid black;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 4px;

  &:focus {
    outline: none;
  }

  &.font18 {
    font-size: 18px;
  }

  &.hover-black {
    &:hover {
      background: #484848;
      color: #fff;
    }
  }

  &.min-width-set {
    min-width: 315px;

    @media (max-width: 480px) {
      min-width: 100%;
    }
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
