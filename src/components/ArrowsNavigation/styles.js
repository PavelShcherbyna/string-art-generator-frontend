import styled from 'styled-components';

export const ArrowsNavContainer = styled.div`
  display: flex;
  justify-content: space-between;

  &.no-forward-mobile {
    @media (max-width: 480px) {
      .forward-nav-btn {
        display: none;
      }
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    column-gap: 8px;
    padding: 0;

    color: #a8a8a8;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &:focus {
      outline: none;
    }

    @media (max-width: 480px) {
      padding-top: 19px;
      span {
        display: none;
      }

      svg {
        path {
          stroke-width: 2px;
          stroke: #484848;
        }
      }
    }
  }
`;
