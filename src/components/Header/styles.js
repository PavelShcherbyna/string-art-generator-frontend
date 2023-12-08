import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //margin: 0 0 55px;
  @media (max-width: 480px) {
    flex-direction: row-reverse;
  }

  .header-block {
    @media (min-width: 650px) {
      min-width: 130px;
    }
  }

  .lang-block {
    img {
      margin-right: 8px;
      cursor: pointer;
    }
  }

  .logo-container {
    margin-top: 19px;

    img {
      width: clamp(78px, 13vw, 144px);
      height: clamp(60px, 10vw, 110px);
    }
  }
  .header-button-panel {
    @media (max-width: 480px) {
      display: none;
    }

    display: flex;
    justify-content: flex-end;
    gap: 20px;

    img {
      width: 23px;
      height: 23px;
    }

    button {
      border: none;
      background-color: transparent;
      padding: 0;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }
  }
`;
