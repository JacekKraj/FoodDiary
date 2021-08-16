import React from 'react';

import classes from './home.module.scss';
import Nav from './../pageElements/nav/Nav';
import Diary from './diary/Diary';

const Home: React.FC = () => {
  return (
    <div>
      <Nav />
      <Diary />
    </div>
  );
};

export default Home;
