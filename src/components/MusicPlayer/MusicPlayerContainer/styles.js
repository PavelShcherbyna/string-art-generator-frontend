import styled from 'styled-components';

export const MusicPlayerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  row-gap: 1px;
  min-height: 65px;
  max-height: 30vh;
  overflow: auto;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(65, 65, 65, 0.13);

  margin: 0 clamp(20px, 10vw, 160px) 24px;

  @media (max-width: 480px) {
    margin: 0 20px 94px;
  }

  opacity: 1;
  transition: all 0.3s ease-in-out;

  &.invisible {
    opacity: 0;
  }
`;
