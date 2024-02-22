import React, { useEffect } from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselContainer, InfoPageHeader, InfoPageWrap } from './styles';
import InfoCarouselComponent from './InfoPageCarousel';
import ArrowsNavigation from '../ArrowsNavigation';
import HelpIconInfoSVG from '../../assets/help_icon_info.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotoList } from '../../store/infoPageData/slice';
import { FormattedMessage } from 'react-intl';

const InfoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { photoLists } = useSelector((state) => state.infoPageData);

  useEffect(() => {
    dispatch(getPhotoList());
  }, [dispatch]);

  function backNavHandler() {
    navigate(-1);
  }

  return (
    <InfoPageWrap>
      <ArrowsNavigation backHandler={backNavHandler} />
      <InfoPageHeader>
        <img src={HelpIconInfoSVG} alt="Help" draggable={false} />
        <h3>
          <FormattedMessage
            id="login.page.instruction"
            defaultMessage="Instruction"
          />
        </h3>
      </InfoPageHeader>
      <CarouselContainer>
        <h3>
          <FormattedMessage
            id="info.page.how.to.start"
            defaultMessage="How to start?"
          />
        </h3>
        <InfoCarouselComponent photosArr={photoLists.lvl1} />
      </CarouselContainer>
      <CarouselContainer>
        <h3>
          <FormattedMessage
            id="info.page.quality"
            defaultMessage="For better quality"
          />
        </h3>
        <InfoCarouselComponent
          photosArr={photoLists.lvl2}
          className={'wideSlides'}
        />
      </CarouselContainer>
      <CarouselContainer>
        <h3>
          <FormattedMessage
            id="info.page.painting"
            defaultMessage="Preparing the painting {br} to begin work"
            values={{ br: <br /> }}
          />
        </h3>
        <InfoCarouselComponent
          photosArr={photoLists.lvl3}
          className={'wideSlides'}
        />
      </CarouselContainer>
    </InfoPageWrap>
  );
};
export default InfoPage;
