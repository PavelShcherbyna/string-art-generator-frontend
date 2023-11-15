import React, { useEffect } from 'react';
import { SavedProjectsWrapper } from './styles';
import { useSelector } from 'react-redux';
import {
  drawLines,
  drawLinesSync
} from '../../stringGeneratorScript/stringArtMainScript';

export default function SavedProjectsContainer() {
  const { drawnings } = useSelector((state) => state.userData);

  useEffect(() => {
    drawnings.map((obj, index) => {
      drawLinesSync(`saved-project-${index}`, obj.steps);
    });
  }, [drawnings]);

  return (
    <SavedProjectsWrapper>
      <h3>Сохраненные проекты</h3>
      <div className={'saved-drawnings-wrap'}>
        {drawnings.map((obj, index) => {
          return (
            <canvas
              id={`saved-project-${index}`}
              key={index}
              width="400"
              height="400"
            />
          );
        })}
      </div>
    </SavedProjectsWrapper>
  );
}
