import styled from 'styled-components';

export const AuthWithCodePageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 0 55px; // Margin-bottom needed for better centering inside 'flex' parent

  flex: 1;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    padding: 20px;

    input {
      width: calc(100vw - 40px);
      max-width: 390px;
      border: none;
      border-bottom: 2px solid #484848;
      border-radius: 4px;
      padding: 20px;

      color: #484848;
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      text-align: center;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #808080;

        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }

  .input-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .err-msg {
      text-align: center;
      color: red;
      font-family: Inter;
      font-size: 14px;
      line-height: 14px;
      font-style: normal;
      //margin-bottom: -14px;
    }
  }

  .enter-block-wrap {
    width: calc(100vw - 40px);
    max-width: 390px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    button {
      width: 100%;
    }

    .instruction {
      display: flex;
      align-items: center;
      gap: 18px;

      color: #484848;
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      img {
        width: 33px;
        heigth: 33px;
      }
    }
  }
`;
