import styled from 'styled-components';

export const SavedProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 47px;

  h3 {
    color: #484848;
    font-family: Inter;
    font-size: 35px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .saved-drawnings-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    
    canvas {
      max-width: 200px;
      max-height: 200px;
      
      @media (max-width: 480px) {
        max-width: 140px;
        max-height: 140px;
      }
      
    }
  }
`;
