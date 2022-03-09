import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import classes from './controlBar.module.scss';
import { breakpoints } from '../../../../utils/breakpoints/breakpoints';
import IconLabelContainer from '../../../UI/iconLabelContainer/IconLabelContainer';
import { useActions } from '../../../../redux/hooks/useActions';
import { getModifiedDate } from '../../../../utils/helperFunctions/getModifiedDate';
import { useTypedSelector } from '../../../../redux/hooks/useTypedSelector';

const { mobileHorizontal, tabletHorizontal, laptopLg } = breakpoints;

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

  [mobileHorizontal]: {
    remove: {
      fontSize: 30,
      marginRight: '0.75em',
    },
  },
  [tabletHorizontal]: {
    remove: {
      marginRight: '1em',
    },
  },
  [laptopLg]: {
    dateInput: {
      marginLeft: '1.5em',
    },
  },
}));

const ControlBar: React.FC = () => {
  const { currentDate } = useTypedSelector((state) => state.diary);
  const { clearDiary, changeDate } = useActions();

  const [date, setDate] = React.useState(currentDate || getModifiedDate());

  const iconStyle = useStyles();

  const isCurrentDate = date !== getModifiedDate();

  const getNewDate = (type: '-' | '+') => {
    const newDate = new Date(date);
    newDate.setDate(type === '-' ? newDate.getDate() - 1 : newDate.getDate() + 1);
    const newDateModified = getModifiedDate(newDate);
    return newDateModified;
  };

  const handleChangeDate = (date: string) => {
    setDate(date);
    changeDate(date);
  };

  const clickArrowBack = () => {
    handleChangeDate(getNewDate('-'));
  };

  const clickArrowForward = () => {
    if (isCurrentDate) {
      handleChangeDate(getNewDate('+'));
    }
  };

  return (
    <div className={classes.controlBar}>
      <div className={classes.controlLeftSide}>
        <IconLabelContainer text='Previous day'>
          <ArrowBackIcon className={iconStyle.active} data-test='arrow-back' onClick={clickArrowBack} />
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
            onClick={clickArrowForward}
            className={isCurrentDate ? iconStyle.active : iconStyle.disabled}
          />
        </IconLabelContainer>
      </div>
    </div>
  );
};

export default ControlBar;
