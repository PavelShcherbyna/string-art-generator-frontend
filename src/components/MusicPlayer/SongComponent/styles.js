import styled from 'styled-components';

export const SongWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-radius: 10px;
  padding: 8px 20px 7px 10px;

  &.playing {
    background: #ebebeb;

    p {
      color: #484848;
      font-weight: 600;
      &.time {
        color: #484848;
      }
    }
  }

  div {
    display: flex;
    align-items: baseline;
    column-gap: 20px;
  }

  p {
    color: #777;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;

    &.time {
      color: #a7a7a7;
      font-weight: 600;
    }
  }
`;

export const PlayMusicBtn = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;
