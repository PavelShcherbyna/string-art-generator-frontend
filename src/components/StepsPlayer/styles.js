import styled from 'styled-components';

export const StepsPlayerWrapper = styled.div`
  width: 100%;
  min-height: 60vh;
  margin-top: clamp(24px, 3vw, 36px);

  .player {
    justify-self: center;

    display: flex;
    flex-direction: column;
    row-gap: 80px;

    max-width: 90vw;
    margin-bottom: 70px;

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
          font-size: clamp(13px, 2vw, 20px);
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        .step-val {
          grid-area: val;
          justify-self: center;

          color: #aeaeae;
          font-family: Inter;
          font-size: clamp(25px, 4vw, 40px);
          font-style: normal;
          font-weight: 600;
          line-height: normal;
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
          font-size: clamp(13px, 2vw, 20px);
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        .step-val {
          grid-area: val;
          justify-self: center;

          color: #777;
          font-family: Inter;
          font-size: clamp(25px, 4vw, 40px);
          font-style: normal;
          font-weight: 600;
          line-height: normal;
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
          font-size: clamp(22px, 4vw, 35px);
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        .step-val {
          grid-area: val;
          justify-self: center;

          color: #484848;
          font-family: Inter;
          font-size: clamp(50px, 9vw, 80px);
          font-style: normal;
          font-weight: 800;
          line-height: normal;
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
    }
  }
`;
