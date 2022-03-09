import React from 'react';

import Nav from '../pageElements/nav/Nav';
import { useActions } from '../../redux/hooks/useActions';
import Modules from './modules/modules';

const Analysys: React.FC = () => {
  const { getFullDiary } = useActions();

  React.useEffect(() => {
    getFullDiary();
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <Modules />
    </React.Fragment>
  );
};

export default Analysys;
