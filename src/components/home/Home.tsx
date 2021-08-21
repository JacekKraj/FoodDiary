import React from 'react';

import Nav from './../pageElements/nav/Nav';
import Diary from './diary/Diary';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <Diary />
    </React.Fragment>
  );
};

export default Home;
