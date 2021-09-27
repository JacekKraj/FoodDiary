import React from 'react';

import Nav from './../pageElements/nav/Nav';
import Questions from './questions/Questions';

const Faq: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <Questions />
    </React.Fragment>
  );
};

export default Faq;
