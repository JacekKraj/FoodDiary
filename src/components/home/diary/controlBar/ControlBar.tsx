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
  const { currentDiary, currentDate } = useTypedSelector((state) => state.diary);

  const [date, setDate] = React.useState(currentDate || getModifiedDate());
  const iconStyle = useStyles();

  const { clearDiary, changeDate } = useActions();

  const handleChangeInputDate = (newDate: string) => {
    setDate(newDate);
    const loading = currentDiary[newDate] ? false : true;
    changeDate(newDate, loading);
  };

  const handleChangeArrowDate = (type: '-' | '+') => {
    const otherDay = new Date(date);
    otherDay.setDate(type === '-' ? otherDay.getDate() - 1 : otherDay.getDate() + 1);
    const newDate = getModifiedDate(otherDay);
    handleChangeInputDate(newDate);
  };

  const isCurrentDate = date !== getModifiedDate();

  return (
    <div className={classes.controlBar}>
      <div className={classes.controlLeftSide}>
        <IconLabelContainer text='Previous day'>
          <ArrowBackIcon className={iconStyle.active} data-test='arrow-back' onClick={() => handleChangeArrowDate('-')} />
        </IconLabelContainer>
        <TextField
          inputProps={{ max: getModifiedDate() }}
          label='Date'
          type='date'
          value={date}
          onChange={(e) => handleChangeInputDate(e.target.value)}
          className={iconStyle.dateInput}
        />
      </div>
      <div className={classes.controlRightSide}>
        <IconLabelContainer text='Remove all products'>
          <DeleteForeverIcon className={iconStyle.remove} onClick={clearDiary} />
        </IconLabelContainer>
        <IconLabelContainer text='Next day'>
          <ArrowForwardIcon
            data-test={`arrow-forward-${isCurrentDate ? 'active' : 'disabled'}`}
            onClick={() => {
              isCurrentDate && handleChangeArrowDate('+');
            }}
            className={classnames(isCurrentDate ? iconStyle.active : iconStyle.disabled)}
          />
        </IconLabelContainer>
      </div>
    </div>
  );
};

export default ControlBar;
