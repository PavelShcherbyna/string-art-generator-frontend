import styled from 'styled-components';

export const BordFileInputContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: grid;
  place-items: center;

  label {
    cursor: pointer;
    padding: 17px 0;
    border: 2px solid black;
    border-radius: 4px;
    font-size: 18px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    color: #000000;
    text-align: center;

    &.min-width-set {
      min-width: 360px;

      @media (max-width: 480px) {
        min-width: 100%;
      }
    }

    img {
      margin-right: 18px;
    }
  }
`;
