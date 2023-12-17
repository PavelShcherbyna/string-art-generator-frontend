import styled from 'styled-components';

export const SnackbarPWAInstallWrapper = styled.div`
  .MuiSnackbar-root {
    .MuiPaper-root {
      background-color: white;
      border-radius: 12px;
    }
  }
`;

export const InstallPWABtn = styled.button`
  border: none;
  background: transparent;
  padding: 0;

  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #008cff;

  &:focus {
    outline: none;
  }
`;

export const InstallPWAContent = styled.div`
  display: flex;
  column-gap: 20px;

  img {
    width: 45px;
    height: 40px;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #484848;
    margin: 0;
  }
`;
