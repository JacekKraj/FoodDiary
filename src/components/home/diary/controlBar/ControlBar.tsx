import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import classnames from 'classnames';

import classes from './controlBar.module.scss';
import { theme } from '../../../../utils/breakpoints/breakpoints';
import IconLabelContainer from '../../../UI/iconLabelContainer/IconLabelContainer';
import { useActions } from '../../../../redux/hooks/useActions';
import { getModifiedDate } from '../../../../utils/helperFunctions/getModifiedDate';
import { useTypedSelector } from '../../../../redux/hooks/useTypedSelector';

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

const ControlBar: React.FC = () => {
  const iconStyle = useStyles();

  const { currentDiary, currentDate } = useTypedSelector((state) => state.diary);
  const { clearDiary, changeDate } = useActions();

  const [date, setDate] = React.useState(currentDate || getModifiedDate());

  const handleChangeDate = (newDate: string) => {
    setDate(newDate);
    const loading = currentDiary[newDate] ? false : true;
    changeDate(newDate, loading);
  };

  const countNewDate = (type: '-' | '+') => {
    const otherDay = new Date(date);
    otherDay.setDate(type === '-' ? otherDay.getDate() - 1 : otherDay.getDate() + 1);
    return getModifiedDate(otherDay);
  };

  const isCurrentDate = React.useMemo(() => {
    return date !== getModifiedDate();
  }, [date, getModifiedDate()]);

  return (
    <div className={classes.controlBar}>
      <div className={classes.controlLeftSide}>
        <IconLabelContainer text='Previous day'>
          <ArrowBackIcon className={iconStyle.active} data-test='arrow-back' onClick={() => handleChangeDate(countNewDate('-'))} />
        </IconLabelContainer>
        <TextField
          inputProps={{ max: getModifiedDate() }}
          label='Date'
          type='date'
          value={date}
          onChange={(e) => handleChangeDate(e.target.value)}
          className={iconStyle.dateInput}
        />
      </div>
      <div className={classes.controlRightSide}>
        <IconLabelContainer text='Remove content'>
          <DeleteForeverIcon className={iconStyle.remove} onClick={clearDiary} data-test='remove-content-button' />
        </IconLabelContainer>
        <IconLabelContainer text='Next day'>
          <ArrowForwardIcon
            data-test={`arrow-forward-${isCurrentDate ? 'active' : 'disabled'}`}
            onClick={() => {
              isCurrentDate && handleChangeDate(countNewDate('+'));
            }}
            className={classnames(isCurrentDate ? iconStyle.active : iconStyle.disabled)}
          />
        </IconLabelContainer>
      </div>
    </div>
  );
};

export default ControlBar;
