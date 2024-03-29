import styled from 'styled-components';

export const SavedProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 47px;
  margin-top: clamp(24px, 3vw, 36px);

  h3 {
    color: #484848;
    font-family: Inter;
    font-size: clamp(20px, 4vw, 35px);
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .saved-drawings-wrap {
    display: flex;
    flex-wrap: wrap;
    column-gap: 50px;
    justify-content: center;

    .saved-drawings-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      color: #484848;
      font-family: Inter;
      font-size: clamp(16px, 2vw, 20px);
      font-style: normal;
      line-height: normal;

      svg {
        width: clamp(140px, 16vw, 200px);
        height: clamp(140px, 16vw, 200px);
        border-radius: 50%;
        cursor: pointer;

        @media (max-width: 480px) {
          max-width: 140px;
          max-height: 140px;
        }
      }

      p {
        font-weight: 500;

        span {
          font-weight: 700;
        }
      }
    }
  }
`;
