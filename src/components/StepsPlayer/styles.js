import styled from 'styled-components';

export const StepsPlayerWrapper = styled.div`
  width: 100%;
  min-height: 60vh;
  margin-top: clamp(24px, 3vw, 36px);

  .player {
    justify-self: center;

    display: flex;
    flex-direction: column;
    row-gap: 40px;

    max-width: 90vw;
    margin-bottom: 40px;

    .steps-display-wrap {
      display: flex;
      flex-direction: column;
      row-gap: 25px;

      .translucent-step {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-areas: '. num val . .';

        .step-num {
          grid-area: num;
          align-self: center;

          color: #c7c7c7;
          font-family: Inter;
          font-size: clamp(10px, 1.6vw, 16px);
          font-style: normal;
          font-weight: 600;
          //line-height: 250%;
        }
        .step-val {
          grid-area: val;
          justify-self: center;
          display: inline-block;
          height: clamp(25px, 4vw, 40px);
          line-height: 100%;

          color: #aeaeae;
          font-family: Inter;
          font-size: clamp(20px, 3.2vw, 32px);
          font-style: normal;
          font-weight: 600;
          //line-height: normal;
        }
      }
      .normal-step {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-areas: '. num val . .';

        .step-num {
          grid-area: num;
          align-self: center;

          color: #a8a8a8;
          font-family: Inter;
          font-size: clamp(10px, 1.6vw, 16px);
          font-style: normal;
          font-weight: 600;
          //line-height: 250%;
        }
        .step-val {
          grid-area: val;
          justify-self: center;
          display: inline-block;
          height: clamp(25px, 4vw, 40px);
          line-height: 100%;

          color: #777;
          font-family: Inter;
          font-size: clamp(20px, 3.2vw, 32px);
          font-style: normal;
          font-weight: 600;
          //line-height: normal;
        }
      }
      .bold-step {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-areas: 'num num val . .';
        margin: 17px 0;

        .step-num {
          grid-area: num;
          align-self: center;

          color: #484848;
          font-family: Inter;
          font-size: clamp(17.6px, 3.2vw, 28px);
          font-style: normal;
          font-weight: 600;
          //line-height: 280%;
        }
        .step-val {
          grid-area: val;
          justify-self: center;
          display: inline-block;
          height: clamp(50px, 9vw, 80px);
          line-height: 100%;

          color: #484848;
          font-family: Inter;
          font-size: clamp(40px, 7.2vw, 64px);
          font-style: normal;
          font-weight: 800;
          //line-height: normal;
        }
      }
    }

    .ctrl-panel-wrap {
      display: flex;
      //justify-content: center;
      align-items: baseline;
      justify-content: space-evenly;
      //gap: 45px;

      .rewind-btn-wrap {
        display: flex;
        flex-direction: column;
        gap: 18px;

        button {
          border: none;
          background-color: transparent;
          padding: 0;
          cursor: pointer;

          &:focus {
            outline: none;
          }

          img {
            height: 25px;
            width: 32px;
          }
        }

        span {
          font-size: clamp(12.8px, 1.6vw, 19.2px);
        }

        &.play-btn {
          img {
            height: clamp(60px, 9vw, 72px);
            width: clamp(60px, 9vw, 72px);
          }
        }
      }
    }
  }

  .interval-settings {
    p {
      color: #2c2c2c;
      font-size: clamp(16px, 2vw, 20px);
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-align: center;

      //margin-top: -45px;
      @media (min-width: 900px) {
        margin-top: 0;
      }
    }
  }
`;
