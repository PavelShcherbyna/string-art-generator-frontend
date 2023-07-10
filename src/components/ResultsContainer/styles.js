import styled from 'styled-components';

export const ResultsContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 96px;
  font-family: 'Inter', sans-serif;

  .images-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    .big-img-wrapper {
      .base-image-grayed {
        width: 455px;
        height: 455px;
        object-fit: cover;
        border-radius: 50%;
        filter: grayscale(100%);
      }

      .chosen-result {
        width: 455px;
        height: 455px;
      }
    }
    .result-images-wrapper {
      display: flex;
      flex-direction: row;
      gap: 25px;

      .canvas-output-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;

        .canvas-output {
          width: 131px;
          height: 131px;
          box-sizing: content-box;
          padding: 8px;

          &.clickable {
            cursor: pointer;
          }

          &.selected {
            padding: 6px;
            border: 2px solid black;
            border-radius: 50%;
          }
        }

        span {
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          line-height: 18px;
          color: #000000;
        }
      }
    }
  }

  .controls-block {
    display: flex;
    flex-direction: column;
    gap: 49px;
    align-items: flex-start;

    h3 {
      font-style: normal;
      font-weight: 700;
      font-size: 35px;
      line-height: 42px;
    }

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 27px;
      color: #2c2c2c;
      margin-bottom: 23px;
    }

    .bottom-btn-wrap {
      display: flex;
      flex-direction: column;
      gap: 23px;

      .bottom-btn-group {
        display: flex;
        gap: 40px;
      }
    }

    .start-btn-wrap {
      position: relative;

      .warning-span {
        position: absolute;
        color: red;
        opacity: 0.7;
      }
    }
  }
`;
