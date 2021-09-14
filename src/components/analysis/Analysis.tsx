import React from 'react';

import Nav from '../pageElements/nav/Nav';
import Modules from './modules/Modules';
import { useActions } from '../../redux/hooks/useActions';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';

const Analysys: React.FC = () => {
  const { getFullDiary } = useActions();
  const { userEmail } = useTypedSelector((state) => state.auth);

  React.useEffect(() => {
    getFullDiary(userEmail);
  }, []);
  return (
    <React.Fragment>
      <Nav />
      <Modules />
    </React.Fragment>
  );
};

export default Analysys;
