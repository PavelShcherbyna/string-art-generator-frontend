import styled from 'styled-components';

export const GenSettingContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 96px;
  font-family: 'Inter', sans-serif;

  .image-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

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
  }

  .settings-block {
    display: flex;
    flex-direction: column;
    gap: 49px;
    align-items: flex-start;

    h3 {
      font-style: normal;
      font-weight: 700;
      font-size: 35px;
      line-height: 42px;
    }

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 27px;
      color: #2c2c2c;
      margin-bottom: 23px;
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
