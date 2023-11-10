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

export const AuthFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 auto;
  max-width: 400px;
  gap: 40px;
  padding: 0 20px 20px;

  color: #000;
  font-family: Inter, sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  h2 {
    font-size: 35px;
    font-weight: 700;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 30px;

    label {
      margin: 0;
    }

    .input-wrap {
      display: flex;
      flex-direction: column;
      gap: 20px;

      label {
        color: #bdbdbd;
      }

      input {
        padding: 20px 25px;
        border-radius: 4px;
        border: 2px solid #e7e7e7;

        &:focus {
          outline: none;
        }
      }
    }
    .add-control-wrap {
      color: #888;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: flex;
        align-items: center;
        gap: 9px;

        .MuiCheckbox-root {
          padding: 0;
          color: #000;

          & .MuiSvgIcon-root {
            //font-size: 21px;
          }
        }
      }
    }

    .form-submit-btn {
      cursor: pointer;
      font-weight: 600;
      font-size: 18px;
      line-height: normal;
      padding: 20px;
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
    }
    
    .btm-link-wrap{
      color: #888;

      .link{
        color: #000;
        font-weight: 800;
      }
    }
  }
`;
