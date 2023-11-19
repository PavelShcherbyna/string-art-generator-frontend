import styled from 'styled-components';

export const StepsPlayerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas: ". a a b";
  
  
  width: 100vw;
  height: 60vh;
  
  .player{
    grid-area: a;
  }
  
  .interval-settings{
    grid-area: b;
  }
`




