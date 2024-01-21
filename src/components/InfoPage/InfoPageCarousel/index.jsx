import React, { useState } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { InfoCarouselWrap } from './styles';
import backArrSVG from '../../../assets/info-page-carousels/BackSlideArrow.svg';
import forwardArrSVG from '../../../assets/info-page-carousels/ForwardSlideArrow.svg';

const InfoCarouselComponent = ({ photosArr = [], className }) => {
  const [currentSlideNum, setCurrentSlideNum] = useState(1);

  const slideStyle = {
    height: '350px'
  };

  return (
    <InfoCarouselWrap className={className}>
      <CarouselProvider
        // naturalSlideWidth={100}
        // naturalSlideHeight={100}
        totalSlides={photosArr.length}
        visibleSlides={1}
        dragEnabled={false}
        touchEnabled={false}
      >
        <Slider>
          {photosArr.map((photoSRC, index) => {
            return (
              <Slide style={slideStyle} index={index} key={index}>
                <img src={photoSRC} alt={''} />
              </Slide>
            );
          })}
        </Slider>
        <div className="buttonWrap">
          <ButtonBack
            onClick={() => {
              setCurrentSlideNum((prevState) => prevState - 1);
            }}
          >
            <img src={backArrSVG} alt="Back arrow" draggable={false} />
          </ButtonBack>
          <span className="slideNumSpan">{currentSlideNum}</span>
          <ButtonNext
            onClick={() => {
              setCurrentSlideNum((prevState) => prevState + 1);
            }}
          >
            <img src={forwardArrSVG} alt="Forward arrow" draggable={false} />
          </ButtonNext>
        </div>
      </CarouselProvider>
    </InfoCarouselWrap>
  );
};
export default InfoCarouselComponent;
