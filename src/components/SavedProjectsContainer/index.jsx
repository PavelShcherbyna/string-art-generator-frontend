import React, { useEffect } from 'react';
import { SavedProjectsWrapper } from './styles';
import { useSelector } from 'react-redux';
import {
  drawLines,
  drawLinesSVG,
  drawLinesSync
} from '../../stringGeneratorScript/stringArtMainScript';

export default function SavedProjectsContainer() {
  const { drawings, justGenDrawId } = useSelector((state) => state.userData);

  function filterSavedProjects(drawing) {
    return drawing.f_id !== justGenDrawId;
  }

  const filteredDrawings = drawings.filter(filterSavedProjects);

  useEffect(() => {
    filteredDrawings.forEach((obj, index) => {
      drawLinesSync(`saved-project-canvas-${index}`, obj.steps);
    });
  }, [filteredDrawings]);

  useEffect(() => {
    filteredDrawings.forEach((obj, index) => {
      drawLinesSVG(`saved-project-${index}`, obj.steps);
    });
  }, [filteredDrawings]);

  return (
    <SavedProjectsWrapper>
      <h3>Сохраненные проекты</h3>
      <div className={'saved-drawings-wrap'}>
        {filteredDrawings.map((obj, index) => {
          return (
            <canvas
              id={`saved-project-canvas-${index}`}
              key={index}
              width="400"
              height="400"
            />
          );
        })}
      </div>
      <div className={'saved-drawings-wrap'}>
        {filteredDrawings.map((obj, index) => {
          return (
            <svg
              id={`saved-project-${index}`}
              key={index}
              // width="400"
              // height="400"
            />
          );
        })}
      </div>
    </SavedProjectsWrapper>
  );
}
