import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import classes from './controlBar.module.scss';
import { theme } from './../../../../utils/breakpoints';
import IconLabelContainer from '../../../UI/iconLabelContainer/IconLabelContainer';

const useStyles = makeStyles(() => ({
  active: { color: '#0078d4', cursor: 'pointer' },
  disabled: { color: '#ccc' },
  dateInput: { marginLeft: '0.75em' },
  remove: {
    fontSize: 28,
    color: 'rgba(0,0,0,0.54)',
    cursor: 'pointer',
    marginRight: '0.5em',
  },

  [theme.breakpoints.up('sm')]: {
    remove: {
      fontSize: 30,
      marginRight: '0.75em',
    },
  },
  [theme.breakpoints.up('md')]: {
    remove: {
      marginRight: '1em',
    },
  },
  [theme.breakpoints.up('xl')]: {
    dateInput: {
      marginLeft: '1.5em',
    },
  },
}));

interface Props {
  date: string;
  handleDateChange: (date: string) => void;
}

const ControlBar: React.FC<Props> = ({ date, handleDateChange }) => {
  const iconStyle = useStyles();

  return (
    <div className={classes.controlBar}>
      <div className={classes.controlLeftSide}>
        <IconLabelContainer text='Previous day'>
          <ArrowBackIcon className={iconStyle.active} />
        </IconLabelContainer>
        <TextField label='Date' type='date' defaultValue={date} onChange={(e) => handleDateChange(e.target.value)} className={iconStyle.dateInput} />
      </div>
      <div className={classes.controlRightSide}>
        <IconLabelContainer text='Remove all products'>
          <DeleteForeverIcon className={iconStyle.remove} />
        </IconLabelContainer>

        <IconLabelContainer text='Next day'>
          <ArrowForwardIcon className={iconStyle.disabled} />
        </IconLabelContainer>
      </div>
    </div>
  );
};

export default ControlBar;
