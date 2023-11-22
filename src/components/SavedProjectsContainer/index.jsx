import React, { useEffect } from 'react';
import { SavedProjectsWrapper } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { drawLinesSVG } from '../../stringGeneratorScript/stringArtMainScript';
import { setActiveDrawing } from '../../store/userData/slice';
import { useNavigate } from 'react-router-dom';

export default function SavedProjectsContainer() {
  const { drawings } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function filterSavedProjects(drawing) {
  //   return drawing.f_id !== justGenDrawId;
  // }
  //
  // const filteredDrawings = drawings.filter(filterSavedProjects);

  useEffect(() => {
    drawings.forEach((obj, index) => {
      drawLinesSVG(`saved-project-${index}`, obj.steps);
    });
  }, [drawings]);

  function onDrawingClick(id) {
    return function onClick() {
      dispatch(setActiveDrawing({ f_id: id }));
      navigate('/app', { state: { from: 'saved' } });
    };
  }

  return (
    <SavedProjectsWrapper>
      <h3>Сохраненные проекты</h3>
      <div className={'saved-drawings-wrap'}>
        {drawings.map((obj, index) => {
          return (
            <div className={'saved-drawings-item'} key={obj.f_id}>
              <svg
                id={`saved-project-${index}`}
                onClick={onDrawingClick(obj.f_id)}
              />
              <p>
                <span>{obj.currentIndex}</span> шагов из {obj.steps.length - 1}
              </p>
            </div>
          );
        })}
      </div>
    </SavedProjectsWrapper>
  );
}
