import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 0 55px;

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
  }
  .header-button-panel {
    display: flex;
    gap: 20px;
    
    img {
      width: 23px;
      height: 23px;
    }

    //button {
    //  border: none;
    //  width: 31px;
    //  height: 31px;
    //  background-color: transparent;
    //  padding: 0;
    //  cursor: pointer;
    //
    //  &:focus {
    //    outline: none;
    //  }
    //}
  }
`;
