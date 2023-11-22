import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  @media (min-width: 480px) {
    display: none;
  }
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 14px;

  border-top: 0.5px solid #d9d9d9;

  .nav-item-footer {
    width: 64px;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    margin-top: -1px;

    img {
      width: 25px;
      height: 25px;
    }
  }

  .active {
    border-top: 2px solid black;
  }
`;
