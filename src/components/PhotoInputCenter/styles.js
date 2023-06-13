import styled from 'styled-components';

export const BordFileInputContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: grid;
  place-items: center;

  label {
    cursor: pointer;
    padding: 12px 40px;
    border: 2px solid black;
    font-size: 18px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    color: #000000;

    img {
      margin-right: 18px;
    }
  }
`;
