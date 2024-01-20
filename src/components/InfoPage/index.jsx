import React from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import lvl1Photos from '../../assets/info-page-carousels/lvl-1';
import lvl2Photos from '../../assets/info-page-carousels/lvl-2';
import lvl3Photos from '../../assets/info-page-carousels/lvl-3';
import { CarouselContainer, InfoPageHeader, InfoPageWrap } from './styles';
import InfoCarouselComponent from './InfoPageCarousel';
import ArrowsNavigation from '../ArrowsNavigation';
import HelpIconInfoSVG from '../../assets/help_icon_info.svg';
import { useNavigate } from 'react-router-dom';

const InfoPage = () => {
  const navigate = useNavigate();

  function backNavHandler() {
    navigate(-1);
  }

  return (
    <InfoPageWrap>
      <ArrowsNavigation backHandler={backNavHandler} />
      <InfoPageHeader>
        <img src={HelpIconInfoSVG} alt="Help" draggable={false} />
        <h3>ИНСТРУКЦИЯ</h3>
      </InfoPageHeader>
      <CarouselContainer>
        <h3>How to start?</h3>
        <InfoCarouselComponent photosArr={lvl1Photos} />
      </CarouselContainer>
      <CarouselContainer>
        <h3>For better quality</h3>
        <InfoCarouselComponent
          photosArr={lvl2Photos}
          className={'wideSlides'}
        />
      </CarouselContainer>
      <CarouselContainer>
        <h3>
          Preparing the painting
          <br />
          to begin work
        </h3>
        <InfoCarouselComponent
          photosArr={lvl3Photos}
          className={'wideSlides'}
        />
      </CarouselContainer>
    </InfoPageWrap>
  );
};
export default InfoPage;
