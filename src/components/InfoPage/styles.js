import styled from 'styled-components';

export const InfoPageWrap = styled.main`
  padding: 20px 0 33px;

  h3 {
    margin: 0;
  }
`;

export const InfoPageHeader = styled.div`
  display: flex;
  column-gap: 18px;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    margin-top: -25px;
  }

  img {
    width: 33px;
    height: 33px;
  }

  h3 {
    color: #484848;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 55px;

  h3 {
    color: #484848;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 30px;
  }
`;
