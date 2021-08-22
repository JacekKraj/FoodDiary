import React from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { Prompt } from 'react-router';

import Nav from './../pageElements/nav/Nav';
import Diary from './diary/Diary';
import { useTypedSelector } from './../../redux/hooks/useTypedSelector';

const Home: React.FC = () => {
  const { currentDiary, downloadedDiary } = useTypedSelector((state) => state.diary);
  const [saved, setSaved] = React.useState(true);

  useBeforeunload((event) => {
    if (!saved) {
      event.preventDefault();
    }
  });

  React.useEffect(() => {
    if (JSON.stringify(currentDiary) !== JSON.stringify(downloadedDiary)) {
      setSaved(false);
      return;
    }
    setSaved(true);
  }, [currentDiary, downloadedDiary]);

  return (
    <div>
      <Prompt when={!saved} message='The changes made may not be saved.' />
      <Nav />
      <Diary />
    </div>
  );
};

export default Home;
