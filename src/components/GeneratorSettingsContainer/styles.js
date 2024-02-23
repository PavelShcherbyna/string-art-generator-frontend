import styled from 'styled-components';

export const GenSettingContainerWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(7px, 6vw, 96px);
  margin-top: clamp(24px, 3vw, 36px);

  @media (max-width: 480px) {
    gap: 7px;
  }

  .image-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .image-wrapper {
      position: relative;
      //overflow: hidden;
    }

    .imgCircled {
      position: relative;
      overflow: hidden;

      width: clamp(240px, 90vw, 455px);
      height: clamp(240px, 90vw, 455px);

      &::after {
        content: '';
        position: absolute;
        pointer-events: none;
        width: clamp(240px, 90vw, 455px);
        height: clamp(240px, 90vw, 455px);
        border: 3px solid white;
        border-radius: 50%;
        left: 0;
        top: 0;
        //transform: translate(-50%, -50%);
        box-sizing: border-box;
        box-shadow: 0 0 0 125px rgba(0, 0, 0, 0.4);
      }
    }

    .base-image {
      width: 479px;
      height: 479px;
      object-fit: cover;
    }

    .zoom-wrap {
      width: 100%;

      .MuiSlider-thumb {
        width: clamp(16px, 2vw, 25px);
        height: clamp(16px, 2vw, 25px);
      }
    }
  }

  .settings-block {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: clamp(12px, 3vw, 48px);
    //align-items: flex-start;

    min-width: 315px;

    @media (max-width: 480px) {
      min-width: 100%;
    }

    h3 {
      font-style: normal;
      font-weight: 700;
      font-size: clamp(20px, 3vw, 35px);
      line-height: normal;
      margin: 0;
    }

    p {
      font-style: normal;
      font-weight: 500;
      font-size: clamp(16px, 2vw, 22px);
      line-height: 27px;
      color: #2c2c2c;
      margin: 0;
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: clamp(10px, 2vw, 25px);
    }
  }
`;
