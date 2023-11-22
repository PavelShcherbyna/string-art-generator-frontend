import styled from 'styled-components';

export const GenSettingContainerWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(7px, 6vw, 96px);

  @media (max-width: 480px) {
    gap: 7px;
  }

  .image-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .image-wrapper {
      position: relative;
      overflow: hidden;

      &.imgCircled {
        &::after {
          content: '';
          position: absolute;
          width: 430px;
          height: 430px;
          border: 4px solid white;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 125px rgba(0, 0, 0, 0.4);
        }
      }
    }

    .base-image {
      width: 479px;
      height: 479px;
      object-fit: cover;
    }

    .zoom-wrap {
      width: 100%;

      .MuiSlider-thumb {
        width: clamp(16px, 2vw, 25px);
        height: clamp(16px, 2vw, 25px);
      }
    }
  }

  .settings-block {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: clamp(20px, 3vw, 48px);
    //align-items: flex-start;

    min-width: 315px;

    @media (max-width: 480px) {
      min-width: 100%;
    }

    h3 {
      font-style: normal;
      font-weight: 700;
      font-size: clamp(20px, 3vw, 35px);
      line-height: 42px;
    }

    p {
      font-style: normal;
      font-weight: 500;
      font-size: clamp(16px, 2vw, 22px);
      line-height: 27px;
      color: #2c2c2c;
      margin: 0;
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: clamp(14px, 2vw, 25px);
    }

    .form-picker-wrap {
      .form-buttons-wrap {
        display: flex;
        align-items: center;
        gap: 22px;
      }

      button {
        cursor: pointer;
        border: 2px solid black;
        background-color: transparent;
        &:focus {
          outline: none;
        }

        &.disabled {
          border-color: rgba(0, 0, 0, 0.2);
        }
      }

      .square-form {
        width: 41px;
        height: 41px;
      }

      .circle-form {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
  }
`;
