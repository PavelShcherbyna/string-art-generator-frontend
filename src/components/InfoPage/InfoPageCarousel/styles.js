import styled from 'styled-components';

export const InfoCarouselWrap = styled.div`
  .carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: clamp(100px, 90vw, 650px);
    margin: 0 auto;

    &:focus-visible {
      outline: none;
    }
  }

  .carousel__container {
    max-width: 550px;
    margin: auto;

    &:focus-visible {
      outline: none;
    }
  }

  /* gives us the illusion of a "centered" slide */
  .carousel__slider {
    width: 100%;
    padding-left: calc((100% - 235px) / 2);
    padding-right: calc((100% - 235px) / 2);

    &:focus-visible {
      outline: none;
    }
  }

  .carousel__slide--hidden {
    opacity: 0.3;
  }

  .carousel__slide {
    &:focus-visible {
      outline: none;
    }
  }

  /* gives us the illusion of spaces between the slides */
  .carousel__inner-slide {
    text-align: center;
    &:focus-visible {
      outline: none;
    }

    img {
      border: 1px solid #e3e3e3;
      height: 350px;
      width: 205px;
      max-width: 100%;

      &:focus-visible {
        outline: none;
      }
    }

    .carousel__slide-focus-ring {
      outline: none;
    }
  }

  .buttonWrap {
    display: flex;
    align-items: center;
    gap: 40px;
    margin-top: 16px;

    .slideNumSpan {
      color: #484848;
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      display: inline-block;
      min-width: 15px;
    }

    button {
      background: transparent;
      border: none;

      img {
        height: 23px;
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        opacity: 0.3;
      }
    }
  }

  &.wideSlides {
    .carousel__inner-slide {
      img {
        border: none;
        height: 350px;
        width: 350px;
      }
    }

    .carousel__slider {
      padding-left: calc((100% - 380px) / 2);
      padding-right: calc((100% - 380px) / 2);
  }
`;
