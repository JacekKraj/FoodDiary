import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import classes from './footer.module.scss';
import Button from './../../../UI/button/Button';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import { theme } from '../../../../utils/breakpoints';

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: 15,
    color: '#FFD300',
  },
}));

const Footer: React.FC = () => {
  const iconStyle = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.reminderContainer}>
        <NewReleasesOutlinedIcon className={iconStyle.icon} />
        <p className={classes.reminder}>
          Remember to add all the products you ate on that day. This is very important because only then will we be able to find your real problem.
        </p>
      </div>
      <Button className={classes.buttonAdditional}>Save Changes</Button>
    </div>
  );
};

export default Footer;
