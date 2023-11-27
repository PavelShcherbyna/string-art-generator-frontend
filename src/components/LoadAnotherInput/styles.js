import styled from 'styled-components';

export const AnotherInputContainer = styled.label`
  cursor: pointer;
  padding: 12px 0px;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  color: #000000;
  margin: 0;
  text-align: center;

  min-width: 315px;

  @media (max-width: 480px) {
    min-width: 100%;
  }

  img {
    margin-right: 18px;
  }

  &.sm-invisible {
    @media (max-width: 480px) {
      display: none;
    }
  }

  &.small-top-absolute {
    position: absolute;
    top: -42px;
    right: 0;
    font-size: 15px;
    display: none;
    justify-content: flex-end;
    padding: 0;
    min-width: 50%;

    img {
      margin-right: 10px;
    }

    @media (max-width: 480px) {
      display: flex;
    }
  }
`;
