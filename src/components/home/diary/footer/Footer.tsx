import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import classes from './footer.module.scss';
import Button from './../../../UI/button/Button';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import { useActions } from '../../../../redux/hooks/useActions';
import { useTypedSelector } from '../../../../redux/hooks/useTypedSelector';

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: 15,
    color: '#FFD300',
  },
}));

const Footer: React.FC = () => {
  const iconStyle = useStyles();

  const { saveDiary } = useActions();
  const { currentDiary, downloadedDiary } = useTypedSelector((state) => state.diary);
  const { userEmail } = useTypedSelector((state) => state.auth);

  const handleSave = () => {
    saveDiary(userEmail, currentDiary, downloadedDiary);
  };

  return (
    <div className={classes.footer}>
      <div className={classes.reminderContainer}>
        <NewReleasesOutlinedIcon className={iconStyle.icon} />
        <p className={classes.reminder}>
          Remember to add all the products you ate on that day. This is very important because only then will we be able to find your real problem.
        </p>
      </div>
      <Button dataTest='save-button' className={classes.buttonAdditional} onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
};

export default Footer;
